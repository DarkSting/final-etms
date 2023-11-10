const mongoose = require("mongoose");

const esportsTitles = ["cs-go", "dota-2", "valorant", "lol"];

// Creating the team schema
const teamSchema = new mongoose.Schema({
  // Esports title of the team
  esportsTitle: {
    type: String,
    required: true,
    validate: {
      validator: function (value) {
        return esportsTitles.includes(value);
      },
      message: (props) => `${props.value} is not a valid Esports title!`,
    },
  },
  // Name of the team
  teamName: {
    type: String,
    required: true,
  },
  // Tag of the team
  teamTag: {
    type: String,
    required: true,
  },
  // Description of the team
  teamDescription: {
    type: String,
    required: true,
  },
  // Associated clan of the team
  associatedClan: {
    type: String,
    required: true,
  },
  // Team created by
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "Players",
  },
  // Players of the team
  players: [
    {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "Players",
      validate: {
        validator: function (value) {
          return value.length <= 4;
        },
        message: (props) => `${props.value.length} players are not allowed!`,
      },
    },
  ],
});

// Creating the Team model using the teamSchema
const Team = mongoose.model("Team", teamSchema);

module.exports = Team