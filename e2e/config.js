const process = require('process');

const Config = {
  redis: {
    host: process.env.E2E_REDIS_HOST || 'localhost',
    port: process.env.E2E_REDIS_PORT || 6379
  }
};

module.exports = Config;