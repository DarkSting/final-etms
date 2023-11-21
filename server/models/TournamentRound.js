const mongoose = require("mongoose");

const tournamentRoundSchema = new mongoose.Schema({
  teamIds: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Team",
    },
  ],
  tournamentId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "Tournament",
  },
  roundNumber: {
    type: Number,
    required: true,
  },
  isCompleted: {
    type: Boolean,
    default: false,
  },
});

const TournamentRound = mongoose.model(
  "TournamentRound",
  tournamentRoundSchema
);

module.exports = TournamentRound;
