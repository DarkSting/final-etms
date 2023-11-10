const mongoose = require("mongoose");

// Creating the tournament schedule schema
const tournamentScheduleSchema = new mongoose.Schema({
  // Reference to the associated tournament
  tournament: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Tournament",
    required: true,
  },
  // Name of team A participating in the match
  teamA: {
    type: String,
    required: true,
  },
  // Name of team B participating in the match
  teamB: {
    type: String,
    required: true,
  },
  // Date of the scheduled match
  date: {
    type: Date,
    required: true,
  },
  // Time of the scheduled match
  time: {
    type: String,
    required: true,
  },
});

// Creating the TournamentSchedule model using the tournamentScheduleSchema
const TournamentSchedule = mongoose.model(
  "TournamentSchedule",
  tournamentScheduleSchema
);

module.exports = TournamentSchedule;
