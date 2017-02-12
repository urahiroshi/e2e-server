const process = require('process');

const Config = {
  redis: {
    host: process.env.E2E_REDIS_HOST || 'localhost',
    port: process.env.E2E_REDIS_PORT || 6379
  },
  db: {
    pool: {
      connectionLimit: 10,
      host: process.env.E2E_MYSQL_HOST || 'localhost',
      user: process.env.E2E_MYSQL_USER || 'root',
      password: process.env.E2E_MYSQL_PASSWORD || '',
      database: 'e2e_server'
    }
  }
};

module.exports = Config;