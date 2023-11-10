const mongoose = require("mongoose");
const { encryptPassword } = require("../bcrypt.cjs");

// Creating the organizer schema
const organizerSchema = new mongoose.Schema({
  // Full name of the organizer
  fullName: {
    type: String,
    required: true,
  },
  // Name of the organization
  organizationName: {
    type: String,
    required: true,
  },
  // Username of the organizer
  username: {
    type: String,
    required: true,
  },
  // Email address of the organizer
  email: {
    type: String,
    required: true,
  },
  // Phone number of the organizer
  phone: {
    type: String,
  },
  // Description of the organizer
  description: {
    type: String,
  },
  // Password of the organizer
  password: {
    type: String,
    required: true,
  },
});

// Encrypt the password before saving the organizer
organizerSchema.pre("save", async function (next) {
  const organizer = this;
  // Check if the password field has been modified
  if (organizer.isModified("password")) {
    organizer.password = await encryptPassword(organizer.password);
  }
  next(); // Proceed to the next middleware or save operation
});

// Creating the Organizer model using the organizerSchema
const Organizer = mongoose.model("Organizer", organizerSchema);

module.exports = Organizer;
