const Connector = require('../connectors/mysql');
const Usecase = require('./usecase');
const Helper = require('./helper');
const Config = require('../config/config');
const Base = require('./base');
const Result = require('./result');

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
      let usecaseJson = usecase.toJSON();
      usecaseJson = {
        id: usecaseJson.id,
        url: usecaseJson.url,
        actions: usecaseJson.actions
      };
      const trialId = Helper.randomInt();
      const state = 'unknown';
      const connector = new Connector();
      const now = new Date();
      return connector.query('\
        insert into trials \
          (trial_id, usecase_id, state, usecase_json, created_at, updated_at) \
          values (?, ?, ?, ?, ?, ?) \
        ', trialId, this.usecaseId, state, JSON.stringify(usecaseJson), now, now
      )
      .then(() => {
        console.log('add job', trialId);
        return trialQueue.add(usecaseJson, { jobId: trialId });
      })
      .then(() => {
        this.id = trialId;
        this.state = state;
        this.usecase = usecaseJson;
        return this;
      });
    });
  }

  delete() {
    return this.job.remove()
    .then((res) => {
      console.log('remove job', res);
      return Result.find({ trialId: this.id })
      .then((results) => {
        const connector = new Connector();
        const transaction = connector.transaction();
        results.forEach((result) => {
          switch (result.actionType) {
            case 'getText':
              transaction.query(() => [
                'delete from result_texts where result_id = ?',
                result.resultId
              ]);
              break;
            case 'getHtml':
              transaction.query(() => [
                'delete from result_htmls where result_id = ?',
                result.resultId
              ]);
              break;
            case 'getScreenshot':
              transaction.query(() => [
                'delete from result_screenshots where result_id = ?',
                result.resultId
              ]);
              break;
            default:
              break;
          }
          transaction.query(() => [
            'delete from results where result_id = ?',
            result.resultId
          ]);
        });
        return transaction.query(() => [
          'delete from trials where trial_id = ?',
          this.id
        ]).end();
      });
    });
  }

  toJSON() {
    return {
      id: this.id,
      usecaseId: this.usecaseId,
      createdAt: this.createdAt,
      state: this.state,
      updatedAt: this.updatedAt,
      usecase: this.usecase
    };
  }

  static _construct(trialRow) {
    const trialObj = Connector.camelCase(trialRow);
    const trial = new Trial({
      id: trialObj.trialId,
      usecaseId: trialObj.usecaseId,
      createdAt: trialObj.createdAt,
      state: trialObj.state,
      updatedAt: trialObj.updatedAt,
      usecase: JSON.parse(trialObj.usecaseJson)
    });
    if (trial.state !== 'unknown') { return Promise.resolve(trial); }
    console.log('getJob: trialId(jobId)', trial.id);
    return trialQueue.getJob(trial.id)
    .then((job) => {
      if (!job || !job.data) { return trial; }
      return job.getState()
      .then((state) => {
        trial.state = state;
        trial.updatedAt = new Date(job.timestamp);
        return trial;
      });
    });
  }

  static find(id) {
    const connector = new Connector();
    return connector.query('select * from trials where trial_id = ?', id)
    .then((rows) => {
      if (rows.length <= 0) { return null; }
      return Trial._construct(rows[0]);
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
      return Promise.all(rows.map(Trial._construct));
    });
  }
}

module.exports = Trial;
