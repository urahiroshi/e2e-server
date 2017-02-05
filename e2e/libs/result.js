const crypto = require('crypto');
const bluebird = require('bluebird');

const HttpClient = require('./http-client');
const config = require('../config');

class Result {
  constructor({ trialId, actionType, actionOrder }) {
    this.params = {
      trialId: Number(trialId),
      actionType,
      actionOrder
    };
  }

  save(value) {
    if (value) {
      this.params.value = value;
    }
    const client = new HttpClient();
    return client.request({
      uri: `${config.httpClient.baseUrl}/results`,
      method: 'POST',
      body: this.params
    });
  }
}

module.exports = Result;