const {mongoose} = require("../tools/database");

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

const person = new mongoose.Schema({
  name: String,
  age: Number,
  occupation: String,
  education: String,
  socialMedia: String,
  bodyCount: Number,
  ralationshipStatus: String,
});

const Person = mongoose.model("Person", person);
module.exports = Person;
