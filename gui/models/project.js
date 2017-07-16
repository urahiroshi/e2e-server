const Connector = require('../connectors/http');
const Config = require('../config/config');

class Project {
  static _toUri(projectId) {
    return `${Config.api.baseUrl}/projects/${projectId}`;
  }

  static find(projectId) {
    const connector = new Connector();
    return connector.request({
      uri: Project._toUri(projectId)
    });
  }
}

module.exports = Project;
