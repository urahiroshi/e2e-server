const kue = require('kue');
const queue = kue.createQueue();
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

function trial (params, done) {
  var resultParams = {
    screenshots: {},
    innerHTMLs: {},
    innerTexts: {}
  };
  log(params);
  const url = params.url;
  const nightmare = Nightmare({show: true});
  nightmare.goto(url);

  const actionsPromise = params.actions.reduce((promise, action) => {
    return promise.then(() => {
      if (action.type === 'screenshot') {
        return nightmare.screenshot()
        .then((buf) => {
          const screenshot = new ScreenShot({
            name: action.param,
            binary: buf
          });
          return screenshot.save();
        })
        .then((key) => {
          log('ScreenShot', key);
          resultParams.screenshots[action.param] = key;
          return;
        });
      } else if (action.param == null) {
        nightmare[action.type](action.selector);
      } else {
        nightmare[action.type](action.selector, action.param);
      }
      return nightmare.then(() => {
        log('Finish', action.type, action.selector);
        return;
      })
    });
  }, Promise.resolve([]))

  actionsPromise
  .then(() => {
    return nightmare.end().then(() => {
      resultParams.finished_at = (new Date()).getTime();
      const result = new Result(resultParams)
      result.save();
      done();
    });
  })
  .catch((err) => {
    done(err);
  });
}

function process () {
  queue.process('trial', (job, done) => {
    try {
      log('job', job.id);
      trial(job.data.params, done);
    } catch (err) {
      log('ERROR', err);
      done(err);
    }
  });
}

process();
