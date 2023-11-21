const Team = require("../models/Team");
const TeamRequest = require("../models/TeamRequest");
const Tournament = require("../models/Tournament");
const TeamTournamentRegistration = require("../models/TeamTournamentRegistration");
const TournamentRound = require("../models/TournamentRound");
const { registrationPhase } = require("./TournamentBracketController");

// Controller to create a new team
const createTeam = async (req, res) => {
  try {
    const {
      userId,
      esportsTitle,
      teamName,
      teamTag,
      teamDescription,
      selectedClan,
    } = req.body;

    // Create a new team
    const team = new Team({
      esportsTitle: esportsTitle,
      teamName: teamName,
      teamTag: teamTag,
      teamDescription: teamDescription,
      selectedClan: selectedClan,
      createdBy: userId,
    });

    // Save the tournament to the database
    await team.save();

    // Respond with a success message and unique team ID
    return res.status(201).json({
      message: "Team created successfully",
      teamId: team._id, // Get the unique ID of the created team
    });
  } catch (error) {
    return res.status(500).json(error);
  }
};

// Controller to fetch team details
const getTeamDetails = async (req, res) => {
  try {
    const { teamId } = req.params;

    // Find the team by ID
    const team = await Team.findById(teamId);

    // If team is not found, return an error
    if (!team) {
      return res.status(404).json({ error: "Team not found" });
    }

    // Respond with team details
    return res.json({ team });
  } catch (error) {
    return res.status(500).json(error);
  }
};

// Controller to fetch players of a team
const getTeamPlayers = async (req, res) => {
  try {
    const { teamId } = req.params;

    // Find the team by ID to get the list of players
    const team = await Team.findById(teamId).populate("players createdBy");

    // If team is not found, return an error
    if (!team) {
      return res.status(404).json({ error: "Team not found" });
    }

    // Extract the players and createdBy player from the team
    const players = team.players;
    const createdByPlayer = team.createdBy;

    // Respond with the list of players and createdBy player
    return res.json({ players, createdByPlayer });
  } catch (error) {
    return res.status(500).json(error);
  }
};

// Controller to fetch all the available teams
const getAllTeams = async (req, res) => {
  try {
    const selectedEsportsTitle = req.params.selectedEsportsTitle; // Get the selected esports title

    // Find teams associated with the selected esports title
    const teams = await Team.find({
      esportsTitle: selectedEsportsTitle,
    });

    // Respond with the teams
    return res.json({ teams });
  } catch (error) {
    return res.status(500).json(error);
  }
};

// Controller to fetch opened teams
const getOpenedTeams = async (req, res) => {
  try {
    const selectedEsportsTitle = req.params.selectedEsportsTitle; // Get the selected esports title

    // Find teams associated with the selected esports title that are open
    const teams = await Team.find({
      esportsTitle: selectedEsportsTitle,
      isOpen: true,
    });

    // Respond with the teams
    return res.status(200).json({ teams });
  } catch (error) {
    return res.status(500).json(error);
  }
};

// Controller to fetch teams that the player has joined
const getJoinedTeams = async (req, res) => {
  try {
    const playerId = req.body.userId; // Get the player's ID

    // Find teams where the player's ID is in the team's players array
    // or the player's ID is in the createdBy field
    const teams = await Team.find({
      $or: [{ players: playerId }, { createdBy: playerId }],
    });

    // Respond with the teams
    return res.json({ teams });
  } catch (error) {
    return res.status(500).json(error);
  }
};

// Controller to fetch teams created by the logged-in player
const getTeamsByPlayer = async (req, res) => {
  try {
    const playerId = req.body.userId; // Get the logged-in player's ID
    const selectedEsportsTitle = req.params.selectedEsportsTitle; // Get the selected esports title

    // Find teams associated with the player's ID and the selected esports title
    const teams = await Team.find({
      createdBy: playerId,
      esportsTitle: selectedEsportsTitle,
    });

    // Respond with the teams
    return res.json({ teams });
  } catch (error) {
    return res.status(500).json(error);
  }
};

