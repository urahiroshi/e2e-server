const CustomError = require('./custom-error');

class ValidationError extends CustomError {
  constructor(errorKeyValue) {
    super(JSON.stringify(errorKeyValue));
    this.errors = errorKeyValue;
  }
}

module.exports = ValidationError;
