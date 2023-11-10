const mongoose = require("mongoose");
const { MatchSchema } = require("./Match");

const RoundSchema = new mongoose.Schema({
  round: {
    type: Number,
    required: [true, "round number required"],
  },
  matches: [MatchSchema],
  isCompleted: {
    type: Boolean,
    default: false,
  },
});

const RoundModel = mongoose.model("rounds", RoundSchema);

module.exports = { RoundModel, RoundSchema };
