const bcrypt = require("bcrypt");
const Player = require("../models/Player");
const { createToken } = require("../middleware/authentication");

// Controller to handle player registration
const registerPlayer = async (req, res) => {
  try {
    const { fullName, gamingAlias, username, email, password } = req.body;

    // Check if the player already exists
    const existingPlayer = await Player.findOne({
      $or: [{ username }, { email }],
    });

    if (existingPlayer) {
      // Return an error response if the username or email is already in use
      if (existingPlayer.username === username) {
        return res.status(409).json({ error: "Username already exists" });
      } else {
        return res.status(409).json({ error: "Email already exists" });
      }
    }

    // Create a new player
    const player = new Player({
      fullName: fullName,
      gamingAlias: gamingAlias,
      username: username,
      email: email,
      password: password,
    });

    // Save the player to the database
    await player.save();

    // Respond with a success message
    return res.status(201).json({ message: "Player registered successfully" });
  } catch (error) {
    return res.status(500).json(error);
  }
};

// Controller to handle player login
const loginPlayer = async (req, res) => {
  try {
    const { username, password } = req.body;

    // Find the player with the provided username
    const player = await Player.findOne({ username });

    // If player doesn't exist, return an error
    if (!player) {
      return res.status(404).json({ error: "Invalid username" });
    }

    // Compare the provided password with the hashed password
    const passwordMatch = await bcrypt.compare(password, player.password);

    if (passwordMatch) {
      // Generate a JWT token and send it as a cookie in the response
      const token = createToken(player._id);
      res.cookie("jwt", token, { httpOnly: true });

      // Respond with a success message
      return res.json({ message: "Login successful" });
    } else {
      // Return an error response if the password is invalid
      return res.status(401).json({ error: "Invalid password" });
    }
  } catch (error) {
    return res.status(500).json(error);
  }
};

// Controller to get player profile
const getPlayerProfile = async (req, res) => {
  try {
    const playerId = req.body.userId;

    // Find the player using the ID
    const player = await Player.findById(playerId);

    // If player was not found, return an error
    if (!player) {
      return res.status(404).json({ error: "Player not found" });
    }

    // Respond with the player's profile
    return res.json({ player });
  } catch (error) {
    return res.status(500).json(error);
  }
};

// Controller to update player profile
const updatePlayerProfile = async (req, res) => {
  try {
    const playerId = req.body.userId;
    const updatedData = req.body;

    // Update the player's profile using the ID
    await Player.findByIdAndUpdate(playerId, updatedData);

    // Respond with a success message
    return res.status(200).json({ message: "Profile updated successfully" });
  } catch (error) {
    return res.status(500).json(error);
  }
};

module.exports = {
  registerPlayer,
  loginPlayer,
  getPlayerProfile,
  updatePlayerProfile,
};
