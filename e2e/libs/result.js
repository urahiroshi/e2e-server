const crypto = require('crypto');
const bluebird = require('bluebird');

const HttpClient = require('./http-client');
const config = require('../config');

class Result {
  constructor({ jobId, innerTexts, innerHTMLs, screenshots }) {
    this.params = {
      jobId,
      innerTexts,
      innerHTMLs,
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
        texts: Object.keys(this.params.innerTexts).map((name) => ({
          name,
          txt: this.params.innerTexts[name]
        })),
        htmls: Object.keys(this.params.innerHTMLs).map((name) => ({
          name,
          html: this.params.innerHTMLs[name]
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