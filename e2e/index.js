const kue = require('kue');
const queue = kue.createQueue();
const Nightmare = require('nightmare');
const Result = require('./libs/result');
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
  params.flow.forEach((flow) => {
    try {
      nightmare.wait(flow.selector);
      if (flow.param == null) {
        nightmare[flow.action](flow.selector);
      } else {
        nightmare[flow.action](flow.selector, flow.param);
      }
      nightmare.exec(() => { log('Finish', flow.action, flow.selector); })
    } catch (err) {
      log('ERROR', err);
      done(err);
    }
  });
  nightmare
  .end()
  .then(() => {
    const result = new Result({finished_at: (new Date()).getTime()})
    result.save();
    done();
  })
  .catch((error) => {
    done(error);
  });
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
