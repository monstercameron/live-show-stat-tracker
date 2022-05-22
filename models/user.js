const {
  mongoose: { Schema, model },
} = require("../tools/database");

const roles = ["admin", "voter"];

const user = new Schema({
  name: String,
  password: String,
  recovery: String,
  recoveryQuestion: String,
  email: String,
  role: String,
  image: String,
});

module.exports = { User: model("User", user), roles };
