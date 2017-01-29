const Connector = require('../connectors/mysql');
const Usecase = require('./usecase');
const Helper = require('./helper');
const Config = require('../config/config');
const Base = require('./base');
const _ = require('lodash');

const Queue = require('bull');
const trialQueue = Queue('trial');

class Trial extends Base {
  constructor(params) {
    super();
    this.set(params);
  }

  validateTypes() {
    return {
      usecaseId: Number.isInteger
    }
  }

  validateRanges() {
    return {
      usecaseId: (value) => value > 0 && value < Math.pow(2, 32)
    }
  }

  save() {
    this.validateAll();
    return Usecase.find(this.usecaseId)
    .then((usecase) => {
      const data = Object.assign(usecase.toJSON(), {
        usecaseId: this.usecaseId
      });
      const jobId = Helper.randomInt();
      const connector = new Connector();
      return connector.query(
        'insert into trials (job_id, usecase_id) values (?, ?)',
        jobId, this.usecaseId
      )
      .then(() => {
        console.log('add job', jobId);
        return trialQueue.add(data, { jobId: jobId });
      })
      .then(() => {
        this.id = jobId;
        return this;
      });
    });
  }

  delete() {
    return this.job.remove()
    .then((res) => {
      console.log('remove job', res);
      const connector = new Connector();
      return connector.query(
        'delete from trials where job_id = ?',
        this.id
      );
    });
  }

  toJSON() {
    const baseObject = { id: this.id, usecaseId: this.usecaseId }
    if (this.job) {
      return Object.assign(
        baseObject,
        {
          createdAt: this.createdAt,
          state: this.state,
          job: this.job,
          timestamp: this.job.timestamp,
          usecase: this.job.data
        }
      );
    }
    return baseObject;
  }

  static _findJobAndConcat(trialRow) {
    // TODO: Consider performance by many jobs
    const trial = Connector.camelCase(trialRow);
    const jobId = trial.jobId;
    console.log('getJob: jobId', jobId);
    return trialQueue.getJob(jobId)
    .then((job) => {
      if (job && job.data) {
        return job.getState()
        .then((state) => {
          return {
            id: jobId,
            usecaseId: job.data.id,
            createdAt: trial.createdAt,
            // TODO: Verify correctness to return job
            state,
            job,
            timestamp: job.timestamp,
            usecase: job.data
          };
        });
      } else {
        return null;
      }
    });
  }

  static find(id) {
    const connector = new Connector();
    return connector.query('select * from trials where job_id = ?', id)
    .then((rows) => {
      if (rows.length <= 0) { return null; }
      return Trial._findJobAndConcat(rows[0]);
    });
  }

  static findAll({ offset, length, usecaseId }) {
    offset = offset || 0;
    length = length || 1;
    const connector = new Connector();
    let query;
    if (usecaseId) {
      query = connector.query(
        'select * from trials where usecase_id = ?\
         order by created_at desc limit ? offset ?',
        usecaseId, length, offset
      )
    } else {
      query = connector.query(
        'select * from trials\
         order by created_at desc limit ? offset ?',
        length, offset
      )
    }
    return query.then((rows) => {
      return Promise.all(rows.map(Trial._findJobAndConcat))
      .then((trials) => trials.filter((trial) => !!trial));
    });
  }
}

module.exports = Trial;
