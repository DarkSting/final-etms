import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "../../../middleware/axios";
import PlayersNavigationBar from "../../../components/PlayersNavigationBar";
import Footer from "../../../components/Footer";
import "./PlayersTournamentRegistrationSuccessful.css";

function PlayersTournamentRegistrationSuccessful() {
  const { tournamentId, esportsTitle, teamId } = useParams();

  const [teamName, setTeamName] = useState("");
  const [createdByGamingAlias, setCreatedByGamingAlias] = useState("");
  const [players, setPlayers] = useState([]);
  const [amountPaid, setAmountPaid] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTeamDetails = async () => {
      if (!tournamentId || !teamId) {
        // Do not proceed if tournamentId or teamId is not available
        setLoading(false);
        return;
      }

      try {
        const teamResponse = await axios.get(
          `/api/players/${esportsTitle}/tournament/${tournamentId}/registration/successful/${teamId}`
        );
        setTeamName(teamResponse.data.teamName);
        setAmountPaid(teamResponse.data.registrationFees);

        const playersResponse = await axios.get(
          `/api/players/${esportsTitle}/team/${teamId}/players`
        );

        // Extract the data
        const { createdByPlayer, players } = playersResponse.data;
        setCreatedByGamingAlias(createdByPlayer.gamingAlias);
        setPlayers(players.map((player) => player.gamingAlias));

        setLoading(false);
      } catch (error) {
        console.error("Error fetching team details:", error);
        setLoading(false);
      }
    };

    fetchTeamDetails();
  }, [tournamentId, esportsTitle, teamId]);

  return (
    <div className="players-tournament-registration-successful-page-wrapper">
      <PlayersNavigationBar />
      <div className="players-tournament-registration-successful-header">
        <h1 className="players-tournament-registration-successful-heading">
          Registration Successful
        </h1>
      </div>
      <div className="players-tournament-registration-successful-details">
        {loading ? (
          // Display a loading indicator
          <p>Loading...</p>
        ) : (
          // Display the team details once loading is complete
          <>
            <p className="players-tournament-registration-successful-label">
              Team Name: {teamName}
            </p>
            <p className="players-tournament-registration-successful-label">
              Captain: {createdByGamingAlias}
            </p>
            <p className="players-tournament-registration-successful-label">
              Players: {players.join(", ")}
            </p>
            <p className="players-tournament-registration-successful-label">
              Amount Paid: {amountPaid} LKR
            </p>
          </>
        )}
      </div>
      <div className="players-tournament-registration-successful-button-container">
        <Link
          to="/players/registrations"
          className="btn btn-success players-tournament-registration-successful-button"
        >
          Go to Registrations
        </Link>
      </div>
      <Footer />
    </div>
  );
}

export default PlayersTournamentRegistrationSuccessful;
