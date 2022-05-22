const {
  mongoose: { Schema, model },
} = require("../tools/database");

const episode = new Schema({
  series: String,
  title: String,
  episode: Number,
  date: Date,
  link: String,
  guests: [String],
  topics: [String],
  image: String,
});

module.exports = { Episode: model("Episode", episode) };
