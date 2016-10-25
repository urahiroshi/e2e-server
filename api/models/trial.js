const Connector = require('../connectors/redis');
const Usecase = require('./usecase');
const Helper = require('./helper');
const Config = require('../config/config');
const _ = require('lodash');

const Queue = require('bull');
const trialQueue = Queue('trial');

class Trial {
  constructor({ usecaseId }) {
    this.usecaseId = usecaseId;
  }

  save() {
    return Usecase.find(this.usecaseId)
    .then((usecase) => {
      const data = Object.assign(usecase.toJSON(), {
        usecaseId: this.usecaseId
      });
      const jobId = Helper.random();
      const connector = new Connector();
      return connector.multi()
      .sadd('jobs', jobId)
      .sadd(`${this.usecaseId}:jobs`, jobId)
      .exec()
      .then((res) => {
        console.log(res);
        return trialQueue.add(data, { jobId: jobId });
      })
      .finally(() => {
        connector.close();
      });
    });
  }

  static delete(jobId) {
    let usecaseId;
    trialQueue.getJob(jobId)
    .then((job) => {
      usecaseId = job.data.usecaseId;
      return job.remove();
    })
    .then((res) => {
      console.log('remove job', res);
      const connector = new Connector();
      return connector.multi()
      .srem('jobs', jobId)
      .srem(`${usecaseId}:jobs`, jobId)
      .exec()
      .finally(() => {
        connector.close();
      })
    })
  }

  static _jobToTrial(job) {
    const trial = new Trial({ usecaseId: job.data.usecaseId });
    Object.assign(trial, job.toJSON());
    // TODO: Consider performance by many jobs
    return job.getState()
    .then((state) => {
      trial.state = state;
      return trial;
    });
  }

  static find(id) {
    return trialQueue.getJob(id)
    .then((job) => {
      if (job && job.data) {
        return Trial._jobToTrial(job);
      } else {
        return null;
      }
    });
  }

  static findAll({ offset, length, usecaseId }) {
    const connector = new Connector();
    const key = usecaseId ? `${usecaseId}:jobs` : 'jobs';
    return connector.smembers(key)
    .then((ids) => {
      let targetIds = ids.slice().reverse();
      if (offset && length) {
        targetIds = ids.slice(offset, offset + length);
      } else if (length) {
        targetIds = ids.slice(0, length);
      } else if (offset) {
        targetIds = ids.slice(offset);
      }
      console.log('trials', targetIds);
      return Promise.all(targetIds.map(Trial.find))
      .then((trials) => {
        return trials.filter((trial) => !!trial);
      });
    });
  }
}

module.exports = Trial;
