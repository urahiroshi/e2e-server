const Connector = require('../connectors/http');
const Config = require('../config/config');

class Screenshot {
  static _baseUrl() {
    return Config.api.baseUrl + '/screenshots';
  }

  static find({ resultId }) {
    const connector = new Connector();
    const encodedResultId = encodeURIComponent(resultId);
    return connector.request({
      uri: `${Screenshot._baseUrl()}/${encodedResultId}`,
    });
  }
}
module.exports = Screenshot;
