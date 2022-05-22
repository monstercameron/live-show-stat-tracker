const { mongoose } = require("../tools/database");

const vote = new mongoose.Schema({
  targetId: ObjectId,
  sexualAttraction: Number,
  relationshipAttraction: Number,
  looks: Number,
  personality: Number,
});

const Vote = mongoose.model("Vote", vote);
module.exports = Vote;
