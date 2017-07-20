const Queue = require('bull');
const Nightmare = require('nightmare');
const Promise = require('bluebird');
const ScreenShot = require('./libs/screenshot');
const Action = require('./libs/nightmare-action');
const Config = require('./config');

const trialQueue = Queue('trial', { redis: Config.redis });
const resultQueue = Queue('result', { redis: Config.redis });

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

  getHtml(nightmare, { selectors, variable, result, context }) {
    if (!selectors || selectors.length === 0 || !result) {
      return Promise.reject(new Error('invalid parameter'));
    }
    return nightmare
    .use(Action.getHtml(selectors))
    .then((html) => {
      log('getHtml', html);
      if (variable != null) {
        context[variable] = html;
      }
      result.value = html;
      return;
    });
  },
  
  getText(nightmare, { selectors, variable, result, context }) {
    if (!selectors || selectors.length === 0 || !result) {
      return Promise.reject(new Error('invalid parameter'));
    }
    return nightmare
    .use(Action.getText(selectors))
    .then((text) => {
      log('getText', text);
      if (variable != null) {
        context[variable] = text;
      }
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

function onError(error, jobId, done) {
  log('ERROR', error);
  done(error);
  resultQueue.add({
    trialId: jobId,
    actionType: 'failTrial',
    state: 'failed',
    error: error.message
  });
}

function replaceVariables (origin, context) {
  if (origin == null) { return origin; }
  let replaced;
  if (Array.isArray(origin)) {
    replaced = origin.slice();
  } else {
    replaced = origin;
  }
  Object.keys(context).forEach((variable) => {
    const replacer = '${' + variable + '}';
    if (Array.isArray(origin)) {
      replaced = replaced.map((member) => {
        return member.replace(replacer, context[variable]);
      });
    } else if (typeof origin === 'string') {
      replaced = replaced.replace(replacer, context[variable]);
    }
  });
  return replaced;
}

function trial (jobId, params, done) {
  log(params);
  const url = params.url;
  const nightmare = Nightmare({ show: false, width: 1280, height: 960 });
  nightmare.goto(url);

  let hasError = false;
  const context = {};
  const actionsPromise = params.actions.reduce((promise, action, index) => {
    return promise.then(() => {
      if (hasError) return false;
      const result = {
        trialId: jobId, actionType: action.type, actionOrder: index + 1
      };
      console.log('selectors', replaceVariables(action.selectors, context), 'value', replaceVariables(action.value, context));
      return actions[action.type](nightmare, {
        selectors: replaceVariables(action.selectors, context),
        value: replaceVariables(action.value, context),
        variable: action.variable,
        result,
        context
      })
      .then(() => {
        resultQueue.add(result);
      })
      .catch((error) => {
        hasError = true;
        onError(error, jobId, done);
      });
    });
  }, Promise.resolve([]))

  actionsPromise
  .then(() => {
    return nightmare.end().then(() => {
      if (hasError) { return false; }
      resultQueue.add({
        trialId: jobId,
        actionType: 'completeTrial',
        state: 'completed'
      });
      done();
    });
  })
  .catch((error) => {
    onError(error, jobId, done);
  });
}

function process () {
  trialQueue.process((job, done) => {
    try {
      log('job', job.id);
      trial(job.id, job.data, done);
    } catch (error) {
      onError(error, job.id, done)
    }
  });
}

process();
