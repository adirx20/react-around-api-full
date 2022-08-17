const validator = require('validator');

const validateURL = (value, helpers) => {
  if (validator.isURL(value)) {
    return value;
  } else {
    return helpers.error('string.uri');
  }
};

module.exports = {
  validateURL,
};