const {mongoose} = require("../tools/database");

const episode = new mongoose.Schema({
  title: String,
  date: Date,
  link: String,
  guests: [String],
  topics: [String],
});

const Episode = mongoose.model("Episode", episode);
module.exports = Episode;
