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
  log(params);
  const url = params.url;
  const nightmare = Nightmare({show: true});
  nightmare.goto(url);

  const actionsPromise = params.actions.reduce((promise, action) => {
    return promise.then(() => {
      if (action.type === 'screenshot') {
        return nightmare.screenshot()
        .then((buf) => {
          const screenshot = new ScreenShot(buf);
          return screenshot.save();
        })
        .then((key) => {
          log('ScreenShot', key);
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

  actionsPromise.finally(() => {
    nightmare.end().then(() => {
      const result = new Result({finished_at: (new Date()).getTime()})
      result.save();
      done();
    });
  });

  // params.actions.forEach((action) => {
  //   try {
  //     nightmare.wait(action.selector);
  //     if (action.param == null) {
  //       nightmare[action.type](action.selector);
  //     } else {
  //       nightmare[action.type](action.selector, action.param);
  //     }
  //     nightmare.exec(() => { log('Finish', action.type, action.selector); })
  //   } catch (err) {
  //     log('ERROR', err);
  //     done(err);
  //   }
  // });
  // nightmare.screenshot()
  // .end()
  // .then((buf) => {
  //   const screenshot = new ScreenShot(buf);
  //   screenshot.save()
  //   .then((key) => {
  //     log('ScreenShot', key);
  //     const result = new Result({finished_at: (new Date()).getTime()})
  //     result.save();
  //     done();
  //   })
  //   .catch((error) => {
  //     log('ScreenShot Error', error);
  //   });
  // });
}

function process () {
  queue.process('trial', (job, done) => {
    try {
      log('id', job.id);
      trial(job.data.params, done);
    } catch (err) {
      log('ERROR', err);
      done(err);
    }
  });
}

process();
