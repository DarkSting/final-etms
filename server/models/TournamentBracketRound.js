const mongoose = require("mongoose");
const { tournamentBracketMatchSchema } = require("./TournamentBracketMatch");

// Creating the tournament bracket round schema
const tournamentBracketRoundSchema = new mongoose.Schema({
  round: {
    type: Number,
    required: [true, "Round number is required"],
  },
  matches: [tournamentBracketMatchSchema],
  isCompleted: {
    type: Boolean,
    default: false,
  },
});

const TournamentBracketRound = mongoose.model(
  "TournamentBracketRound",
  tournamentBracketRoundSchema
);

module.exports = { TournamentBracketRound, tournamentBracketRoundSchema };
