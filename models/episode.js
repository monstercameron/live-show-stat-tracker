const {
  mongoose: { Schema, model },
} = require("../tools/database");

const episode = new Schema({
  title: String,
  date: Date,
  link: String,
  guests: [String],
  topics: [String],
});

module.exports = { Episode: model("Episode", episode) };
