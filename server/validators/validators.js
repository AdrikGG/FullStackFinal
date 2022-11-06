const isEmpty = require('is-empty');
const validator = require('validator');

module.exports.loginValidator = (data) => {
  const errors = {};

  data.email = isEmpty(data.email) ? '' : data.email;
  data.password = isEmpty(data.password) ? '' : data.password;

  let emailError = validator.isEmpty(data.email)
    ? 'Email is required'
    : !validator.isEmail(data.email)
    ? 'Please provide a valid email'
    : '';
  let passwordError = validator.isEmpty(data.password)
    ? 'Password is required'
    : '';

  if (emailError) errors.email = emailError;
  if (passwordError) errors.password = passwordError;

  return {
    errors,
    isValid: isEmpty(errors),
  };
};

module.exports.registerValidator = (data) => {
  const errors = {};

  data.email = isEmpty(data.email) ? '' : data.email;
  data.password = isEmpty(data.password) ? '' : data.password;
  data.username = isEmpty(data.username) ? '' : data.username;

  let emailError = validator.isEmpty(data.email)
    ? 'Email is required'
    : !validator.isEmail(data.email)
    ? 'Please provide a valid email'
    : '';
  let passwordError = validator.isEmpty(data.password)
    ? 'Password is required'
    : '';
  let usernameError = validator.isEmpty(data.username)
    ? 'Username is required'
    : '';

  if (emailError) errors.email = emailError;
  if (passwordError) errors.password = passwordError;
  if (usernameError) errors.username = usernameError;

  return {
    errors,
    isValid: isEmpty(errors),
  };
};
