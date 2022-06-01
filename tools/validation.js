// local imports
const { ValidationError } = require("../tools/error");
const { roles } = require("../models/user");

// validate user login body
const loginBodyValidation = (body) => {
  if (!body.email) {
    throw new ValidationError("Plase enter email");
  } else if (!body.password) {
    throw new ValidationError("please enter password");
  }
  return true;
};

// validate user create admin body
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
  return true;
};

// validate episode body
const createEpisodeValidation = ({ series, title, episode, date, link }) => {
  if (!series) throw new ValidationError("No 'Series' was given");
  if (!title) throw new ValidationError("No 'Title' was given");
  if (!episode) throw new ValidationError("No 'Episode' Number was given");
  if (!date) throw new ValidationError("No 'Date' was given");
  if (!link) throw new ValidationError("No 'Link' was given");
  if (series.length < 3) throw new ValidationError("Series is too short");
  if (title.length < 3) throw new ValidationError("Title is too short");
  if (episode < 0)
    throw new ValidationError("Episode number cannot be negative");
  if (Number.isNaN(episode))
    throw new ValidationError("Episode number is not a number");
  if (date instanceof Date && !isNaN(date))
    throw new ValidationError("Date improper format");
  if (link.length < 3) throw new ValidationError("Link is too short");
  return true;
};

// validate vote body
const createVoteValidation = ({
  looks,
  targetId,
  indentifier,
  personality,
  sexualAttraction,
  relationshipAttraction,
}) => {
  if (!targetId) throw new ValidationError("No 'Target ID' was given");
  if (!sexualAttraction)
    throw new ValidationError("No 'Sexual Attraction' was given");
  if (!relationshipAttraction)
    throw new ValidationError("No 'Relationship Attraction' was given");
  if (!looks) throw new ValidationError("No 'Looks' was given");
  if (!personality) throw new ValidationError("No 'Personality' was given");
  if (sexualAttraction < 0)
    throw new ValidationError("Sexual Attraction cannot be negative");
  if (sexualAttraction > 10)
    throw new ValidationError("Sexual Attraction cannot be greater than 10");
  if (relationshipAttraction < 0)
    throw new ValidationError("Relationship Attraction cannot be negative");
  if (relationshipAttraction > 10)
    throw new ValidationError(
      "Relationship Attraction cannot be greater than 10"
    );
  if (looks < 0) throw new ValidationError("Looks cannot be negative");
  if (looks > 10) throw new ValidationError("Looks cannot be greater than 10");
  if (personality < 0)
    throw new ValidationError("Personality cannot be negative");
  if (personality > 10)
    throw new ValidationError("Personality cannot be greater than 10");
  if (typeof looks !== "number")
    throw new ValidationError("Target ID is not a number");
  if (typeof personality !== "number")
    throw new ValidationError("Target ID is not a number");
  if (typeof sexualAttraction !== "number")
    throw new ValidationError("Target ID is not a number");
  if (typeof relationshipAttraction !== "number")
    throw new ValidationError("Target ID is not a number");

  return true;
};

// validate person body
const createPersonValidation = ({
  name,
  age,
  occupation,
  education,
  socialMedia,
  bodyCount,
  relationshipStatus,
}) => {
  // Implement when I have github copilot
  console.log(`no validations performed`);
  return true;
};

module.exports = {
  loginBodyValidation,
  createVoteValidation,
  createLoginValidation,
  createEpisodeValidation,
  createPersonValidation,
};
