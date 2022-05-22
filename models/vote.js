const {
  mongoose: { Schema, model },
} = require("../tools/database");

const vote = new Schema({
  targetId: ObjectId,
  sexualAttraction: Number,
  relationshipAttraction: Number,
  looks: Number,
  personality: Number,
});

module.exports = { Vote: model("Vote", vote) };
