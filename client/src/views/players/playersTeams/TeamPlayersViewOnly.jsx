import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { ListGroup } from "react-bootstrap";
import axios from "../../../middleware/axios";
import "./TeamPlayers.css";

function TeamPlayersViewOnly() {
  // Extract teamId and esportsTitle from URL parameters
  const { teamId, esportsTitle } = useParams();

  // State to store the list of team players and createdBy player
  const [teamPlayers, setTeamPlayers] = useState([]);
  const [createdByPlayer, setCreatedByPlayer] = useState({});

  useEffect(() => {
    // Function to fetch team players
    const fetchTeamPlayers = async () => {
      try {
        // Send a GET request to the server's '/api/players/${esportsTitle}/team/${teamId}/players' endpoint
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
    };

    // Call the function to fetch team players when the component mounts
    fetchTeamPlayers();
  }, [teamId, esportsTitle]);

  return (
    <div className="team-players-wrapper">
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
            <ListGroup.Item key={player._id} className="team-players-item">
              {player.gamingAlias} ({player.username})
            </ListGroup.Item>
          ))}
        </ListGroup>
      </div>
    </div>
  );
}

export default TeamPlayersViewOnly;
