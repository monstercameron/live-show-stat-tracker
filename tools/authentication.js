const bcrypt = require("bcrypt");
const { ValidationError } = require("../tools/error");
const { roles } = require("../models/user");

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
     throw new ValidationError("Plase enter email");
  } else if (!body.password) {
    throw new ValidationError("please enter password");
  }
  return true;
};

const createLoginValidation = ({
  name,
  email,
  password,
  recovery,
  recoveryQuestion,
  role = roles[0],
  image = "default",
}) => {
  if (!name) throw new ValidationError("No Name was given");
  if (!email) throw new ValidationError("No Email was given");
  if (!password) throw new ValidationError("No Password was given");
  if (!recovery) throw new ValidationError("No Recovery ame was given");
  if (!recoveryQuestion)
    throw new ValidationError("No Recovery Question was given");
  if (name.length < 3) throw new ValidationError("Name is too short");
  if (
    !email
      .toLowerCase()
      .match(
        /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/
      )
  )
    throw new ValidationError("Email is not valid");
  if (password.length < 8) throw new ValidationError("Password is too short");
  if (password.length > 32) throw new ValidationError("Password is too long");
  if (!password.match(/[a-z]/))
    throw new ValidationError("Password must contain a lowercase letter");
  if (!password.match(/[A-Z]/))
    throw new ValidationError("Password must contain an uppercase letter");
  if (!password.match(/[0-9]/))
    throw new ValidationError("Password must contain a number");
  if (role !== roles[0] && role !== roles[1])
    throw new ValidationError("Role is not valid");
    console.log('before rteturn');
  return true;
};

module.exports = { hash, hashMatch, loginBodyValidation, createLoginValidation };
