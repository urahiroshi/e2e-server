const Connector = require('../connectors/redis');
const crypto = require('crypto');

function createKey() {
  return crypto.randomBytes(8).toString('base64');
}

const Usecase = (params) => {
  this.params = {
    url: params.url || '',
    flow: params.flow || [],
    timeout: params.timeout || 0,
    validation: params.validation || [],
    browser: params.browser || {}
  };
};

Usecase.find = (key) => {
  const connector = new Connector();
  const params = connector.get(key);
  const usecase = new Usecase(params);
  usecase.key = key;
  return usecase;
};

Usecase.prototype.save = () => {
  const connector = new Connector();
  const key = this.key || createKey();
  connector.multi()
  .set(key, this.params)
  .set('usecases', key)
  .exec((err, replies) => {
    console.log(err, replies);
    connector.close();
  })
};

module.exports = Usecase;