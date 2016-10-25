const crypto = require('crypto');
const Helper = {
  createKey() {
    return crypto.randomBytes(8).toString('hex');
  },

  random() {
    return crypto.randomBytes(6).readUIntBE(0, 6);
  }
};

module.exports = Helper;