const bcrypt = require("bcrypt");

// Function to encrypt the password using bcrypt
const encryptPassword = async (password) => {
  // Generate a salt using bcrypt
  const salt = await bcrypt.genSalt(10);
  // Hash the password using bcrypt and the generated salt
  const hashedPassword = await bcrypt.hash(password, salt);
  // Return the hashed password
  return hashedPassword;
};

module.exports = {
  encryptPassword,
};
