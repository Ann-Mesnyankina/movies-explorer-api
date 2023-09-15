const isURL = require('validator/lib/isURL');

const urlValidation = (v, helpers) => {
  if (isURL(v)) {
    return v;
  }
  return helpers.message(`Некорректный ${v}`);
};

module.exports = { urlValidation };
