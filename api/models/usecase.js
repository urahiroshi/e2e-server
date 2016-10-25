const Connector = require('../connectors/redis');
const Helper = require('./helper');
const crypto = require('crypto');
const Promise = require('bluebird');

class Usecase {
  constructor(params) {
    this.initialize();
    this.set(params);
  }

  initialize() {
    this.name = '';
    this.url = '';
    this.actions = [];
    this.timeout = 0;
    this.validation = [];
    this.browser = {};
  }

  toJSON() {
    return {
      name: this.name,
      url: this.url,
      actions: this.actions,
      timeout: this.timeout,
      validation: this.validation,
      browser: this.browser
    };
  }

  set(params) {
    [
      'name', 'url', 'actions', 'timeout', 'validation', 'browser'
    ].forEach((key) => {
      if (params[key]) {
        this[key] = params[key];
      }
    });
  }

  save() {
    const connector = new Connector();
    const isNew = !this.id;
    const id = isNew ? Helper.createKey() : this.id;
    let result = (
      connector
      .multi()
      .set(id, this.toJSON())
    );
    if (isNew) {
      result.sadd('usecases', id);
    }
    return (
      result
      .exec()
      .then((res) => {
        console.log(res);
        return res;
      })
      .finally(() => {
        connector.close();
      })
    );
  }

  delete() {
    const connector = new Connector();
    const id = this.id;
    return connector.multi()
    .del(id)
    .srem('usecases', id)
    .exec()
    .then((res) => {
      console.log(res);
      return res;
    })
    .finally(() => {
      connector.close();
    });
  }

  static find(id) {
    const connector = new Connector();
    return connector.get(id)
    .then((res) => {
      const usecase = new Usecase(res);
      usecase.id = id;
      return usecase;
    })
    .finally(() => {
      connector.close();
    });
  }

  static findAll() {
    const connector = new Connector();
    return connector.smembers('usecases')
    .then((ids) => {
      console.log('usecases', ids);
      const idsAsync = ids.map((id) => {
        return connector.get(id);
      });
      return Promise.all(idsAsync);
    })
    .finally(() => {
      connector.close();
    });
  }
}

module.exports = Usecase;