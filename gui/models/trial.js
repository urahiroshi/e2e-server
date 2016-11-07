const Connector = require('../connectors/http');
const Config = require('../config/config');
const Promise = require('bluebird');

class Trial {
  constructor({ usecaseId }) {
    this.usecaseId = usecaseId;
  }

  save() {
    const connector = new Connector();
    return connector.request({
      uri: Trial._toUri(),
      method: 'POST',
      body: {
        usecaseId: this.usecaseId,
      }
    });
  }

  delete() {
    const connector = new Connector();
    return connector.request({
      uri: Trial._toUri(this.id),
      method: 'DELETE',
    });
  }

  static _toUri(path) {
    const baseUrl = Config.api.baseUrl + '/trials';
    return path ? baseUrl + '/' + path : baseUrl;
  }

  static find(id) {
    const connector = new Connector();
    return connector.request({
      uri: Trial._toUri(this.id),
    });
  }

  static findAll({ offset, length, usecaseId }) {
    const connector = new Connector();
    const params = { offset, length, usecaseId };
    const query = Object.keys(params)
    .filter((key) => !!params[key])
    .map((key) => `${key}=${params[key]}`)
    .join('&');
    const path = (query.length > 0) ? `?${query}` : '';
    return connector.request({
      uri: Trial._toUri(path)
    });
  }
}

module.exports = Trial;
