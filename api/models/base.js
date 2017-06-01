const ValidationError = require('../errors/validation-error');

class Base {
  validators() {
    return {};
  }

  _validate(key, value) {
    if (this.validators()[key] == undefined) { return; }
    const error = this.validators()[key](value);
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

  set(params, options) {
    if (options == undefined) { options = {}; }
    if (options.validate == undefined) { options.validate = true; }
    if (options.validate) {
      const errors = Object.keys(params).reduce((result, key) => {
        const error = this._validate(key, params[key]);
        return error ? Object.assign({}, result, error) : result;
      }, {});
      if (Object.keys(errors).length > 0) {
        throw new ValidationError(errors);
      }
    }
    Object.keys(params).forEach((key) => {
      this._setValue(key, params[key]);
    });
  }

  validateAll() {
    const errors = this.getValidationErrors();
    if (Object.keys(errors).length > 0) { throw new ValidationError(errors); }
  }

  getValidationErrors() {
    const keys = Object.keys(this.validators());
    return keys.reduce((result, key) => {
      const error = this._validate(key, this[key]);
      return error ? Object.assign({}, result, error) : result;
    }, {});
  }
}

module.exports = Base;
