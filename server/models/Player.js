const mongoose = require("mongoose");
const { encryptPassword } = require("../bcrypt.cjs");

// Creating the player schema
const playerSchema = new mongoose.Schema({
  // Full name of the player
  fullName: {
    type: String,
    required: true,
  },
  // Gaming alias of the player
  gamingAlias: {
    type: String,
    required: true,
  },
  // Username of the player
  username: {
    type: String,
    required: true,
  },
  // Email address of the player
  email: {
    type: String,
    required: true,
  },
  // Phone number of the player
  phone: {
    type: String,
  },
  // Description of the player
  description: {
    type: String,
  },
  // Password of the player
  password: {
    type: String,
    required: true,
  },
});

// Encrypt the password before saving the player
playerSchema.pre("save", async function (next) {
  const player = this;
  // Check if the password field has been modified
  if (player.isModified("password")) {
    player.password = await encryptPassword(player.password);
  }
  next(); // Proceed to the next middleware or save operation
});

// Creating the Player model using the playerSchema
const Player = mongoose.model("Player", playerSchema);

module.exports = Player;
