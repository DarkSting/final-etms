const mongoose = require("mongoose");

// Creating the team request schema
const teamRequestSchema = new mongoose.Schema({
  // ID of the player
  playerId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "Player",
  },
  // ID of the team
  teamId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "Team",
  },
  // Is the player accepted to join the team
  isAccepted: {
    type: Boolean,
    default: false,
  },
  // Is the player rejected to join the team
  isRejected: {
    type: Boolean,
    default: false,
  },
});

// Creating the Team Request model using the teamRequestSchema
const TeamRequest = mongoose.model("TeamRequest", teamRequestSchema);

module.exports = TeamRequest;
