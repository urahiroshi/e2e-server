const Connector = require('../connectors/http');
const Config = require('../config/config');
const querystring = require('querystring');

class Usecase {
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

  static find(
    { projectId, usecasePath, offset, lastIterationNumber, limit }
  ) {
    const queryString = Usecase._queryString({ offset, lastIterationNumber, limit });
    const connector = new Connector();
    return connector.request({
      uri: (
        `${Config.api.baseUrl}/projects/${projectId}` +
        `/usecases/${usecasePath}${queryString}`
      )
    });
  }
}

module.exports = Usecase;