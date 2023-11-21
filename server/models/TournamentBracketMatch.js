const mongoose = require("mongoose");
const {
  tournamentBracketParticipantSchema,
} = require("./TournamentBracketParticipant");

const status = [null, "PLAYED", "NO_SHOW", "WALK_OVER", "NO_PARTY"];

// Creating the tournament bracket match schema
const tournamentBracketMatchSchema = new mongoose.Schema({
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
  participants: [tournamentBracketParticipantSchema],
});

const TournamentBracketMatch = mongoose.model(
  "TournamentBracketMatch",
  tournamentBracketMatchSchema
);

module.exports = { TournamentBracketMatch, tournamentBracketMatchSchema };
