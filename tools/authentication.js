const bcrypt = require("bcrypt");
const {ValidationError} = require('../tools/error')

const hash = async (password, saltRounds) => {
  const salt = await bcrypt.genSalt(saltRounds);
  const hash = await bcrypt.hash(password, salt);
  return hash;
};

const hashMatch = async (password, hash) => {
  return await bcrypt.compare(password, hash);
};

const loginBodyValidation = (body) => {
  if (!body.email) {
    return new ValidationError("Plase enter email");
  } else if (!body.password) {
    return new ValidationError("please enter password");
  }
  return true;
};

module.exports = { hash, hashMatch, loginBodyValidation };
