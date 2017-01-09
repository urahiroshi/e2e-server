const crypto = require('crypto');
const Helper = {
  createKey() {
    return crypto.randomBytes(8).toString('hex');
  },

  randomInt() {
    return crypto.randomBytes(4).readUIntBE(0, 4);
  },

  isString(value, options = { nullable: false }) {
    if (options.nullable && value == undefined) { return true; }
    return typeof value === 'string';
  }
};

module.exports = Helper;