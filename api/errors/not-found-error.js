const CustomError = require('./custom-error');

class NotFoundError extends CustomError { }

module.exports = NotFoundError;
