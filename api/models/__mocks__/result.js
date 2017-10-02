const methods = {};

class MockResult {
  static find() {
    const method = methods.find;
    return method(...arguments);
  }

  static mockMethod(methodName, fn) {
    methods[methodName] = fn;
  }
}

module.exports = MockResult;
