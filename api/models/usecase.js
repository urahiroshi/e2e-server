const Connector = require('../connectors/mysql');
const Helper = require('./helper');
const Base = require('./base');
const crypto = require('crypto');
const Promise = require('bluebird');
const validator = require('validator');

class Usecase extends Base {
  constructor(params) {
    console.log('params:', params);
    super();
    this.initialize();
    if (params) {
      this.set(params);
    }
  }

  initialize() {
    this.name = '';
    this.url = '';
    this.actions = [];
  }

  toJSON() {
    return {
      id: this.id,
      name: this.name,
      url: this.url,
      actions: this.actions,
      createdAt: this.createdAt
    };
  }

  validateTypes() {
    return {
      name: (value) => !Helper.isString(value),
      url: (value) => !validator.isURL(value),
      actions: (value) => (
        !Array.isArray(value) ||
        !value.every((action) => (
          (action.selectors == undefined || Array.isArray(action.selectors)) &&
          Helper.isString(action.type) &&
          Helper.isString(action.value, { nullable: true }) &&
          Helper.isString(action.variable, { nullable: true })
        ))
      )
    }
  }

  validateRanges() {
    return {
      name: (value) => (
        !validator.isLength(value, {min: 0, max: 255}) &&
        { name: `'${value}' is invaild length (valid length is between 0-255)` }
      ),
      actions: (value) => {
        const actionsErrors = value.map((action, i) => {
          const actionErrors = Usecase._validateAction(action);
          if (actionErrors.length > 0) {
            return { [`action[${i}]`]: Object.assign({}, ...actionErrors) };
          } else {
            return null;
          }
        })
        .filter((error) => !!error);
        if (actionsErrors.length > 0) {
          return Object.assign({}, ...actionsErrors);
        }
        return;
      }
    }
  }

  _create() {
    const id = Helper.randomInt();
    const connector = new Connector();
    // TODO: Add created_at parameter, and return it
    const transaction = connector.transaction()
    .query(
      'insert into usecases (usecase_id, name, url) values (?, ?, ?)',
      id, this.name, this.url
    );
    return Usecase._createActions(transaction, id, this.actions)
    .end()
    .then(() => {
      this.set({ id });
      return this;
    });
  }

  _update() {
    const connector = new Connector();
    return Usecase._deleteActions(connector, this.id)
    .then((transaction) => {
      return Usecase._createActions(transaction, this.id, this.actions)
      .query(
        'update usecases set name=?, url=? where usecase_id = ?',
        this.name, this.url, this.id
      )
      .end();
    })
    .then(() => {
      return this;
    });
  }

  save() {
    this.validateAll();
    if (this.id == undefined) {
      return this._create();
    } else {
      return this._update();
    }
  }

  delete() {
    const connector = new Connector();
    return Usecase._deleteActions(connector, this.id)
    .then((transaction) => {
      return transaction.query(
        'delete from usecases where usecase_id = ?', this.id
      )
      .end();
    });
  }

  static _validateAction({selectors, type, value, variable}) {
    const errors = [];
    if (
      Usecase._isInputAction(type) &&
      !(value && validator.isLength(value, { min: 1, max: 255 }))
    ) {
      errors.push({
        value: `'${value}' is invalid length (valid length is between 1 - 255)`
      });
    } else if (!Usecase._isInputAction(type) && value != null) {
      errors.push({
        value: `'${value}' is set, but type '${type}' must have no value`
      });
    }
    if (
      Usecase._isSelectorAction(type) &&
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
      !Usecase._isSelectorAction(type) &&
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
      Usecase._isVariableAction(type) &&
      variable &&
      !validator.isLength(variable, {min: 1, max: 63})
    ) {
      errors.push({
        variable: (
          `'${variable}' is invalid length` +
          ' (valid length is between 1 - 63)'
        )
      })
    } else if (!Usecase._isVariableAction(type) && variable != null) {
      errors.push({
        variable: (
          `'${variable}' is set, but type '${type}' must have no variable`
        )
      })
    }
    return errors;
  }

