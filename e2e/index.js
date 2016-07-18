const kue = require('kue');
const queue = kue.createQueue();
const Nightmare = require('nightmare');

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
    nightmare.wait(flow.selector);
    if (flow.param == null) {
      nightmare[flow.action](flow.selector);
    } else {
      nightmare[flow.action](flow.selector, flow.param);
    }
  });
  nightmare
  .end()
  .then(() => {
    done();
  })
  .catch((error) => {
    done(error);
  });
}

function process () {
  queue.process('trial', (job, done) => {
    log('id', job.id);
    trial(job.data.params, done);
  });
}

process();
