const Connector = require('../connectors/http');
const Config = require('../config/config');
const querystring = require('querystring');

class Iteration {
  static _queryString(queries) {
    const noNullQueries = {};
    Object.keys(queries).forEach(queryKey => {
      if (queries[queryKey] != undefined) {
        noNullQueries[queryKey] = queries[queryKey];
      }
    });
    return (Object.keys(noNullQueries).length > 0 ?
      `?${querystring.stringify(noNullQueries)}` : ''
    );
  }

  static findAll({ projectId, offset, limit }) {
    const connector = new Connector();
    const queryString = Iteration._queryString({ offset, limit });
    return connector.request({
      uri: `${Config.api.baseUrl}/projects/${projectId}/iterations${queryString}`
    });
  }

  static find(projectId, iterationNumber) {
    const connector = new Connector();
    return connector.request({
      uri: `${Config.api.baseUrl}/projects/${projectId}/iterations/${iterationNumber}`
    });
  }
}

module.exports = Iteration;
