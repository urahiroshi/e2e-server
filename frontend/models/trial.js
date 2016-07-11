const Connector = require('../connectors/http');
const Usecase = require('./usecase');
const Config = require('../config/config');
const _ = require('lodash');

class Trial {
  constructor(params) {
    this.params = {
      usecaseId: params.usecaseId
    };
  }

  save() {
    return Usecase.find(this.params.usecaseId)
    .then((usecase) => {
      const connector = new Connector();
      let data = Object.assign(usecase, {
        usecaseId: usecase.key
      });
      data = _.omit(data, ['key']);
      return connector.request({
        uri: Config.job.baseUrl + '/job',
        method: 'POST',
        body: {
          type: 'trial',
          data: data
        }
      })
    });
  }

  static _jobToTrial(job) {
    let trial = Object.assign(job, job.data);
    trial = _.omit(trial, ['data', 'type'])
    return trial;
  }

  static find(id) {
    const connector = new Connector();
    return connector.request({
      uri: Config.job.baseUrl + '/job/' + id
    })
    .then(Trial._jobToTrial);
  }
}

module.exports = Trial;
