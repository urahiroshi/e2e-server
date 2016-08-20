const Connector = require('../connectors/redis');
const Helper = require('./helper');
const crypto = require('crypto');
const Promise = require('bluebird');

class Usecase {
  constructor(params) {
    this.params = {
      url: params.url || '',
      actions: params.actions || [],
      timeout: params.timeout || 0,
      validation: params.validation || [],
      browser: params.browser || {}
    };
  }

  save() {
    const connector = new Connector();
    const key = this.key || Helper.createKey();
    return connector.multi()
    .set(key, this.params)
    .sadd('usecases', key)
    .exec()
    .then((res) => {
      console.log(res);
      return res;
    })
    .finally(() => {
      connector.close();
    });
  }

  delete() {
    const connector = new Connector();
    const key = this.key;
    return connector.multi()
    .del(key)
    .srem('usecases', key)
    .exec()
    .then((res) => {
      console.log(res);
      return res;
    })
    .finally(() => {
      connector.close();
    });
  }

  static find(key) {
    const connector = new Connector();
    return connector.get(key)
    .then((res) => {
      const usecase = new Usecase(res);
      usecase.key = key;
      return usecase;
    })
    .finally(() => {
      connector.close();
    });
  }

  static findAll() {
    const connector = new Connector();
    return connector.smembers('usecases')
    .then((keys) => {
      console.log('usecases', keys);
      const keysAsync = keys.map((key) => {
        return connector.get(key);
      });
      return Promise.all(keysAsync);
    })
    .finally(() => {
      connector.close();
    });
  }
}

module.exports = Usecase;