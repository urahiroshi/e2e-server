const crypto = require('crypto');
const redis = require('redis');
const bluebird = require('bluebird');
bluebird.promisifyAll(redis.RedisClient.prototype);
bluebird.promisifyAll(redis.Multi.prototype);

class ScreenShot {
  constructor(binary) {
    this.binary = binary;
  }

  save() {
    const key = crypto.randomBytes(8).toString('base64');
    const client = redis.createClient();
    return client.multi()
    .set(key, this.binary)
    .sadd('screenshots', key)
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