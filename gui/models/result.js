const Connector = require('../connectors/http');
const Config = require('../config/config');

class Result {
  static _baseUrl() {
    return Config.api.baseUrl + '/results';
  }

  static find({ jobId }) {
    const connector = new Connector();
    const encodedJobId = encodeURIComponent(jobId);
    return connector.request({
      uri: `${Result._baseUrl()}?jobId=${encodedJobId}`,
    });
  }
}
module.exports = Result;
