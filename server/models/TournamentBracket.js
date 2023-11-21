const mongoose = require("mongoose");
const { tournamentBracketRoundSchema } = require("./TournamentBracketRound");

// Creating the tournament bracket schema
const tournamentBracketSchema = new mongoose.Schema({
  name: {
    type: String,
    default: "Unknown",
  },
  currentRound: {
    type: Number,
    default: -1,
  },
  roundHistory: [tournamentBracketRoundSchema],
});

const TournamentBracket = mongoose.model(
  "TournamentBracket",
  tournamentBracketSchema
);

module.exports = {
  TournamentBracket,
};
