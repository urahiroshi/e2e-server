const Connector = require('../connectors/http');
const Config = require('../config/config');

class Screenshot {
  static _baseUrl() {
    return Config.api.baseUrl + '/screenshots';
  }

  static find({ resultId, name }) {
    const connector = new Connector();
    const encodedResultId = encodeURIComponent(resultId);
    const encodedName = encodeURIComponent(name);
    return connector.request({
      uri: `${Screenshot._baseUrl()}?resultId=${encodedResultId}&name=${encodedName}`,
    });
  }
}
module.exports = Screenshot;
