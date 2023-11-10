const mongoose = require("mongoose");

const esportsTitles = ["cs-go", "dota-2", "valorant", "lol"];

// Creating the tournament schema
const tournamentSchema = new mongoose.Schema({
  // Esports title of the tournament
  esportsTitle: {
    type: String,
    validate: {
      validator: function (value) {
        return esportsTitles.includes(value);
      },
      message: (props) => `${props.value} is not a valid Esports title!`,
    },
    required: true,
  },
  // Name of the tournament
  tournamentName: {
    type: String,
    required: true,
  },
  // Description of the tournament
  tournamentDescription: {
    type: String,
    required: true,
  },
  // Registration fees of the tournament
  registrationFees: {
    type: Number,
    required: true,
  },
  // Start date of the tournament
  startDate: {
    type: Date,
    required: true,
  },
  // End date of the tournament
  endDate: {
    type: Date,
    required: true,
  },
  // Maximum number of teams allowed in the tournament
  maxTeams: {
    type: Number,
    required: true,
  },
  // Indicates whether the tournament is held online or offline
  isOnline: {
    type: Boolean,
  },
  // Location of the tournament (required if the tournament is offline)
  tournamentLocation: {
    type: String,
  },
  // Format of the tournament
  tournamentFormat: {
    type: String,
    required: true,
  },
  // Rules of the tournament
  tournamentRules: {
    type: String,
  },
  // Tournament created by
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "Organizer",
  },
  // Registration start date
  startDateRegistration: {
    type: Date,
  },
  // Registration end date
  endDateRegistration: {
    type: Date,
  },
  // Indicates whether registration is open
  isRegistrationOpen: {
    type: Boolean,
    default: false,
  },
});

// Creating the Tournament model using the tournamentSchema
const Tournament = mongoose.model("Tournament", tournamentSchema);

module.exports = Tournament;
