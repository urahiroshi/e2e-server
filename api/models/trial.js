const Connector = require('../connectors/mysql');
const Helper = require('./helper');
const Config = require('../config/config');
const Base = require('./base');
const Result = require('./result');
const NotFoundError = require('../errors/not-found-error');
const ValidationError = require('../errors/validation-error');
const validator = require('validator');

const _ = require('lodash');
const Queue = require('bull');

const trialQueue = Queue('trial', Config.redis.port, Config.redis.host);

class Trial extends Base {
  constructor(params, options) {
    super();
    if (options == undefined) { options = {}; }
    this.hasUsecasePath = options.hasUsecasePath || false;
    if (params) {
      this.set(params, options);
    }
  }

  set(params) {
    // replace object selector to JSON string
    if (!params.usecase || !Array.isArray(params.usecase.actions)) {
      super.set(params);
      return;
    }
    super.set(Object.assign({}, params, {
      actions: params.usecase.actions.map((action) => {
        if (!action.selectors) { return action; }
        return Object.assign({}, action, {
          selectors: action.selectors.map((selector) => {
            if (typeof selector === 'object') {
              return JSON.stringify(selector);
            }
            return selector;
          })
        })
      })
    }));
  }

  toJSON() {
    const json = {
      id: this.id,
      actions: this.actions,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
      state: this.state,
    };
    [
      'usecase', 'error', 'projectId', 'iterationNumber', 'usecasePath'
    ].forEach((key) => {
      if (this[key] != undefined) { json[key] = this[key]; }
    });
    return json;
  }

  validators() {
    const hasUsecasePath = this.hasUsecasePath;
    return {
      usecasePath: (usecasePath) => {
        if (!hasUsecasePath) { return false; }
        if (!Helper.isString(usecasePath)) {
          return { usecasePath: 'invalid type' };
        }
        if (!validator.isLength(usecasePath, { min: 1, max: 255 })) {
          return {
            usecasePath: (
              `'${usecasePath}' is invalid length (valid length is between 1 - 255)`
            )
          };
        }
      },
      usecase: (usecase) => {
        if (typeof usecase !== 'object') { return { usecase: 'invalid type' }; }
        const error = {};
        if (!validator.isURL(usecase.url)) {
          error['usecase.url'] = `invalid type` ;
        }
        if (
          !Array.isArray(usecase.actions) ||
          !usecase.actions.every((action) => (
            (action.selectors == undefined || Array.isArray(action.selectors)) &&
            Helper.isString(action.type) &&
            Helper.isString(action.value, { nullable: true }) &&
            Helper.isString(action.variable, { nullable: true })
          ))
        ) {
          error['usecase.actions'] = `invalid type`;
          return error;
        }
        const actionsErrors = usecase.actions.map((action, i) => {
          const actionErrors = Trial._validateAction(action);
          if (actionErrors.length > 0) {
            return { [`usecase.actions[${i}]`]: Object.assign({}, ...actionErrors) };
          } else {
            return null;
          }
        })
        .filter((actionError) => !!actionError);
        if (actionsErrors.length > 0) {
          return Object.assign({}, ...actionsErrors);
        }
        return;
      }
    }
  }

  static _validateAction({selectors, type, value, variable}) {
    const errors = [];
    if (
      Trial._isInputAction(type) &&
      !(value && validator.isLength(value, { min: 1, max: 255 }))
    ) {
      errors.push({
        value: `'${value}' is invalid length (valid length is between 1 - 255)`
      });
    } else if (!Trial._isInputAction(type) && value != null) {
      errors.push({
        value: `'${value}' is set, but type '${type}' must have no value`
      });
    }
    if (
      Trial._isSelectorAction(type) &&
      !(
        selectors &&
        selectors.length > 0 &&
        selectors.length < 256 &&
        selectors.every((selector) => (
          Helper.isString(selector) &&
          validator.isLength(selector, { min: 1, max: 255 })
        ))
      )
    ) {
      errors.push({
        selectors: (
          `'${JSON.stringify(selectors)}' is invalid length` +
          ' or one of selector has invalid length' +
          ' (valid length is between 1 - 255)'
        )
      });
    } else if (
      !Trial._isSelectorAction(type) &&
      selectors &&
      selectors.length > 0
    ) {
      errors.push({
        selectors: (
          `'${JSON.stringify(selectors)}' is set,` +
          ` but type '${type}' must have no selectors`
        )
      });
    }
    if (
      Trial._isVariableAction(type) &&
      variable &&
      !validator.isLength(variable, {min: 1, max: 63})
    ) {
      errors.push({
        variable: (
          `'${variable}' is invalid length` +
          ' (valid length is between 1 - 63)'
        )
      })
    } else if (!Trial._isVariableAction(type) && variable != null) {
      errors.push({
        variable: (
          `'${variable}' is set, but type '${type}' must have no variable`
        )
      })
    }
    return errors;
  }

