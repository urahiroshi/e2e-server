const Queue = require('bull');
const queue = Queue('trial');
const Nightmare = require('nightmare');
const Promise = require('bluebird');
const Result = require('./libs/result');
const ScreenShot = require('./libs/screenshot');
require('./libs/nightmare-extend');

function log () {
  console.log.apply(
    global,
    ['[e2e]'].concat(Array.prototype.slice.call(arguments))
  );
}

const actions = {
  getScreenshot(nightmare, { name, resultParams }) {
    if (!name || !resultParams) {
      return Promise.reject(new Error('invalid parameter'));
    }
    return nightmare.screenshot()
    .then((buf) => {
      resultParams.screenshots[name] = buf;
      return;
    });
  },

  getHtml(nightmare, { selectors, name, resultParams }) {
    if (!selectors || selectors.length === 0 || !name || !resultParams) {
      return Promise.reject(new Error('invalid parameter'));
    }
    const selector = selectors[0];
    return nightmare
    .wait(selector)
    .evaluate((selector) => {
      var elem = document.querySelector(selector);
      return elem ? elem.innerHTML : null;
    }, selector)
    .then((result) => {
      log('getHtml', result);
      resultParams.htmls[name] = result;
      return;
    });
  },
  
  getText(nightmare, { selectors, name, resultParams }) {
    if (!selectors || selectors.length === 0 || !name || !resultParams) {
      return Promise.reject(new Error('invalid parameter'));
    }
    const selector = selectors[0];
    return nightmare
    .wait(selector)
    .evaluate((selector) => {
      var elem = document.querySelector(selector);
      return elem ? elem.innerText : null;
    }, selector)
    .then((result) => {
      log('getText', result);
      resultParams.texts[name] = result;
      return;
    });
  }
};

['click'].forEach((actionType) => {
  actions[actionType] = (nightmare, { selectors }) => {
    if (!selectors || selectors.length === 0) {
      return Promise.reject(new Error('invalid parameter'));
    }
    const selector = selectors[0];
    return nightmare
    .wait(selector)
    [actionType](selector)
    .then(() => {
      log('Finish', actionType, selector);
      return;
    });
  }
});

['input', 'select'].forEach((actionType) => {
  actions[actionType] = (nightmare, { selectors, value }) => {
    if (!selectors || selectors.length === 0 || !value) {
      return Promise.reject(new Error('invalid parameter'));
    }
    const selector = selectors[0];
    console.log('type:', actionType, 'selector:', selector);
    const nightmareAction = (actionType === 'input') ? 'type' : actionType;
    return nightmare
    .wait(selector)
    [nightmareAction](selector, value)
    .then(() => {
      log('Finish', actionType, selector, value);
      return;
    });
  }
});

function onError(error, done) {
  log('ERROR', error);
  done(error);
}

function trial (jobId, params, done) {
  var resultParams = {
    jobId,
    screenshots: {},
    htmls: {},
    texts: {}
  };
  log(params);
  const url = params.url;
  const nightmare = Nightmare({show: true});
  nightmare.goto(url);

  let hasError = false;
  const actionsPromise = params.actions.reduce((promise, action) => {
    return promise.then(() => {
      if (hasError) return false;
      return actions[action.type](nightmare, {
        selectors: action.selectors,
        name: action.name,
        value: action.value,
        resultParams: resultParams
      })
      .catch((error) => {
        hasError = true;
        onError(error, done);
      });
    });
  }, Promise.resolve([]))

  actionsPromise
  .then(() => {
    if (hasError) return false;
    return nightmare.end().then(() => {
      resultParams.finished_at = (new Date()).getTime();
      const result = new Result(resultParams)
      result.save();
      done();
    });
  })
  // TODO: send error information
  .catch((error) => {
    onError(error, done);
  });
}

function process () {
  queue.process((job, done) => {
    try {
      log('job', job.jobId);
      trial(job.jobId, job.data, done);
    } catch (error) {
      onError(error, done)
    }
  });
}

process();
