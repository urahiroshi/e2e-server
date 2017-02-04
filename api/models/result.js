const Connector = require('../connectors/mysql');
const Helper = require('./helper');
const Base = require('./base');
const crypto = require('crypto');
const Promise = require('bluebird');
const validator = require('validator');

class Result extends Base {
  constructor({
    resultId, jobId, actionType, actionOrder, txt, html, image, createdAt
  }) {
    super();
    this.set({
      resultId,
      jobId,
      actionType,
      actionOrder,
      txt,
      html,
      image,
      createdAt
    });
  }

  toJSON() {
    const result = {
      id: this.resultId,
      jobId: this.jobId,
      actionType: this.actionType,
      createdAt: this.createdAt
    };
    switch (this.actionType) {
      case 'getHtml':
        result.html = this.html;
        break;
      case 'getText':
        result.text = this.txt;
        break;
      case 'getScreenshot':
        result.uri = `/screenshots/${this.resultId}`;
        break;
      default:
        break;
    }
    return result;
  }

  // TODO: return empty object if not found
  static find({ jobId }) {
    let result;
    const connector = new Connector();
    let resultsQuery;
    resultsQuery = connector.query("\
      select results.*, txt, html, image from results \
        left join result_texts \
          on (results.action_type='getText' and \
              results.result_id=result_texts.result_id) \
        left join result_htmls \
          on (results.action_type='getHtml' and \
              results.result_id=result_htmls.result_id) \
        left join result_screenshots \
          on (results.action_type='getScreenshot' and \
              results.result_id=result_screenshots.result_id) \
        where job_id = ? \
        order by action_order \
    ", jobId);
    return resultsQuery
    .then((rows) => {
      return rows.map((row) => {
        return new Result(Connector.camelCase(row));
      });
    });
  }
}

module.exports = Result;
