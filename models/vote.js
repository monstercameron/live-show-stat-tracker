const {
  mongoose: { Schema, model },
} = require("../tools/database");

const vote = new Schema({
  looks: Number,
  targetId: String,
  personality: Number,
  indentifier: String,
  sexualAttraction: Number,
  relationshipAttraction: Number,
});

module.exports = { Vote: model("Vote", vote) };
