const Connector = require('../connectors/http');
const Helper = require('./helper');
const Usecase = require('./usecase');
const Config = require('../config/config');

class Trial {
  constructor(params) {
    this.params = {
      usecaseId: params.usecaseId
    };
  }

  save() {
    const connector = new Connector();
    const key = this.key || Helper.createKey();
    return Usecase.find(this.params.usecaseId)
    .then((usecase) => {
      const connector = new Connector();
      return connector.request({
        uri: Config.job.baseUrl,
        method: 'POST',
        body: {
          type: 'trial',
          data: usecase
        }
      })
    });
  }

  static find(key) {
    const connector = new Connector();
    return connector.request({
      uri: Config.job.baseUrl
    });
  }
}

module.exports = Trial;
