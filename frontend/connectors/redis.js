const redis = require('redis');

const Connector = (options) => {
  this._client = redis.createClient(options);
};

Connector.prototype.get = (key) => {
  json = this._client.get(key);
  return JSON.parse(json);
};

Connector.prototype.set = (key, value) => {
  json = JSON.stringify(value);
  this._client.set(key, json);
};

Connector.prototype.close = () => {
  this._client.end(true);
};

['multi', 'exec'].forEach((method) => {
  Connector.prototype[method] = () => {
    this._client[method].apply(this._client, arguments);
    return this;
  }
});

module.exports = Connector;