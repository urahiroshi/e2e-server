const Connector = require('../connectors/mysql');
const Helper = require('./helper');
const crypto = require('crypto');
const Promise = require('bluebird');

class Screenshot {
  static find({ resultId, name }) {
    const connector = new Connector();
    connector.query(
      'select * from result_screenshots where result_id = ? and name = ?',
      resultId, name
    ).then((rows) => {
      screenshot = Connector.camelCase(rows[0]);
      screenshot.image = (new Buffer(screenshot.image)).toString('base64');
      return screenshot;
    });
  }
}

module.exports = Screenshot;
