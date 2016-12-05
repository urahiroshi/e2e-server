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

  query() {
    let query = Array.prototype.slice(arguments);
    if (query.length === 0) {
      query = query[0];
    } else {
      query = mysql.format(query[0], query.slice(1));
    }
    let connection;
    return pool.getConnectionAsync()
    .then((connection_) => {
      connection = connection_;
      return connection.queryAsync(query);
    })
    .then((result) => {
      connection.release();
      return result;
    })
    .error(this._onError);
  }

  transaction() {
    let connection;
    const promise = pool.getConnectionAsync()
    .then((connection_) => {
      connection = connection_;
      return connection.beginTransactionAsync();
    });
    const transaction = {
      query: (callback) => {
        promise.then((result) => {
          let query = callback(result);
          if (Array.isArray(query)) {
            query = mysql.format(query[0], query.slice(1));
          }
          return connection.queryAsync(query);
        })
        return transaction;
      },

      end: () => {
        return promise.then(() => {
          return connection.commitAsync();
        })
        .error((err) => {
          return connection.rollbackAsync()
          .then(() => { this._onError(err); })
          .error(this._onError);
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