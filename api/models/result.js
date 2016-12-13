const Connector = require('../connectors/mysql');
const Helper = require('./helper');
const crypto = require('crypto');
const Promise = require('bluebird');

class Result {
  constructor({
    resultId, jobId, texts, htmls, screenshots, textsCount, htmlsCount,
    screenshotsCount, createdAt
  }) {
    Object.assign(this, {
      resultId,
      jobId,
      texts,
      htmls,
      screenshots,
      textsCount: (texts) ? texts.length : textsCount,
      htmlsCount: (htmls) ? htmls.length : htmlsCount,
      screenshotsCount: (screenshots) ? screenshots.length : screenshotsCount
    });
  }

  save() {
    if (this.resultId) {
      return Promise.reject(new Error('Need to be new instance.'))
    }
    this.resultId = Helper.randomInt();
    const connector = new Connector();
    const transaction = connector.transaction();
    transaction.query(() => ['\
      insert into results \
        (result_id, job_id, screenshots_count, texts_count, htmls_count) \
      values ( ?, ?, ?, ?, ?)'
      , this.resultId, this.jobId, this.screenshots.length, this.texts.length
      , this.htmls.length
    ]);

    this.texts.forEach((resultText) => {
      transaction.query(() => ['\
        insert into result_texts (result_id, name, txt) \
        values ( ?, ?, ?)'
        , this.resultId, resultText.name, resultText.txt
      ]);
    });

    this.htmls.forEach((resultHtml) => {
      transaction.query(() => ['\
        insert into result_htmls (result_id, name, html) \
        values ( ?, ?, ?)'
        , this.resultId, resultHtml.name, resultHtml.html
      ]);
    });

    this.screenshots.forEach((resultScreenshot) => {
      const rowImage = Buffer.from(resultScreenshot.image, 'base64');
      transaction.query(() => ['\
        insert into result_screenshots (result_id, name, image) \
        values ( ?, ?, ?)'
        , this.resultId, resultScreenshot.name, rowImage
      ]);
    });
    return transaction.end();
  }

  delete() {
    const connector = new Connector();
    return connector.transaction()
    .query(() => ['delete from result_texts where result_id = ?', this.resultId])
    .query(() => ['delete from result_htmls where result_id = ?', this.resultId])
    .query(() => ['delete from result_screenshots where result_id = ?', this.resultId])
    .query(() => ['delete from results where result_id = ?', this.resultId])
    .end();
  }

  // TODO: return empty object if not found
  static find({ resultId, jobId, deep }) {
    let result;
    const connector = new Connector();
    let resultsQuery;
    if (resultId) {
      resultsQuery = connector.query('select * from results where result_id = ?', resultId);
    } else if (jobId) {
      resultsQuery = connector.query('select * from results where job_id = ?', jobId);
    } else {
      return Promise.reject(new Error('resultId or jobId needed'));
    }
    return resultsQuery
    .then((rows) => {
      result = new Result(Connector.camelCase(rows[0]));
      if (!deep) { return [[], [], []]; }
      return Promise.all([
          { count: result.textsCount, table: 'result_texts' },
          { count: result.htmlsCount, table: 'result_htmls' },
          { count: result.screenshotsCount, table: 'result_screenshots' }
        ].map((param) => {
          if (param.count > 0) {
            return connector.query(
              `select * from ${param.table} where result_id = ?`, result.resultId
            );
          } else {
            return [];
          }
        })
      );
    })
    .then((values) => {
      if (!deep) { return result; }
      result.texts = values[0].map((textsRow) => Connector.camelCase(textsRow));
      result.htmls = values[1].map((htmlsRow) => Connector.camelCase(htmlsRow));
      result.screenshots = values[2].map((screenshotsRow) => (
        { resultId: screenshotsRow.result_id, name: screenshotsRow.name }
      ));
      return result;
    });
  }

  static findAll() {
    const connector = new Connector();
    return connector.query('select * from results')
    .then((rows) => {
      return rows.map((row) => new Result(Connector.camelCase(row)));
    });
  }
}

module.exports = Result;