// Controller to send a request to join a team
const sendTeamRequest = async (req, res) => {
  const playerId = req.body.userId;
  const teamId = req.params.teamId;

  try {
    const foundAnExistingInvitation = await TeamRequest.findOne({
      $and: [{ playerId: playerId }, { isAccepted: false }, { teamId: teamId }],
    });

    if (foundAnExistingInvitation) {
      return res
        .status(400)
        .json({ msg: "You cannot send more than one request for a team" });
    }

    const teamRequest = new TeamRequest({
      playerId: playerId,
      teamId: teamId,
    });

    await teamRequest.save();

    return res.status(200).json({ msg: "Request sent" });
  } catch (error) {
    console.error("Error sending join request:", error);
    return res.status(500).json(error);
  }
};

// Controller to get team join requests
const getTeamJoinRequests = async (req, res) => {
  const { teamId } = req.params;

  try {
    // Find all join requests for the specified team
    const joinRequests = await TeamRequest.find({
      teamId,
      isAccepted: false,
    }).populate({
      path: "playerId",
      select: "gamingAlias username",
    });

    // Send the join requests as a response
    return res.status(200).json({ joinRequests });
  } catch (error) {
    console.error("Error fetching join requests:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

// Controller to accept a player's request to join a team
const acceptTeamRequest = async (req, res) => {
  const playerId = req.body.playerId;
  const teamId = req.params.teamId;

  try {
    // Check if the team has reached the maximum number of players
    const team = await Team.findById(teamId);

    if (!team) {
      return res.status(404).json({ msg: "Team not found" });
    }

    // Maximum number of players excluding the captain
    const maxPlayers = 4;

    if (team.players.length >= maxPlayers) {
      return res
        .status(400)
        .json({ msg: "Team has reached the maximum number of players." });
    }

    // Find and update the player's request
    const foundPlayerRequest = await TeamRequest.findOneAndUpdate(
      {
        $and: [
          { playerId: playerId },
          { isAccepted: false },
          { teamId: teamId },
        ],
      },
      { isAccepted: true }
    );

    if (!foundPlayerRequest) {
      return res.status(404).json({ msg: "Request not found" });
    }

    // Add the player to the team's players array
    const updatedTeamWithPlayer = await Team.findByIdAndUpdate(
      teamId,
      { $push: { players: playerId } },
      { new: true }
    );

    if (!updatedTeamWithPlayer) {
      return res.status(500).json({ msg: "Failed to add player to the team" });
    }

    // If the maximum number of players has been reached after adding the player, set isOpen to false
    if (updatedTeamWithPlayer.players.length >= maxPlayers) {
      await Team.findByIdAndUpdate(teamId, { isOpen: false }, { new: true });
    }

    return res.status(200).json({ msg: "Request accepted" });
  } catch (error) {
    console.error(error);
    return res.status(500).json(error);
  }
};

// Controller to reject a player's request to join a team
const rejectTeamRequest = async (req, res) => {
  const playerId = req.body.playerId;
  const teamId = req.params.teamId;

  try {
    const foundPlayerRequest = await TeamRequest.deleteOne({
      $and: [{ playerId: playerId }, { isRejected: false }, { teamId: teamId }],
    });

    if (foundPlayerRequest.deletedCount === 0) {
      return res.status(404).json({ msg: "Request not found" });
    }

    return res.status(200).json({ msg: "Request rejected" });
  } catch (error) {
    console.error(error);
    return res.status(500).json(error);
  }
};

// Controller to remove a player from a team
const removePlayerFromTeam = async (req, res) => {
  const playerId = req.body.playerId;
  const teamId = req.params.teamId;

  try {
    // Remove the player from the team's players array
    const updatedTeam = await Team.findByIdAndUpdate(
      teamId,
      {
        $pull: { players: playerId },
        isOpen: true,
      },
      { new: true }
    );

    if (!updatedTeam) {
      return res
        .status(500)
        .json({ msg: "Failed to remove player from the team" });
    }

    return res.status(200).json({ msg: "Player removed from the team" });
  } catch (error) {
    console.error(error);
    return res.status(500).json(error);
  }
};

// Controller to register for a tournament as a team
const registerTeamForTournament = async (req, res) => {
  try {
    const { tournamentId } = req.params;
    const teamId = req.body.teamId;

    // Check if the tournament exists
    const tournament = await Tournament.findById(tournamentId);

    if (!tournament) {
      return res.status(404).json({ error: "Tournament not found." });
    }

    // Check if the tournament is open for registration
    if (!tournament.isRegistrationOpen) {
      return res
        .status(400)
        .json({ error: "Tournament registration is closed." });
    }

    // Check if the team exists
    const team = await Team.findById(teamId);

    if (!team) {
      return res.status(404).json({ error: "Team not found." });
    }

    

    const foundTeamRegistration = await TeamTournamentRegistration.findOne({
      tournamentId: tournament._id,
    });

    const roundOne = await TournamentRound.findOne({
      $and: [{ roundNumber: 1 }, { tournamentId: tournament._id }],
    });

    if (!roundOne) {
      return res.status(404).json({ error: "Round not found." });
    }

    if (foundTeamRegistration.teamIds.includes(team._id)) {
      return res
        .status(404)
        .json({ error: "Team has been registered already." });
    }

    foundTeamRegistration.teamIds.push(teamId);

    if (roundOne.teamIds.includes(team._id)) {
      return res
        .status(404)
        .json({ error: "Team is already assigned to round one." });
    }

    await foundTeamRegistration.save();

    roundOne.teamIds.push(teamId);

    await roundOne.save();
    //newly updated
    const result = await registrationPhase(tournament.tournamentName,team.teamName)

    if(!result){
      console.log("unable put team to bracket but good to go")
    }

    return res.status(201).json({
      message: "Team registration for the tournament was successful.",
    });
  } catch (error) {
    return res.status(500).json(error);
  }
};

// Controller to get team details after successfully registering for a tournament
const getTeamDetailsAfterSuccessfulTournamentRegistration = async (
  req,
  res
) => {
  const { tournamentId, teamId } = req.params;

  try {
    // Simulate a delay of 1 seconds (1000 milliseconds)
    setTimeout(async () => {
      // Query the TeamTournamentRegistration model to get the team IDs registered for the tournament
      const registrationDetails = await TeamTournamentRegistration.findOne({
        tournamentId,
        teamIds: teamId,
      });

      if (!registrationDetails) {
        return res
          .status(404)
          .json({ error: "Team tournament registration not found." });
      }

      // If the team is registered, query the Team model to get the team details
      const teamDetails = await Team.findById(teamId);

      if (!teamDetails) {
        return res.status(404).json({ error: "Team not found." });
      }

      // Include the registrationFee in the response
      const response = {
        teamName: teamDetails.teamName,
        players: teamDetails.players,
        registrationFees: registrationDetails.registrationFee,
      };

      // Send the response with the team details and registration fee
      return res.status(200).json(response);
    }, 5000); // Delay of 1 seconds (1000 milliseconds)
  } catch (error) {
    return res.status(500).json(error);
  }
};

const getPlayersTournamentRegistrations = async (req, res) => {
  try {
    const playerId = req.body.userId; // Get the player's ID
    const selectedEsportsTitle = req.params.selectedEsportsTitle; // Get the selected eSports title

    // Find teams where the player's ID is in the team's players array
    // or the player's ID is in the createdBy field
    const teams = await Team.find({
      $or: [{ players: playerId }, { createdBy: playerId }],
    });

    // Get the IDs of the player's teams
    const teamIds = teams.map((team) => team._id);

    // Find tournament registrations where the player's teams are registered
    const tournamentRegistrations = await TeamTournamentRegistration.find({
      teamIds: { $in: teamIds }, // Check if the team ID is in the array of player's team IDs
    });

    const tournamentIds = tournamentRegistrations.map(
      (reg) => reg.tournamentId
    );

    // Fetch tournament details for the registered tournaments that match the selectedEsportsTitle
    const tournaments = await Tournament.find({
      _id: { $in: tournamentIds }, // Check if the tournament ID is in the array of registered tournament IDs
      esportsTitle: selectedEsportsTitle, // Filter by selected eSports title
    });

    // Respond with the list of tournaments the player's teams are registered in
    return res.json({ tournaments });
  } catch (error) {
    return res.status(500).json(error);
  }
};

module.exports = {
  createTeam,
  getTeamDetails,
  getTeamPlayers,
  getAllTeams,
  getOpenedTeams,
  getJoinedTeams,
  getTeamsByPlayer,
  sendTeamRequest,
  getTeamJoinRequests,
  acceptTeamRequest,
  rejectTeamRequest,
  removePlayerFromTeam,
  registerTeamForTournament,
  getTeamDetailsAfterSuccessfulTournamentRegistration,
  getPlayersTournamentRegistrations,
};
