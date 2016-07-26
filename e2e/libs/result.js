const crypto = require('crypto');
const redis = require('redis');
const bluebird = require('bluebird');
bluebird.promisifyAll(redis.RedisClient.prototype);
bluebird.promisifyAll(redis.Multi.prototype);

class Result {
  constructor(params) {
    this.params = JSON.stringify(params);
  }

  save() {
    const key = crypto.randomBytes(8).toString('base64');
    const client = redis.createClient();
    return client.multi()
    .set(key, this.params)
    .sadd('results', key)
    .execAsync()
    .then((res) => {
      console.log('Success to create result', key, res);
      return res;
    })
    .finally(() => {
      client.endAsync(true);
    });
  }
}

module.exports = Result;