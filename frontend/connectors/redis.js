const redis = require('redis');
const bluebird = require('bluebird');
bluebird.promisifyAll(redis.RedisClient.prototype);
bluebird.promisifyAll(redis.Multi.prototype);

class Connector {
  constructor(options) {
    this._client = redis.createClient(options);
  }

  get(key) {
    return this._client.getAsync(key).then((res) => {
      console.log(res);
      return JSON.parse(res);
    });
  }

  set(key, value) {
    const json = JSON.stringify(value);
    return this._client.setAsync(key, json);
  }

  close() {
    return this._client.endAsync(true);
  }

  multi() {
    this._client.multi();
    return this;
  }

  exec() {
    return this._client.execAsync();
  }
}


['exec'].forEach((method) => {
  Connector.prototype[method] = () => {
    return this._client[method + 'Async']();
  }
});

module.exports = Connector;