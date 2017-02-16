const ValidationError = require('../errors/validation-error');

class Base {
  validateTypes() {
    return {};
  }

  validateRanges() {
    return {};
  }

  _validateValue(key, value) {
    if (this.validateTypes()[key] == undefined) { return; }
    let error = this.validateTypes()[key](value);
    if (error) {
      if (typeof error === 'object') { return error; }
      return { [key]: `'${value}' is invalid type` };
    }
    if (this.validateRanges()[key] == undefined) { return; }
    error = this.validateRanges()[key](value);
    if (error) {
      if (typeof error === 'object') { return error; }
      return { [key]: `'${value}' is invalid range`}
    }
  }

  _setValue(key, value) {
    if (value != undefined) {
      this[key] = value;
    }
  }

  set(params) {
    const errors = Object.keys(params).reduce((result, key) => {
      const error = this._validateValue(key, params[key]);
      return error ? Object.assign({}, result, error) : result;
    }, {});
    if (Object.keys(errors).length > 0) {
      throw new ValidationError(errors);
    }
    Object.keys(params).forEach((key) => {
      this._setValue(key, params[key]);
    });
  }

  validateAll() {
    const keys = Object.keys(this.validateTypes());
    const errors = keys.reduce((result, key) => {
      const error = this._validateValue(key, this[key]);
      return error ? Object.assign({}, result, error) : result;
    }, {});
    if (Object.keys(errors).length > 0) {
      throw new ValidationError(errors);
    }
  }
}

module.exports = Base;