  static getActionTypes() {
    return [
      'input', 'select', 'click', 'getText', 'getHtml', 'getScreenshot'
    ];
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

  // Return transaction (not Promise)
  static _deleteAction(transaction, actionId) {
    ['usecase_actions', 'action_selectors', 'actions'].forEach((table) => {
      transaction.query(`delete from ${table} where action_id = ?`, actionId);
    });
    return transaction;
  }

  // Return Promise with transaction created by connector
  static _deleteActions(connector, usecaseId) {
    return connector.query(
      'select action_id from usecase_actions where usecase_id = ?',
      usecaseId
    )
    .then((rows) => {
      const transaction = connector.transaction();
      rows.forEach((row) => {
        Usecase._deleteAction(transaction, row['action_id']);
      });
      return transaction;
    })
  }

  static _createAction(transaction, usecaseId, action, actionIndex) {
    if (Usecase._isInputAction(action.type) && !action.value) {
      throw new Error('No Input', action);
    }
    const actionId = Helper.randomInt();
    transaction.query(
      'insert into actions (action_id, type, value, variable) values (?, ?, ?, ?)',
      actionId, action.type, action.value || null, action.variable || null
    )
    .query(
      'insert into usecase_actions (usecase_id, action_order, action_id)\
       values (?, ?, ?)',
      usecaseId, actionIndex + 1, actionId
    );
    if (Usecase._isSelectorAction(action.type)) {
      if (!action.selectors || action.selectors.length === 0) {
        throw new Error('No Selectors', action);
      }
      action.selectors.forEach((selector, selectorIndex) => {
        transaction.query(
          'insert into action_selectors (action_id, selector_order, selector)\
           values (?, ?, ?)',
          actionId, selectorIndex + 1, selector
        );
      });
    }
    return transaction;
  }

  static _createActions(transaction, usecaseId, actions) {
    actions.forEach((action, i) => {
      Usecase._createAction(transaction, usecaseId, action, i);
    });
    return transaction;
  }

  static _findActions(connector, usecaseId) {
    return connector.query('\
      select usecase_actions.action_order, usecase_actions.action_id, \
        actions.type, actions.value, actions.variable \
      from usecase_actions \
      inner join actions on usecase_actions.action_id = actions.action_id \
      where usecase_actions.usecase_id = ? \
      order by usecase_actions.action_order \
    ', usecaseId)
    .then((rows) => {
      let actions = [];
      return rows.reduce((promise, row) => {
        return promise.then(() => {
          return connector.query('\
            select selector, selector_order from action_selectors \
            where action_id = ? order by selector_order',
            row['action_id']
          );
        })
        .then((selectorRows) => {
          actions.push({
            type: row['type'],
            value: row['value'],
            variable: row['variable'],
            selectors: selectorRows.map((selectorRow) => (
              selectorRow.selector
            ))
          });
          return actions;
        })
      }, Promise.resolve())
    });
  }

  static _construct(usecaseRow, id, actions) {
    return new Usecase({
      id,
      name: usecaseRow['name'],
      url: usecaseRow['url'],
      createdAt: usecaseRow['created_at'],
      actions
    });
  }

  static find(id) {
    const connector = new Connector();
    return connector.query('select * from usecases where usecase_id = ?', id)
    .then((rows) => {
      if (rows.length <= 0) { return null; }
      return Usecase._findActions(connector, id)
      .then((actions) => {
        return Usecase._construct(rows[0], id, actions);
      });
    });
  }

  static findAll() {
    const connector = new Connector();
    return connector.query('select * from usecases')
    .then((rows) => {
      return Promise.all(rows.map((row) => {
        return Usecase._findActions(connector, row['usecase_id'])
        .then((actions) => {
          return Usecase._construct(row, row['usecase_id'], actions);
        })
      }));
    });
  }
}

module.exports = Usecase;