import React, { useEffect, useState, useCallback } from "react";
import { useParams } from "react-router-dom";
import { Button, ListGroup } from "react-bootstrap";
import axios from "../../../middleware/axios";
import PlayersNavigationBar from "../../../components/PlayersNavigationBar";
import Footer from "../../../components/Footer";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./TeamPlayers.css";

function TeamPlayers() {
  // Extract teamId and esportsTitle from URL parameters
  const { teamId, esportsTitle } = useParams();

  // State to store the list of team players and createdBy player
  const [teamPlayers, setTeamPlayers] = useState([]);
  const [createdByPlayer, setCreatedByPlayer] = useState({});

  // Function to fetch team players and createdBy player
  const fetchTeamPlayers = useCallback(async () => {
    try {
      // Send a GET request to the server's
      // '/api/players/${esportsTitle}/team/${teamId}/players' endpoint
      const response = await axios.get(
        `/api/players/${esportsTitle}/team/${teamId}/players`
      );

      // Ensure that the response.data.players is an array before setting it
      if (Array.isArray(response.data.players)) {
        setTeamPlayers(response.data.players);
      } else {
        // If it's not an array, set an empty array to prevent errors
        setTeamPlayers([]);
      }

      // Set the createdBy player
      setCreatedByPlayer(response.data.createdByPlayer);
    } catch (error) {
      console.error("Error fetching team players:", error);
      // Set an empty array and object in case of an error
      setTeamPlayers([]);
      setCreatedByPlayer({});
    }
  }, [esportsTitle, teamId]);

  useEffect(() => {
    // Call the function to fetch team players when the component mounts
    fetchTeamPlayers();
  }, [fetchTeamPlayers]);

  // Function to handle removing a team player
  const handleRemovePlayer = async (playerId) => {
    console.log("Player ID:", playerId);
    try {
      // Send a DELETE request to the server's
      // `/api/players/${esportsTitle}/team/${teamId}/players/remove-player` endpoint
      await axios.delete(
        `/api/players/${esportsTitle}/team/${teamId}/players/remove-player`,
        { data: { playerId } }
      );

      // Display a success notification
      toast.success("Player removed from the team successfully!");

      // After successful removal, refetch the team players
      fetchTeamPlayers();
    } catch (error) {
      console.error("Error removing team player:", error);
      // Display an error notification
      toast.error("Failed to remove player from the team. Please try again.");
    }
  };

  return (
    <div className="team-players-wrapper">
      {/* Players navigation bar component */}
      <PlayersNavigationBar />
      {/* Heading for the team players section */}
      <h1 className="team-players-heading">Team Players</h1>
      <div className="team-players-list">
        <ListGroup>
          {/* Display the createdBy player */}
          {createdByPlayer && (
            <ListGroup.Item className="team-players-item">
              {createdByPlayer.gamingAlias} ({createdByPlayer.username}) -
              Captain
            </ListGroup.Item>
          )}
          {/* Display other team players */}
          {teamPlayers.map((player) => (
            <ListGroup.Item key={player.id} className="team-players-item">
              {/* Display the gaming alias and username */}
              {player.gamingAlias} ({player.username})
              <Button
                variant="danger"
                onClick={() => handleRemovePlayer(player._id)}
                className="team-players-remove-button"
              >
                Remove
              </Button>
            </ListGroup.Item>
          ))}
        </ListGroup>
      </div>
      {/* Add ToastContainer */}
      <ToastContainer />
      {/* Footer component */}
      <Footer />
    </div>
  );
}

export default TeamPlayers;
