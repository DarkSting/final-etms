import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "../../../middleware/axios";
import PlayersNavigationBar from "../../../components/PlayersNavigationBar";
import Footer from "../../../components/Footer";
import "./PlayersTournamentPage.css";

function PlayersTournamentPage() {
  // Extract tournamentId and esportsTitle from URL parameters
  const { tournamentId, esportsTitle } = useParams();

  // State to hold tournament data and schedules
  const [tournamentData, setTournamentData] = useState({
    tournament: {},
    schedules: [],
  });

  // Fetch tournament details when the component mounts
  useEffect(() => {
    // Send a GET request to the server's '/api/organizers/${esportsTitle}/tournament/${tournamentId}' endpoint
    axios
      .get(`/api/organizers/${esportsTitle}/tournament/${tournamentId}`)
      .then((response) => {
        setTournamentData(response.data);
      })
      .catch((error) => {
        console.error("Error fetching tournament details:", error);
      });
  }, [tournamentId, esportsTitle]);

  // Format date to a more readable format
  const formatDate = (date) => {
    const options = { year: "numeric", month: "long", day: "numeric" };
    return new Date(date).toLocaleDateString(undefined, options);
  };

  // Map tournament format to a more readable format
  const formatTournamentFormat = (format) => {
    switch (format) {
      case "singleElimination":
        return "Single elimination";
      case "doubleElimination":
        return "Double elimination";
      case "roundRobin":
        return "Round robin";
      default:
        return "Unknown format";
    }
  };

  return (
    <div className="tournament-page-wrapper">
      {/* Players navigation bar component */}
      <PlayersNavigationBar />
      <div className="tournament-page-header">
        {/* Display tournament name */}
        <h1 className="tournament-page-tournament-name">
          {tournamentData.tournament.tournamentName}
        </h1>
      </div>
      <div className="tournament-page-tournament-buttons-container">
        {/* Links to different tournament sections */}
        <Link
          to={`/players/${esportsTitle}/tournament/${tournamentId}/registration`}
          className="btn btn-secondary tournament-page-tournament-button"
        >
          Registration
        </Link>
        <Link
          to={`/players/${esportsTitle}/tournament/${tournamentId}/brackets`}
          className="btn btn-secondary tournament-page-tournament-button"
        >
          Brackets
        </Link>
        <Link
          to={`/players/${esportsTitle}/tournament/${tournamentId}/schedule`}
          className="btn btn-secondary tournament-page-tournament-button"
        >
          Schedule
        </Link>
      </div>
      <div className="tournament-page-tournament-details">
        {/* Display tournament details */}
        <p className="tournament-page-tournament-description">
          {tournamentData.tournament.tournamentDescription}
        </p>
        <p className="tournament-page-tournament-detail">
          Start date: {formatDate(tournamentData.tournament.startDate)}
        </p>
        <p className="tournament-page-tournament-detail">
          End date: {formatDate(tournamentData.tournament.endDate)}
        </p>
        <p className="tournament-page-tournament-detail">
          Maximum teams allowed: {tournamentData.tournament.maxTeams}
        </p>
        <p className="tournament-page-tournament-detail">
          Tournament location: {tournamentData.tournament.tournamentLocation}
        </p>
        <p className="tournament-page-tournament-detail">
          Tournament format:{" "}
          {formatTournamentFormat(tournamentData.tournament.tournamentFormat)}
        </p>
        <p className="tournament-page-tournament-detail">
          Tournament rules: {tournamentData.tournament.tournamentRules}
        </p>
      </div>
      {/* Footer component */}
      <Footer />
    </div>
  );
}

export default PlayersTournamentPage;
