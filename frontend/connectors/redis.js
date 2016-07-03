const redis = require('redis');
const bluebird = require('bluebird');
bluebird.promisifyAll(redis.RedisClient.prototype);
bluebird.promisifyAll(redis.Multi.prototype);

class Connector {
  constructor(options) {
    this._client = redis.createClient(options);
    this._multi = undefined;
  }

  _log() {
    console.log.apply(global, ['[redis]'].concat(arguments));
  }

  get(key) {
    this._log('GET', key);
    return this._client.getAsync(key).then((res) => {
      this._log(res);
      return JSON.parse(res);
    });
  }

  close() {
    return this._client.endAsync(true);
  }

  multi() {
    this._multi = this._client.multi();
    this._log('MULTI START');
    return this;
  }

  exec() {
    this._log('MULTI END');
    const result = this._multi.execAsync();
    this._multi = undefined;
    return result;
  }
}

// arguments: key, value(object) methods
['set', 'sadd'].forEach((method) => {
  Connector.prototype[method] = function (key, value) {
    const json = JSON.stringify(value);
    this._log(method, key, json);
    if (this._multi) {
      this._multi[method](key, json);
      return this;
    } else {
      return this._client[method + 'Async'](key, json);
    }
  };
});

module.exports = Connector;