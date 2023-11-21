const Tournament = require("../models/Tournament");
const TournamentSchedule = require("../models/TournamentSchedule");
const TeamTournamentRegistration = require("../models/TeamTournamentRegistration");
const TournamentRound = require("../models/TournamentRound");
const { startOfDay, endOfDay, isPast, isFuture } = require("date-fns");
const { createTournamentMatches } = require("./TournamentBracketController");

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

    //newly updated
    const result =await createTournamentMatches(tournamentName);

    if(!result){
      console.log("network not created")
    }

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

// Controller to fetch all tournaments based on selected eSports title
const getAllTournaments = async (req, res) => {
  try {
    const selectedEsportsTitle = req.params.selectedEsportsTitle;

    // Get the current date
    const currentDate = new Date();

    // Find all tournaments of the selected eSports title
    const tournaments = await Tournament.find({
      esportsTitle: selectedEsportsTitle,
    });

    // Separate tournaments into past and upcoming
    const pastTournaments = tournaments.filter((tournament) =>
      isPast(tournament.endDate)
    );
    const upcomingTournaments = tournaments.filter((tournament) =>
      isFuture(tournament.startDate)
    );

    // Respond with past and upcoming tournaments
    return res.json({
      pastTournaments,
      upcomingTournaments,
      currentDate,
    });
  } catch (error) {
    console.error("Error fetching tournaments:", error);
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

    const teamTournamentRegistration = new TeamTournamentRegistration({
      tournamentId: tournament._id,
      registrationFee: tournament.registrationFees,
    });

    await teamTournamentRegistration.save();

    const roundOne = new TournamentRound({
      tournamentId: tournament._id,
      roundNumber: 1,
    });

    await roundOne.save();

    // Respond with a success message
    return res.json({
      message: "Tournament registration dates updated successfully",
    });
  } catch (error) {
    return res.status(500).json(error);
  }
};

// Controller to get current tournament registration status
const getCurrentTournamentRegistrationStatus = async (req, res) => {
  try {
    const { tournamentId } = req.params;

    // Find the tournament by ID
    const tournament = await Tournament.findById(tournamentId);

    // If tournament is not found, return an error
    if (!tournament) {
      return res.status(404).json({ error: "Tournament not found" });
    }

    // Extract the current registration status, start date, and end date
    const { isRegistrationOpen, startDateRegistration, endDateRegistration } =
      tournament;

    if (isRegistrationOpen) {
      return res.json({
        isRegistrationOpen,
        startDateRegistration,
        endDateRegistration,
      });
    } else {
      return res.json({ isRegistrationOpen });
    }
  } catch (error) {
    return res.status(500).json(error);
  }
};

// Controller to get tournament registration details
const getTournamentRegistrationDetails = async (req, res) => {
  try {
    const { tournamentId } = req.params;
    // Find the tournament by ID
    const tournament = await Tournament.findById(tournamentId);

    // If tournament is not found, return an error
    if (!tournament) {
      return res.status(404).json({ error: "Tournament not found" });
    }

    // Extract the necessary details
    const {
      startDateRegistration,
      endDateRegistration,
      isRegistrationOpen,
      registrationFees,
    } = tournament;

    return res.json({
      startDateRegistration,
      endDateRegistration,
      isRegistrationOpen,
      registrationFees,
    });
  } catch (error) {
    return res.status(500).json(error);
  }
};

// Controller to get total earnings for a tournament
const getTotalEarnings = async (req, res) => {
  try {
    const { tournamentId } = req.params;

    // Find the tournament by ID
    const tournament = await Tournament.findById(tournamentId);

    if (!tournament) {
      return res.status(404).json({ error: "Tournament not found" });
    }

    // Find all team registrations for the tournament
    const teamRegistrations = await TeamTournamentRegistration.find({
      tournamentId: tournament._id,
    });

    // Calculate the total earnings by multiplying the number of teams by the registration fee
    let totalEarnings = 0;
    for (const registration of teamRegistrations) {
      totalEarnings +=
        registration.teamIds.length * registration.registrationFee;
    }

    return res.json({ totalEarnings });
  } catch (error) {
    return res.status(500).json(error);
  }
};

// Controller to get total registrations for a tournament
const getTotalRegistrations = async (req, res) => {
  try {
    const { tournamentId } = req.params;

    // Find the tournament by ID
    const tournament = await Tournament.findById(tournamentId);

    if (!tournament) {
      return res.status(404).json({ error: "Tournament not found" });
    }

    // Find all team registrations for the tournament
    const teamRegistrations = await TeamTournamentRegistration.find({
      tournamentId: tournament._id,
    });

    // Calculate the total registrations by summing the number of teams registered
    let totalRegistrations = 0;
    for (const registration of teamRegistrations) {
      totalRegistrations += registration.teamIds.length;
    }

    return res.json({ totalRegistrations });
  } catch (error) {
    return res.status(500).json(error);
  }
};

// Controller to generate tournament report
const getTournamentReport = async (req, res) => {
  try {
    const { tournamentId } = req.params;

    // Find the tournament by ID
    const tournament = await Tournament.findById(tournamentId);

    if (!tournament) {
      return res.status(404).json({ error: "Tournament not found" });
    }

    // Fetch team registrations for the tournament
    const teamRegistrations = await TeamTournamentRegistration.find({
      tournamentId: tournament._id,
    }).populate({
      path: "teamIds",
      select: "teamName",
    });

    // Create a report object with tournament details
    const report = {
      tournamentName: tournament.tournamentName,
      esportsTitle: tournament.esportsTitle,
      teams: [],
    };

    for (const registration of teamRegistrations) {
      if (registration.teamIds) {
        for (const team of registration.teamIds) {
          report.teams.push({
            teamName: team.teamName,
            registrationFees: registration.registrationFee,
            paymentStatus: "Completed",
          });
        }
      }
    }

    return res.json(report);
  } catch (error) {
    return res.status(500).json(error);
  }
};

module.exports = {
  createTournament,
  getTournamentDetails,
  getAllTournaments,
  getTournamentsByOrganizer,
  setTournamentRegistrationDates,
  getCurrentTournamentRegistrationStatus,
  getTournamentRegistrationDetails,
  getTotalEarnings,
  getTotalRegistrations,
  getTournamentReport,
};
