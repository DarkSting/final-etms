const Tournament = require("../models/Tournament");
const TournamentSchedule = require("../models/TournamentSchedule");

// Controller to create a new tournament
const createTournament = async (req, res) => {
  try {
    const {
      userId,
      esportsTitle,
      tournamentName,
      tournamentDescription,
      registrationFees,
      startDate,
      endDate,
      maxTeams,
      isOnline,
      tournamentLocation,
      tournamentFormat,
      tournamentRules,
    } = req.body;

    // Create a new tournament
    const tournament = new Tournament({
      esportsTitle: esportsTitle,
      tournamentName: tournamentName,
      tournamentDescription: tournamentDescription,
      registrationFees: registrationFees,
      startDate: startDate,
      endDate: endDate,
      maxTeams: maxTeams,
      isOnline: isOnline,
      tournamentLocation:
        tournamentLocation === "" ? "Undefined" : tournamentLocation,
      tournamentFormat: tournamentFormat,
      tournamentRules: tournamentRules,
      createdBy: userId,
    });

    // Save the tournament to the database
    await tournament.save();

    // Respond with a success message and unique tournament ID
    return res.status(201).json({
      message: "Tournament created successfully",
      tournamentId: tournament._id, // Get the unique ID of the created tournament
    });
  } catch (error) {
    return res.status(500).json(error);
  }
};

// Controller to fetch tournament details
const getTournamentDetails = async (req, res) => {
  try {
    const { tournamentId } = req.params;

    // Find the tournament by ID
    const tournament = await Tournament.findById(tournamentId);

    // If tournament is not found, return an error
    if (!tournament) {
      return res.status(404).json({ error: "Tournament not found" });
    }

    // Fetch associated match schedules from the database
    const schedules = await TournamentSchedule.find({
      tournament: tournamentId,
    });

    // Respond with tournament details and schedules
    return res.json({ tournament, schedules });
  } catch (error) {
    return res.status(500).json(error);
  }
};

// Controller to fetch tournaments created by the logged-in organizer
const getTournamentsByOrganizer = async (req, res) => {
  try {
    const organizerId = req.body.userId; // Get the logged-in organizer's ID
    const selectedEsportsTitle = req.params.selectedEsportsTitle; // Get the selected esports title

    // Find tournaments associated with the organizer's ID and the selected esports title
    const tournaments = await Tournament.find({
      createdBy: organizerId,
      esportsTitle: selectedEsportsTitle,
    });

    // Respond with the tournaments
    return res.json({ tournaments });
  } catch (error) {
    return res.status(500).json(error);
  }
};

// Controller to set tournament registration dates
const setTournamentRegistrationDates = async (req, res) => {
  try {
    const { tournamentId } = req.params;
    const { startDate, endDate, registrationStatus } = req.body;

    // Find the tournament by ID
    const tournament = await Tournament.findById(tournamentId);

    // If tournament is not found, return an error
    if (!tournament) {
      return res.status(404).json({ error: "Tournament not found" });
    }

    // Update registration dates and status
    tournament.startDateRegistration = new Date(startDate);
    tournament.endDateRegistration = new Date(endDate);
    tournament.isRegistrationOpen = registrationStatus;

    // Save the updated tournament
    await tournament.save();

    // Respond with a success message
    return res.json({
      message: "Tournament registration dates updated successfully",
    });
  } catch (error) {
    return res.status(500).json(error);
  }
};

module.exports = {
  createTournament,
  getTournamentDetails,
  getTournamentsByOrganizer,
  setTournamentRegistrationDates,
};
