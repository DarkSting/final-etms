const express = require("express");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const dotenv = require("dotenv");
const rateLimit = require("express-rate-limit");
const cron = require("node-cron");
const organizerRoutes = require("./routes/OrganizerRoutes");
const playerRoutes = require("./routes/PlayerRoutes");
const newsRoutes = require("./routes/NewsRoutes");
const Tournament = require("./models/Tournament");

// Initialize the Express application
const app = express();

// Load environment variables from .env file
dotenv.config();

// Connect to MongoDB using Mongoose
mongoose
  .connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((error) => {
    console.error("Error connecting to MongoDB: ", error);
  });

// Middleware
app.use(express.json());
app.use(cookieParser());
app.use(cors({ credentials: true, origin: true }));

// Apply rate limiting middleware to specific routes
const limiter = rateLimit({
  windowMs: 30 * 60 * 1000, // 30 minutes window for rate limiting
  max: 10, // Limit each IP to 10 requests per windowMs
});

// Define a cron job that runs every hour (at the beginning of the hour)
cron.schedule("0 * * * *", async () => {
  try {
    const now = new Date();

    // Find tournaments where end date has passed and registration is still open
    const tournamentsToUpdate = await Tournament.find({
      endDateRegistration: { $lt: now },
      isRegistrationOpen: true,
    });

    // Update the registration status for each tournament
    for (const tournament of tournamentsToUpdate) {
      tournament.isRegistrationOpen = false;
      await tournament.save();
    }

    console.log("Updated registration status for expired tournaments");
  } catch (error) {
    console.error("Error updating registration status: ", error);
  }
});

// Use the organizer routes
app.use("/api/organizers", organizerRoutes);

// Use the player routes
app.use("/api/players", playerRoutes);

// Use the news routes
app.use("/api/news", newsRoutes, limiter);

app.use("/api/display-tournement", require('./routes/DisplayTournementRoutes'));

// Start the server using the port from .env
const port = process.env.PORT;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
