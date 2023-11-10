const mongoose = require("mongoose");

const teamTournamentRegistrationSchema = new mongoose.Schema({
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
  registrationFee: {
    type: Number,
    required: true,
  },
});

const TeamTournamentRegistration = mongoose.model(
  "TeamTournamentRegistration",
  teamTournamentRegistrationSchema
);

module.exports = TeamTournamentRegistration;
