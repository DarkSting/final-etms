const jwt = require("jsonwebtoken");

// Middleware function to authenticate the user using JSON Web Tokens (JWT)
const authenticateUser = (req, res, next) => {
  // Extract the JWT token from the cookies in the request
  const token = req.cookies.jwt;

  // Check if the token exists
  if (token) {
    // Verify the token using the secret key from .env
    jwt.verify(token, process.env.SECRET_KEY, (err, decoded) => {
      if (err) {
        // Token verification failed
        res.status(500).json({ msg: "Unable to verify token" });
      } else {
        // Token verification successful
        req.body.userId = decoded.id;
        next();
      }
    });
  } else {
    // No token found in the request
    res.status(401).json({ msg: "Token not found" });
  }
};

// Set the maximum time duration for the token to be valid
const maxTime = 8 * 60 * 60;

// Function to create a new JWT token for a given user ID
const createToken = (id) => {
  // Sign the payload containing the user ID with the secret key and set the expiration time
  return jwt.sign({ id }, process.env.SECRET_KEY, { expiresIn: maxTime });
};

module.exports = { authenticateUser, createToken };
