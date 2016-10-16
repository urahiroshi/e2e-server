const Connector = require('../connectors/http');
const Config = require('../config/config');
const Promise = require('bluebird');

class Usecase {
  constructor(params) {
    this.initialize();
    this.set(params);
  }

  initialize() {
    this.name = '';
    this.url = '';
    this.actions = [];
    this.timeout = 0;
    this.validation = [];
    this.browser = {};
  }

  set(params) {
    [
      'name', 'url', 'actions', 'timeout', 'validation', 'browser'
    ].forEach((key) => {
      if (params[key]) {
        this[key] = params[key];
      }
    });
  }

  save() {
    const connector = new Connector();
    return connector.request({
      uri: Usecase._toUri(this.id),
      method: this.id ? 'PUT' : 'POST',
      body: this.toJSON()
    });
  }

  delete(key) {
    const connector = new Connector();
    return connector.request({
      uri: Usecase._toUri(key),
      method: 'DELETE'
    });
  }

  toJSON() {
    return {
      id: this.id,
      name: this.name,
      url: this.url,
      actions: this.actions,
      timeout: this.timeout,
      validation: this.validation,
      browser: this.browser
    };
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