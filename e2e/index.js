const Queue = require('bull');
const trialQueue = Queue('trial');
const resultQueue = Queue('result');
const Nightmare = require('nightmare');
const Promise = require('bluebird');
const Result = require('./libs/result');
const ScreenShot = require('./libs/screenshot');
const Action = require('./libs/nightmare-action');

function log () {
  console.log.apply(
    global,
    ['[e2e]'].concat(Array.prototype.slice.call(arguments))
  );
}

const actions = {
  getScreenshot(nightmare, { result }) {
    if (!result) {
      return Promise.reject(new Error('invalid parameter'));
    }
    return nightmare.screenshot()
    .then((buf) => {
      result.value = buf.toString('base64');
      return;
    });
  },

  getHtml(nightmare, { selectors, result }) {
    if (!selectors || selectors.length === 0 || !result) {
      return Promise.reject(new Error('invalid parameter'));
    }
    return nightmare
    .use(Action.getHtml(selectors))
    .then((html) => {
      log('getHtml', html);
      result.value = html;
      return;
    });
  },
  
  getText(nightmare, { selectors, result }) {
    if (!selectors || selectors.length === 0 || !result) {
      return Promise.reject(new Error('invalid parameter'));
    }
    return nightmare
    .use(Action.getText(selectors))
    .then((text) => {
      log('getText', text);
      result.value = text;
      return;
    });
  }
};

['click'].forEach((actionType) => {
  actions[actionType] = (nightmare, { selectors }) => {
    if (!selectors || selectors.length === 0) {
      return Promise.reject(new Error('invalid parameter'));
    }
    return nightmare
    .use(Action[actionType](selectors))
    .then(() => {
      log('Finish', actionType, selectors);
      return;
    });
  }
});

['input', 'select'].forEach((actionType) => {
  actions[actionType] = (nightmare, { selectors, value }) => {
    if (!selectors || selectors.length === 0 || !value) {
      return Promise.reject(new Error('invalid parameter'));
    }
    return nightmare
    .use(Action[actionType](selectors, value))
    .then(() => {
      log('Finish', actionType, selectors, value);
      return;
    });
  }
});

function onError(error, done) {
  log('ERROR', error);
  done(error);
}

function trial (jobId, params, done) {
  log(params);
  const url = params.url;
  const nightmare = Nightmare({show: true});
  nightmare.goto(url);

  let hasError = false;
  const actionsPromise = params.actions.reduce((promise, action, index) => {
    return promise.then(() => {
      if (hasError) return false;
      const result = {
        jobId, actionType: action.type, actionOrder: index + 1
      };
      return actions[action.type](nightmare, {
        selectors: action.selectors,
        value: action.value,
        result
      })
      .then(() => {
        resultQueue.add(result);
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
      done();
    });
  })
  // TODO: send error information
  .catch((error) => {
    onError(error, done);
  });
}

function process () {
  trialQueue.process((job, done) => {
    try {
      log('job', job.jobId);
      trial(job.jobId, job.data, done);
    } catch (error) {
      onError(error, done)
    }
  });
}

process();
