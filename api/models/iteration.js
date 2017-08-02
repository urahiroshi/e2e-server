const Connector = require('../connectors/mysql');
const Helper = require('./helper');
const Base = require('./base');
const crypto = require('crypto');
const Promise = require('bluebird');
const validator = require('validator');
const Queue = require('bull');
const Trial = require('./trial');
const NotFoundError = require('../errors/not-found-error');
const Config = require('../config/config');
const trialQueue = Queue('trial', { redis: Config.redis });

class Iteration extends Base {
  constructor(params, options) {
    super();
    if (params) {
      this.set(params, options);
    }
  }

  validators() {
    return {
      trials: (trials) => {
        if (!Array.isArray(trials)) { return { trials: 'invalid type'}; }
        const trialsErrors = trials.map((trial, i) => {
          const trialInstance = new Trial(trial, {
            validate: false, hasUsecasePath: true
          });
          const errors = trialInstance.getValidationErrors();
          if (Object.keys(errors).length === 0) { return null; }
          return { [`trials[${i}]`]: errors };
        })
        .filter((errors) => !!errors);
        return Object.assign({}, ...trialsErrors);
      }
    };
  }

  toJSON() {
    return [
      'iterationNumber', 'state', 'createdAt', 'updatedAt', 'trials'
    ].reduce((result, key) => {
      if (this[key] != undefined) { result[key] = this[key]; }
      return result;
    }, {});
  }

  save(projectId) {
    this.validateAll();
    const id = Helper.randomInt();
    const now = new Date();
    const INITIAL_STATE = 'Initialized';
    let iterationNumber = 1;
    const connector = new Connector();
    const transaction = connector.transaction()
    .query('\
      select MAX(iteration_number) as max_iteration_number from project_iterations \
      where project_id = ?\
    ', projectId)
    .query((rows) => {
      if (rows.length > 0) {
        iterationNumber = (rows[0].max_iteration_number || 0) + 1;
      }
      return ['\
        insert into project_iterations \
          (project_id, iteration_number, created_at) \
          values (?, ?, ?)\
        ', projectId, iterationNumber, now
      ];
    });
    this.trials.forEach((trial) => {
      const trialId = Helper.randomInt();
      transaction.query((result) => ['\
        insert into trials \
          (trial_id, state, usecase_json, created_at, updated_at) \
          values (?, ?, ?, ?, ?)\
        ', trialId, INITIAL_STATE, JSON.stringify(trial.usecase), now, now
      ]);
      transaction.query((result) => ['\
        insert into project_trials \
          (project_id, iteration_number, usecase_path, trial_id) \
          values (?, ?, ?, ?)\
        ', projectId, iterationNumber, trial.usecasePath, trialId]);
      trial.id = trialId;
    });
    return transaction.end().then(() => {
      return Promise.all(this.trials.map((trial) => {
        return trialQueue.add(trial.usecase, { jobId: trial.id })
      }));
    })
    .then(() => {
      this.iterationNumber = iterationNumber;
      this.state = INITIAL_STATE;
      return this;
    });
  }

  static findAll({ projectId, offset, limit }) {
    const connector = new Connector();
    return connector.query('\
      select iteration_number, created_at\
        from project_iterations where project_id = ? \
        order by created_at desc limit ? offset ?\
      ', projectId, limit, offset
    )
    .then((rows) => {
      return rows.map((row) => {
        return new Iteration(Connector.camelCase(row), {
          validate: false
        });
      });
    });
  }

  static find(projectId, iterationNumber) {
    const connector = new Connector();
    const iteration = new Iteration();
    return connector.query('\
      select iteration_number, created_at \
        from project_iterations where project_id = ? and iteration_number = ?\
      ', projectId, iterationNumber
    )
    .then((rows) => {
      if (rows.length === 0) { throw new NotFoundError(); }
      iteration.set(Connector.camelCase(rows[0]), { validate: false });
      return connector.query('\
        select t.trial_id, t.state, t.created_at, t.updated_at, pt.usecase_path \
          from project_trials as pt \
          inner join trials as t on t.trial_id = pt.trial_id \
          where pt.project_id = ? and pt.iteration_number = ?\
        ', projectId, iterationNumber
      )
    })
    .then((rows) => {
      return Promise.all(rows.map(Trial.fromRow));
    })
    .then((trials) => {
      iteration.set({ trials }, { validate: false });
      return iteration;
    });
  }
}

module.exports = Iteration;
