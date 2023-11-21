const mongoose = require("mongoose");

const status = [null, "PLAYED", "NO_SHOW", "WALK_OVER", "NO_PARTY"];

// Creating the tournament bracket participant schema
const tournamentBracketParticipantSchema = new mongoose.Schema({
  id: {
    type: String,
    default: "123",
  },
  resultText: {
    type: String,
    default: null,
  },

  isWinner: {
    type: Boolean,
    default: false,
  },
  status: {
    type: String,
    enum: status,
    default: status[0],
  },
  name: {
    type: String,
    default: "Null",
  },
});

const TournamentBracketParticipant = mongoose.model(
  "TournamentBracketParticipant",
  tournamentBracketParticipantSchema
);

module.exports = {
  TournamentBracketParticipant,
  tournamentBracketParticipantSchema,
};
