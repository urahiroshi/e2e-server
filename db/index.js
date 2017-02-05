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

function addResult ({ trialId, actionType, actionOrder, value }) {
  const resultId = randomInt();
  const connector = new Connector();
  const transaction = connector.transaction();
  transaction.query(() => ['\
    insert into results \
      (result_id, trial_id, action_type, action_order) \
    values ( ?, ?, ?, ? )'
    , resultId, trialId, actionType, actionOrder
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

function completeTrial ({ trialId, state, updatedAt }) {
  const connector = new Connector();
  return connector.query(
    'update trials set state = ?, updated_at= ? where trial_id = ?',
    state, updatedAt, trialId
  );
}

function failTrial ({ trialId, state, error, updatedAt }) {
  const connector = new Connector();
  return connector.query(
    'update trials set state = ?, updated_at= ?, error = ? where trial_id = ?',
    state, updatedAt, error, trialId
  );
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
      let jobPromise;
      if (job.data.actionType === 'completeTrial') {
        jobPromise = completeTrial(Object.assign({}, job.data, {
          updatedAt: new Date(job.timestamp)
        }));
      } else if (job.data.actionType === 'failTrial') {
        jobPromise = failTrial(Object.assign({}, job.data, {
          updatedAt: new Date(job.timestamp)
        }));
      } else {
        jobPromise = addResult(job.data)
      }
      jobPromise.then(() => {
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
