const crypto = require('crypto');
const redis = require('redis');
const bluebird = require('bluebird');
bluebird.promisifyAll(redis.RedisClient.prototype);
bluebird.promisifyAll(redis.Multi.prototype);

class ScreenShot {
  constructor(params) {
    this.name = params.name;
    this.binary = params.binary;
  }

  save() {
    const key = crypto.randomBytes(8).toString('hex');
    const client = redis.createClient();
    return client.multi()
    .set(key, this.binary)
    .sadd('screenshots', key)
    .sadd('screenshots:' + this.name, key)
    .execAsync()
    .then((res) => {
      console.log(res);
      return key;
    })
    .finally(() => {
      client.endAsync(true);
    });
  }
}

module.exports = ScreenShot;