const crypto = require('crypto');
const bluebird = require('bluebird');

const HttpClient = require('./http-client');
const config = require('../config');

class Result {
  constructor({ jobId, texts, htmls, screenshots }) {
    this.params = {
      jobId: Number(jobId),
      texts,
      htmls,
      screenshots
    };
  }

  save() {
    const client = new HttpClient();
    return client.request({
      uri: `${config.httpClient.baseUrl}/results`,
      method: 'POST',
      body: {
        jobId: this.params.jobId,
        texts: Object.keys(this.params.texts).map((name) => ({
          name,
          txt: this.params.texts[name]
        })),
        htmls: Object.keys(this.params.htmls).map((name) => ({
          name,
          html: this.params.htmls[name]
        })),
        screenshots: Object.keys(this.params.screenshots).map((name) => ({
          name,
          image: this.params.screenshots[name].toString('base64')          
        }))
      }
    });
  }
}

module.exports = Result;