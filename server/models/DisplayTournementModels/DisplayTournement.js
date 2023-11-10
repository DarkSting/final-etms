const mongoose = require("mongoose");
const { RoundSchema } = require("./Round");

//train schema
const TournementSchema = new mongoose.Schema({
  name: {
    type: String,
    default: "unknown",
  },
  currentRound: {
    type: Number,
    default: -1,
  },

  roundHistory: [RoundSchema],
});

const DisplayTournementModel = mongoose.model(
  "displaytournement",
  TournementSchema
);

module.exports = {
  DisplayTournementModel,
};
