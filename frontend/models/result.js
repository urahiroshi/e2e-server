const Connector = require('../connectors/redis');
const Helper = require('./helper');
const crypto = require('crypto');
const Promise = require('bluebird');

class Result {
  constructor(params) {
    this.params = {
    };
  }

  delete() {
    const connector = new Connector();
    const key = this.key;
    return connector.multi()
    .del(key)
    .srem('results', key)
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
      const result = new Result(res);
      result.key = key;
      return result;
    })
    .finally(() => {
      connector.close();
    });
  }

  static findAll() {
    const connector = new Connector();
    return connector.smembers('results')
    .then((keys) => {
      console.log('results', keys);
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

module.exports = Result;