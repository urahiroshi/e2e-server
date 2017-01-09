class Base {
  validateTypes() {
    return {};
  }

  validateRanges() {
    return {};
  }

  _validateValue(key, value) {
    if (this.validateTypes()[key] == undefined) { return; }
    let isValid = this.validateTypes()[key](value);
    if (!isValid) {
      throw new TypeError(`${JSON.stringify(value)} is not valid type of ${key} !`);
    }
    if (this.validateRanges()[key] == undefined) { return; }
    isValid = this.validateRanges()[key](value);
    if (!isValid) {
      throw new RangeError(`${JSON.stringify(value)} is not valid value of ${key} !`);
    }
  }

  _setValue(key, value) {
    if (value != undefined) {
      this._validateValue(key, value);
      this[key] = value;
    }
  }

  set(params) {
    Object.keys(params).forEach((key) => {
      this._setValue(key, params[key]);
    });
  }

  validateAll() {
    const keys = Object.keys(this.validateTypes());
    keys.forEach((key) => {
      this._validateValue(key, this[key]);
    });
  }
}

module.exports = Base;
