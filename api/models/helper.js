const crypto = require('crypto');
const Helper = {
  createKey() {
    return crypto.randomBytes(8).toString('hex');
  },

  randomInt() {
    return crypto.randomBytes(4).readUIntBE(0, 4);
  }
};

module.exports = Helper;