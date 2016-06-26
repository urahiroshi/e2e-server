const Connector = require('../connectors/redis');
const crypto = require('crypto');

function createKey() {
  return crypto.randomBytes(8).toString('base64');
}

class Usecase {
  constructor(params) {
    this.params = {
      url: params.url || '',
      flow: params.flow || [],
      timeout: params.timeout || 0,
      validation: params.validation || [],
      browser: params.browser || {}
    };
  }

  save() {
    const connector = new Connector();
    const key = this.key || createKey();
    connector.multi()
    .set(key, this.params)
    .set('usecases', key)
    .exec((err, replies) => {
      console.log(err, replies);
      connector.close();
    });
  }

  static find(key) {
    const connector = new Connector();
    const params = connector.get(key);
    const usecase = new Usecase(params);
    usecase.key = key;
    return usecase;
  }

  static findAll() {
    const connector = new Connector();
    const keys = connector.get('usecases');
    return keys.map((key) => {
      return connector.get(key);
    });
  }
}

module.exports = Usecase;