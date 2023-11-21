const router = require("express").Router();
const playerController = require("../controllers/PlayerController");
const teamController = require("../controllers/TeamController");
const tournamentController = require("..//controllers/TournamentController");
const { authenticateUser } = require("../middleware/authentication");

// Player registration route
router.post("/register", playerController.registerPlayer);

// Player login route
router.post("/login", playerController.loginPlayer);

// Player view profile route
router.get(
  "/view-profile",
  authenticateUser,
  playerController.getPlayerProfile
);

// Player edit profile route
router.put(
  "/edit-profile",
  authenticateUser,
  playerController.updatePlayerProfile
);

// Player - fetch all the available tournaments
router.get(
  "/:selectedEsportsTitle/tournaments",
  authenticateUser,
  tournamentController.getAllTournaments
);

// Player - fetch tournament registration details
router.get(
  "/:esportsTitle/tournament/:tournamentId/registration",
  authenticateUser,
  tournamentController.getTournamentRegistrationDetails
);

// Player - create new team routes
router.post("/create-team/cs-go", authenticateUser, teamController.createTeam);
router.post("/create-team/dota-2", authenticateUser, teamController.createTeam);
router.post(
  "/create-team/valorant",
  authenticateUser,
  teamController.createTeam
);
router.post("/create-team/lol", authenticateUser, teamController.createTeam);

// Player - fetch team details route
router.get(
  "/:esportsTitle/team/:teamId",
  authenticateUser,
  teamController.getTeamDetails
);

// Player - fetch team players route
router.get(
  "/:esportsTitle/team/:teamId/players",
  authenticateUser,
  teamController.getTeamPlayers
);

// Player - fetch all the available teams
router.get(
  "/:selectedEsportsTitle/view-manage-teams/all",
  authenticateUser,
  teamController.getAllTeams
);

// Player - fetch opened teams
router.get(
  "/:selectedEsportsTitle/view-manage-teams/opened",
  authenticateUser,
  teamController.getOpenedTeams
);

// Player - fetch teams that the player has joined
router.get(
  "/:selectedEsportsTitle/view-manage-teams/joined",
  authenticateUser,
  teamController.getJoinedTeams
);

// Player - fetch teams created by the logged-in player
router.get(
  "/:selectedEsportsTitle/view-manage-teams/created-by-me",
  authenticateUser,
  teamController.getTeamsByPlayer
);

// Player - send a request to join a team
router.post(
  "/:esportsTitle/opened/team/:teamId/send-team-request",
  authenticateUser,
  teamController.sendTeamRequest
);

// Player - get team join requests
router.get(
  "/:esportsTitle/team/:teamId/team-join-requests",
  authenticateUser,
  teamController.getTeamJoinRequests
);

// Player - accept a player's request to join a team
router.post(
  "/:esportsTitle/team/:teamId/accept-team-request",
  authenticateUser,
  teamController.acceptTeamRequest
);

// Player - reject a player's request to join a team
router.post(
  "/:esportsTitle/team/:teamId/reject-team-request",
  authenticateUser,
  teamController.rejectTeamRequest
);

// Player - remove a player from a team
router.delete(
  "/:esportsTitle/team/:teamId/players/remove-player",
  authenticateUser,
  teamController.removePlayerFromTeam
);

// Player - register a team for a tournament
router.post(
  "/:esportsTitle/tournament/:tournamentId/registration/register-as-team",
  authenticateUser,
  teamController.registerTeamForTournament
);

// Player - retrieve team details after successfully registering for a tournament
router.get(
  "/:esportsTitle/tournament/:tournamentId/registration/successful/:teamId",
  authenticateUser,
  teamController.getTeamDetailsAfterSuccessfulTournamentRegistration
);

// Player - retrieve tournament registrations of the logged-in player
router.get(
  "/:selectedEsportsTitle/registrations",
  authenticateUser,
  teamController.getPlayersTournamentRegistrations
);

router.post('')

module.exports = router;
