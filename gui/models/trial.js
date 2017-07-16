const Connector = require('../connectors/http');
const Config = require('../config/config');

class Trial {
  constructor({ usecaseId }) {
    this.usecaseId = usecaseId;
  }

  static _toUri(path) {
    const baseUrl = Config.api.baseUrl + '/trials';
    return path ? baseUrl + '/' + path : baseUrl;
  }

  static find(id) {
    const connector = new Connector();
    return connector.request({
      uri: Trial._toUri(id),
    });
  }
}

module.exports = Trial;
