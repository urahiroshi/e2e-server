const Connector = require('../connectors/http');
const Config = require('../config/config');
const Promise = require('bluebird');

class Usecase {
  constructor(params) {
    this.params = {
      url: params.url || '',
      actions: params.actions || [],
      timeout: params.timeout || 0,
      validation: params.validation || [],
      browser: params.browser || {}
    };
  }

  save() {
    const connector = new Connector();
    return connector.request({
      uri: Usecase._toUri(),
      method: 'POST',
      body: this.params
    });
  }

  delete(key) {
    const connector = new Connector();
    return connector.request({
      uri: Usecase._toUri(key),
      method: 'DELETE'
    });
  }

  static _toUri(path) {
    const baseUrl = Config.api.baseUrl + '/usecases';
    return path ? baseUrl + '/' + path : baseUrl;
  }

  static find(key) {
    const connector = new Connector();
    return connector.request({
      uri: Usecase._toUri(key)
    });
  }

  static findAll() {
    const connector = new Connector();
    return connector.request({
      uri: Usecase._toUri()
    });
  }
}

module.exports = Usecase;