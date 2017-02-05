const Connector = require('../connectors/http');
const Config = require('../config/config');

class Result {
  static _baseUrl() {
    return Config.api.baseUrl + '/results';
  }

  static find({ trialId }) {
    const connector = new Connector();
    const encodedTrialId = encodeURIComponent(trialId);
    return connector.request({
      uri: `${Result._baseUrl()}?trialId=${encodedTrialId}`,
    });
  }
}
module.exports = Result;
