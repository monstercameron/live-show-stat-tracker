const mongoose = require("mongoose");

mongoose.connect("mongodb://localhost:27017/Test", {
  useNewUrlParser: true,
});

module.exports = { mongoose, db: mongoose.connection };
