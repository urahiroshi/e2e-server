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
  screenshot(nightmare, { param, resultParams }) {
    if (!param || !resultParams) {
      return Promise.reject(new Error('invalid parameter'));
    }
    return nightmare.screenshot()
    .then((buf) => {
      resultParams.screenshots[param] = buf;
      return;
    });
  },

  innerHTML(nightmare, { selector, param, resultParams }) {
    if (!selector || !param || !resultParams) {
      return Promise.reject(new Error('invalid parameter'));
    }
    return nightmare.evaluate((selector) => {
      var elem = document.querySelector(selector);
      return elem ? elem.innerHTML : null;
    }, selector)
    .then((result) => {
      log('innerHTML', result);
      resultParams.innerHTMLs[param] = result;
      return;
    });
  },
  
  innerText(nightmare, { selector, param, resultParams }) {
    if (!selector || !param || !resultParams) {
      return Promise.reject(new Error('invalid parameter'));
    }
    return nightmare.evaluate((selector) => {
      var elem = document.querySelector(selector);
      return elem ? elem.innerText : null;
    }, selector)
    .then((result) => {
      log('innerText', result);
      resultParams.innerTexts[param] = result;
      return;
    });
  }
};

['click'].forEach((actionType) => {
  actions[actionType] = (nightmare, { selector }) => {
    if (!selector) {
      return Promise.reject(new Error('invalid parameter'));
    }
    return nightmare[actionType](selector)
    .then(() => {
      log('Finish', actionType, selector);
      return;
    });
  }
});

['type', 'select'].forEach((actionType) => {
  actions[actionType] = (nightmare, { selector, param }) => {
    if (!selector || !param) {
      return Promise.reject(new Error('invalid parameter'));
    }
    return nightmare[actionType](selector, param)
    .then(() => {
      log('Finish', actionType, selector, param);
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
    innerHTMLs: {},
    innerTexts: {}
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
        selector: action.selector,
        param: action.param,
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
