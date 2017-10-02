const _ = require('lodash');
const methods = {};

class MockConnector {
  query() {
    const method = methods.query;
    return method(...arguments);
  }

  transaction() {
    const method = methods.transaction;
    return method(...arguments);
  }

  static mockMethod(methodName, fn) {
    methods[methodName] = fn;
  }

  static camelCase(row) {
    const result = {};
    Object.keys(row).forEach((key) => {
      result[_.camelCase(key)] = row[key];
    });
    return result;
  }
}

module.exports = MockConnector;
