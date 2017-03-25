const getErrorStrings = (errors, prefix) => (
  Object.keys(errors).reduce((errorStrings, errorKey) => {
    const error = errors[errorKey];
    let newPrefix;
    if (prefix === '') {
      newPrefix = errorKey;
    } else if (!isNaN(errorKey) && String(parseInt(errorKey, 10)) === errorKey) {
      newPrefix = `${prefix}[${errorKey}]`;
    } else {
      newPrefix = `${prefix}.${errorKey}`;
    }
    if (typeof error === 'object') {
      return errorStrings.concat(getErrorStrings(error, newPrefix));
    }
    errorStrings.push(`${newPrefix}: ${error}`);
    return errorStrings;
  }, [])
);

class BaseValidator {
  constructor() {
    this.errors = {};
  }

  static flatten(errors) {
    return getErrorStrings(errors, '');
  }

  addError(...args) {
    const value = args.splice(-1)[0];
    const keys = args;
    let errors = this.errors;
    keys.forEach((key, i) => {
      if (i < keys.length - 1) {
        if (!errors[key]) { errors[key] = {}; }
      } else {
        errors[key] = value;
      }
      errors = errors[key];
    });
  }

  isValid() {
    return (Object.keys(this.errors).length === 0);
  }
}

export default BaseValidator;
