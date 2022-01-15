'use strict';

const { inherits, format } = require('util');
const errorCodes = {};


requestError('BAD_REQUEST_DATA', '%s', 400);
requestError('NO_AUTH_KEY', 'You need to pass MSG91 auth key.', 400);
requestError('NO_TEMPLATE_ID', 'You need to pass MSG91 valid template ID.', 400);
requestError('NO_FLOW_ID', 'You need to pass MSG91 valid flow ID.', 400);
requestError('NO_SENDER_ID', 'You need to pass MSG91 valid sender ID.', 400);

function requestError(code, message, statusCode = 400, error_data = {}, Base = Error) {
  if (!code) throw new Error('Backend error code must not be empty');
  if (!message) throw new Error('Backend error message must not be empty');

  code = code.toUpperCase();

  function RequestError(a, b, c) {
    Error.captureStackTrace(this, RequestError);

    this.name = 'MSG91Error';
    this.code = `${code}`;

    // more performant than spread (...) operator
    if (a && b && c)
      this.message = format(message, a, b, c);
    else if (a && b)
      this.message = format(message, a, b);
    else if (a)
      this.message = format(message, a);
    else
      this.message = message;


    this.message = `${this.message}`.replace('_', ' ');
    this.statusCode = statusCode || undefined;
    this.error_data = error_data;
    this.toJson = () => {
      return {
        name: this.name,
        message: this.message,
        code: this.code,
        statusCode: this.statusCode,
        error_data: this.error_data,
      };
    };
  }

  RequestError.prototype[Symbol.toStringTag] = 'Error';

  inherits(RequestError, Base);

  errorCodes[code] = RequestError;

  return errorCodes[code];
}

module.exports = { errorCodes, requestError };
