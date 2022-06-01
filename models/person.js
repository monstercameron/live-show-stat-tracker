const {
  mongoose: { Schema, model },
} = require("../tools/database");

const education = [
  "some highschool",
  "highschool",
  "trade school",
  "some college",
  "associates",
  "bachelors",
  "masters",
  "phd",
];

const relationshipStatus = [
  "single",
  "married",
  "it's complicated",
  "Same sex",
  "Polygamy/gyny",
];

const person = new Schema({
  name: String,
  age: Number,
  occupation: String,
  education: String,
  socialMedia: String,
  bodyCount: Number,
  relationshipStatus: String,
});

module.exports = {
  Person: model("Person", person),
  education,
  relationshipStatus,
};
