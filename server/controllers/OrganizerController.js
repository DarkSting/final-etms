const bcrypt = require("bcrypt");
const Organizer = require("../models/Organizer");
const { createToken } = require("../middleware/authentication");

// Controller to handle organizer registration
const registerOrganizer = async (req, res) => {
  try {
    const { fullName, organizationName, username, email, password } = req.body;

    // Check if the organizer already exists
    const existingOrganizer = await Organizer.findOne({
      $or: [{ username }, { email }],
    });

    if (existingOrganizer) {
      // Return an error response if the username or email is already in use
      if (existingOrganizer.username === username) {
        return res.status(409).json({ error: "Username already exists" });
      } else {
        return res.status(409).json({ error: "Email already exists" });
      }
    }

    // Create a new organizer
    const organizer = new Organizer({
      fullName: fullName,
      organizationName: organizationName,
      username: username,
      email: email,
      password: password,
    });

    // Save the organizer to the database
    await organizer.save();

    // Respond with a success message
    return res
      .status(201)
      .json({ message: "Organizer registered successfully" });
  } catch (error) {
    return res.status(500).json(error);
  }
};

// Controller to handle organizer login
const loginOrganizer = async (req, res) => {
  try {
    const { username, password } = req.body;

    // Find the organizer with the provided username
    const organizer = await Organizer.findOne({ username });

    // If organizer doesn't exist, return an error
    if (!organizer) {
      return res.status(404).json({ error: "Invalid username" });
    }

    // Compare the provided password with the hashed password
    const passwordMatch = await bcrypt.compare(password, organizer.password);

    if (passwordMatch) {
      // Generate a JWT token and send it as a cookie in the response
      const token = createToken(organizer._id);
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

// Controller to get organizer profile
const getOrganizerProfile = async (req, res) => {
  try {
    const organizerId = req.body.userId;

    // Find the organizer using the ID
    const organizer = await Organizer.findById(organizerId);

    // If organizer was not found, return an error
    if (!organizer) {
      return res.status(404).json({ error: "Organizer not found" });
    }

    // Respond with the organizer's profile
    return res.json({ organizer });
  } catch (error) {
    return res.status(500).json(error);
  }
};

// Controller to update organizer profile
const updateOrganizerProfile = async (req, res) => {
  try {
    const organizerId = req.body.userId;
    const updatedData = req.body;

    // Update the organizer's profile using the ID
    await Organizer.findByIdAndUpdate(organizerId, updatedData);

    // Respond with a success message
    return res.status(200).json({ message: "Profile updated successfully" });
  } catch (error) {
    return res.status(500).json(error);
  }
};

module.exports = {
  registerOrganizer,
  loginOrganizer,
  getOrganizerProfile,
  updateOrganizerProfile,
};
