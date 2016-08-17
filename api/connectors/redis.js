const redis = require('redis');
const bluebird = require('bluebird');
const _ = require('lodash');
bluebird.promisifyAll(redis.RedisClient.prototype);
bluebird.promisifyAll(redis.Multi.prototype);

class Connector {
  constructor(options) {
    this._client = redis.createClient(options);
    this._multi = undefined;
  }

  _log() {
    console.log.apply(
      global,
      ['[redis]'].concat(Array.prototype.slice.call(arguments))
    );
  }

  get(key) {
    this._log('GET', key);
    return this._client.getAsync(key).then((res) => {
      this._log(res);
      const obj = JSON.parse(res);
      obj.id = key;
      return obj;
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

// arguments: key, value methods
['set', 'sadd', 'srem'].forEach((method) => {
  Connector.prototype[method] = function (key, value) {
    const requestValue = _.isString(value) ? value : JSON.stringify(value);
    this._log(method, key, requestValue);
    if (this._multi) {
      this._multi[method](key, requestValue);
      return this;
    } else {
      return this._client[method + 'Async'](key, requestValue);
    }
  };
});

// arguments: key methods
['smembers', 'del'].forEach((method) => {
  Connector.prototype[method] = function (key, value) {
    this._log(method, key);
    if (this._multi) {
      this._multi[method](key);
      return this;
    } else {
      return this._client[method + 'Async'](key);
    }
  };
});


module.exports = Connector;