  static _isInputAction(type) {
    const inputActions = ['input', 'select'];
    return inputActions.includes(type);
  }

  static _isVariableAction(type) {
    const variableActions = ['getText', 'getHtml'];
    return variableActions.includes(type);
  }

  static _isSelectorAction(type) {
    const notSelectorActions = ['getScreenshot'];
    return !notSelectorActions.includes(type);
  }

  save() {
    this.validateAll();
    const trialId = Helper.randomInt();
    const INITIAL_STATE = 'Initialized';
    const connector = new Connector();
    const now = new Date();
    return connector.query('\
      insert into trials \
        (trial_id, state, usecase_json, created_at, updated_at) \
        values (?, ?, ?, ?, ?) \
      ', trialId, INITIAL_STATE, JSON.stringify(this.usecase), now, now
    )
    .then(() => {
      console.log('add job', trialId);
      return trialQueue.add(this.usecase, { jobId: trialId });
    })
    .then(() => {
      this.id = trialId;
      this.state = INITIAL_STATE;
      return this;
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

  static fromRow(trialRow) {
    const trialObj = Connector.camelCase(trialRow);
    const trial = new Trial({
      id: trialObj.trialId,
      createdAt: trialObj.createdAt,
      state: trialObj.state,
      updatedAt: trialObj.updatedAt,
    });
    if (trialObj.usecaseJson) {
      trial.usecase = JSON.parse(trialObj.usecaseJson);
    }
    ['error', 'projectId', 'iterationNumber', 'usecasePath'].forEach((key) => {
      if (trialObj[key] != undefined) { trial[key] = trialObj[key]; }
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

  static find(trialId) {
    const connector = new Connector();
    return connector.query('\
      select t.trial_id, t.state, t.usecase_json, t.created_at, \
        t.updated_at, t.error, pt.iteration_number, pt.usecase_path \
      from trials as t \
      left outer join project_trials as pt on t.trial_id = pt.trial_id \
      where t.trial_id = ?\
    ', trialId)
    .then((rows) => {
      if (rows.length <= 0) { throw new NotFoundError(); }
      return Trial.fromRow(rows[0]);
    });
  }

  static findByUsecase(
    { projectId, usecasePath, offset, lastIterationNumber, limit }
  ) {
    const error = {};
    if (projectId == undefined) { error.projectId = 'need to be set'; }
    if (usecasePath == undefined) { error.usecasePath = 'need to be set'; }
    if (Object.keys(error).length > 0) { throw new ValidationError(error); }
    if (offset == undefined && lastIterationNumber == undefined) {
      offset = 0;
    }
    limit = limit || 10;
    const connector = new Connector();
    let query;
    if (offset != undefined) {
      query = connector.query('\
        select t.trial_id, t.state, t.created_at, t.updated_at, \
          pt.iteration_number \
        from project_trials as pt \
        left outer join trials as t on t.trial_id = pt.trial_id \
        where pt.project_id = ? and pt.usecase_path = ? \
        order by t.created_at desc limit ? offset ? \
      ', projectId, usecasePath, limit, offset);
    } else if (lastIterationNumber != undefined) {
      query = connector.query('\
        select t.trial_id, t.state, t.created_at, t.updated_at, \
          pt.iteration_number \
        from project_trials as pt \
        left outer join trials as t on t.trial_id = pt.trial_id \
        where pt.project_id = ? and pt.usecase_path = ? and pt.iteration_number <= ? \
        order by t.created_at desc limit ? \
      ', projectId, usecasePath, lastIterationNumber, limit);
    }
    return query.then((rows) => {
      return Promise.all(rows.map(Trial.fromRow));
    });
  }

  static findByIterationNumber({ projectId, iterationNumber }) {
    const error = {};
    if (projectId == undefined) { error.projectId = 'need to be set'; }
    if (iterationNumber == undefined) { error.iterationNumber = 'need to be set'; }
    if (Object.keys(error).length > 0) { throw new ValidationError(error); }
    const connector = new Connector();
    return connector.query('\
      select t.trial_id, t.state, t.created_at, t.updated_at, \
        pt.iteration_number \
      from project_trials as pt \
      left outer join trials as t on t.trial_id = pt.trial_id \
      where pt.project_id = ? and pt.iteration_number = ? \
    ', projectId, iterationNumber)
    .then((rows) => {
      return Promise.all(rows.map(Trial.fromRow));
    })
  }
}

module.exports = Trial;
