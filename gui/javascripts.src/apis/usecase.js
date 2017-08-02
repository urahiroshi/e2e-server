import axios from 'axios';
import querystring from 'querystring';

export default {
  get: ({ projectId, usecasePath, offset, lastIterationNumber, limit }) => {
    const queries = { offset, lastIterationNumber, limit };
    const noNullQueries = Object.keys(queries).reduce((next, key) => {
      if (queries[key] != undefined) {
        return Object.assign({}, next, { [key]: queries[key] });
      }
      return next;
    }, {});
    const url = `/api/projects/${projectId}/usecases/${usecasePath}`;
    return axios.get(`${url}?${querystring.stringify(noNullQueries)}`);
  },
};
