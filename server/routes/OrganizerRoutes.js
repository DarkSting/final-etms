const router = require("express").Router();
const organizerController = require("../controllers/OrganizerController");
const tournamentController = require("../controllers/TournamentController");
const tournamentScheduleController = require("../controllers/TournamentScheduleController");
const { authenticateUser } = require("../middleware/authentication");

// Organizer registration route
router.post("/register", organizerController.registerOrganizer);

// Organizer login route
router.post("/login", organizerController.loginOrganizer);

// Organizer view profile route
router.get(
  "/view-profile",
  authenticateUser,
  organizerController.getOrganizerProfile
);

// Organizer edit profile route
router.put(
  "/edit-profile",
  authenticateUser,
  organizerController.updateOrganizerProfile
);

// Organizer - create new tournament routes
router.post(
  "/create-tournament/cs-go",
  authenticateUser,
  tournamentController.createTournament
);
router.post(
  "/create-tournament/dota-2",
  authenticateUser,
  tournamentController.createTournament
);
router.post(
  "/create-tournament/valorant",
  authenticateUser,
  tournamentController.createTournament
);
router.post(
  "/create-tournament/lol",
  authenticateUser,
  tournamentController.createTournament
);

// Organizer - fetch tournament details route
router.get(
  "/:esportsTitle/tournament/:tournamentId",
  authenticateUser,
  tournamentController.getTournamentDetails
);

// Organizer - fetch tournaments created by the logged-in organizer
router.get(
  "/:selectedEsportsTitle/manage-tournaments",
  authenticateUser,
  tournamentController.getTournamentsByOrganizer
);

// Organizer - set registration dates route
router.post(
  "/:esportsTitle/tournament/:tournamentId/registration",
  authenticateUser,
  tournamentController.setTournamentRegistrationDates
);

// Organizer - create new tournament schedule routes
router.post(
  "/:esportsTitle/tournament/:tournamentId/create-tournament-schedule",
  authenticateUser,
  tournamentScheduleController.createTournamentSchedule
);

// Organizer - edit tournament schedule routes
router.put(
  "/:esportsTitle/tournament/:tournamentId/edit-tournament-schedule/:scheduleId",
  authenticateUser,
  tournamentScheduleController.editTournamentSchedule
);

// Organizer - delete tournament schedule routes
router.delete(
  "/:esportsTitle/tournament/:tournamentId/delete-tournament-schedule/:scheduleId",
  authenticateUser,
  tournamentScheduleController.deleteTournamentSchedule
);

module.exports = router;
