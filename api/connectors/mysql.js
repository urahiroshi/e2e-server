const mysql = require('mysql');
const config = require('../config/config').db;
const Promise = require('bluebird');
const _ = require('lodash');

Promise.promisifyAll(mysql);
Promise.promisifyAll(require('mysql/lib/Connection').prototype);
Promise.promisifyAll(require('mysql/lib/Pool').prototype);

const pool = mysql.createPool(config.pool);

class Connector {
  _onError(err) {
    console.log(err);
    console.trace(err);
  }

  _log() {
    const args = Array.prototype.slice.call(arguments);
    console.log.apply(console, args);
  }

  query() {
    let query = Array.prototype.slice.call(arguments);
    if (query.length === 0) {
      return Promise.reject(new Error('no query'));
    } else if (query.length === 1) {
      query = query[0];
    } else {
      query = mysql.format(query[0], query.slice(1));
    }
    let connection;
    return pool.getConnectionAsync()
    .then((connection_) => {
      connection = connection_;
      this._log('Execute query:', query);
      return connection.queryAsync(query);
    })
    .then((result) => {
      connection.release();
      this._log('Query result:', result);
      return result;
    })
    .catch(this._onError);
  }

  transaction() {
    let connection;
    let promise = pool.getConnectionAsync()
    .then((connection_) => {
      connection = connection_;
      return connection.beginTransactionAsync();
    });
    const transaction = {
      query: (...args) => {
        promise = promise.then((result) => {
          let query;
          if (typeof args[0] === 'function') {
            query = args[0](result);
          } else {
            query = args;
          }
          if (Array.isArray(query)) {
            query = mysql.format(query[0], query.slice(1));
          }
          this._log('Execute transaction:', query);
          return connection.queryAsync(query);
        })
        return transaction;
      },

      end: () => {
        return promise.then(() => {
          this._log('Commit transaction');
          return connection.commitAsync();
        })
        .catch((err) => {
          this._onError(err);
          this._log('Rollback transaction');
          return connection.rollbackAsync()
          .then(() => {
            throw err;
          })
          .catch((e) => {
            this._onError(e);
            throw e;
          });
        });
      }
    };

    return transaction;
  }

  static camelCase(row) {
    const result = {};
    Object.keys(row).forEach((key) => {
      result[_.camelCase(key)] = row[key];
    });
    return result;
  }

}

module.exports = Connector;