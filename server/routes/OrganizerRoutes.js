const router = require("express").Router();
const organizerController = require("../controllers/OrganizerController");
const tournamentController = require("../controllers/TournamentController");
const tournamentScheduleController = require("../controllers/TournamentScheduleController");
const tournamentBracketController = require("../controllers/TournamentBracketController");
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

// Organizer - fetch current tournament registration status
router.get(
  "/:esportsTitle/tournament/:tournamentId/current-registration-status",
  authenticateUser,
  tournamentController.getCurrentTournamentRegistrationStatus
);

// Organizer - generate brackets
router.post(
  "/:esportsTitle/tournament/:tournamentId/brackets/assign-team",
  authenticateUser,
  tournamentBracketController.assignTeam
);
router.put(
  "/:esportsTitle/tournament/:tournamentId/brackets/update-match-status",
  authenticateUser,
  tournamentBracketController.updateMatchStatus
);
router.post(
  "/:esportsTitle/tournament/:tournamentId/brackets/create-tournament-matches",
  authenticateUser,
  tournamentBracketController.createTournamentMatches
);

//updated one
router.get(
  "/get-tournament",
  tournamentBracketController.getTournament

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

// Organizer - get total earnings for a tournament
router.get(
  "/:esportsTitle/tournament/:tournamentId/total-earnings",
  authenticateUser,
  tournamentController.getTotalEarnings
);

// Organizer - get total registrations for a tournament
router.get(
  "/:esportsTitle/tournament/:tournamentId/total-registrations",
  authenticateUser,
  tournamentController.getTotalRegistrations
);

// Organizer - report for a tournament
router.get(
  "/:esportsTitle/tournament/:tournamentId/report",
  authenticateUser,
  tournamentController.getTournamentReport
);

router.post('/display-tournement/create-tournement',tournamentBracketController.createTournamentMatches)
router.put('/update-match',tournamentBracketController.updateMatchStatus);
router.put('/assign-team',tournamentBracketController.assignTeam);
router.get('/get-tournement',tournamentBracketController.getTournament)
router.post('/register-team',tournamentBracketController.registrationPhase)
router.post('/test',tournamentBracketController.assignWinnerToNext)
module.exports = router;
