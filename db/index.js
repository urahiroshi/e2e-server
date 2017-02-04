const crypto = require('crypto');
const Queue = require('bull');
const resultQueue = Queue('result');

const Connector = require('./libs/mysql');

function randomInt() {
  return crypto.randomBytes(4).readUIntBE(0, 4);
}

function log() {
  console.log(...arguments);
}

function addJob ({ jobId, actionType, actionOrder, value }) {
  const resultId = randomInt();
  const connector = new Connector();
  const transaction = connector.transaction();
  transaction.query(() => ['\
    insert into results \
      (result_id, job_id, action_type, action_order) \
    values ( ?, ?, ?, ? )'
    , resultId, jobId, actionType, actionOrder
  ]);
  switch (actionType) {
    case 'getText':
      transaction.query(() => ['\
        insert into result_texts (result_id, txt) \
        values ( ?, ? )'
        , resultId, value
      ]);
      break;
    case 'getHtml':
      transaction.query(() => ['\
        insert into result_htmls (result_id, html) \
        values ( ?, ? )'
        , resultId, value
      ]);
      break;
    case 'getScreenshot':
      transaction.query(() => ['\
        insert into result_screenshots (result_id, image) \
        values ( ?, ? )'
        , resultId, Buffer.from(value, 'base64')
      ]);
      break;
    default:
      break;
  }
  return transaction.end();
}

function onError(error, done) {
  console.log(error, error.stack);
  done(error);
}

function process () {
  resultQueue.process((job, done) => {
    try {
      log('[ADD JOB]', Object.assign({}, job.data, {
        value: ((job.data.value && job.data.value.length > 128) ?
          job.data.value.slice(0, 128) + '...' : job.data.value
        )
      }));
      addJob(job.data)
      .then(() => {
        done();
      })
      .catch((error) => {
        onError(error, done);
      });
    } catch (error) {
      onError(error, done);
    }
  });
}

process();
