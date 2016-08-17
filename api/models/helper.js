const crypto = require('crypto');
const Helper = {
  createKey() {
    return crypto.randomBytes(8).toString('base64');
  }
};

module.exports = Helper;