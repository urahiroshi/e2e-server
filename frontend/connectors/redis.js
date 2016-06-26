const redis = require('redis');

class Connector {
  constructor(options) {
    this._client = redis.createClient(options);
  }

  get(key) {
    json = this._client.get(key);
    return JSON.parse(json);
  }

  set(key, value) {
    json = JSON.stringify(value);
    this._client.set(key, json);
  }

  close() {
    this._client.end(true);
  }
}


['multi', 'exec'].forEach((method) => {
  Connector.prototype[method] = () => {
    this._client[method].apply(this._client, arguments);
    return this;
  }
});

module.exports = Connector;