const process = require('process');

const Config = {
  api: {
    baseUrl: process.env.E2E_API_SERVER || 'http://localhost:3001'
  }
};

module.exports = Config;