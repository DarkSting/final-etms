const mongoose = require("mongoose");
const { ParticipantSchema } = require("./Participant");

const status = [null, "PLAYED", "NO_SHOW", "WALK_OVER", "NO_PARTY"];

const MatchSchema = new mongoose.Schema({
  id: {
    type: Number,
    default: 0,
  },
  nextMatchId: {
    type: Number,
    default: 0,
  },
  tournamentRoundText: {
    type: String,
    default: "0",
  },

  startTime: {
    type: Date,
    default: Date.now,
  },
  state: {
    type: String,
    enum: status,
    default: status[0],
  },
  participants: [ParticipantSchema],
});

const MatchModel = mongoose.model("matches", MatchSchema);

module.exports = { MatchModel, MatchSchema };
