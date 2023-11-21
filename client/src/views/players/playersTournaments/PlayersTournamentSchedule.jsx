import React, { useState, useEffect } from "react";
import { Table } from "react-bootstrap";
import { useParams } from "react-router-dom";
import axios from "../../../middleware/axios";
import PlayersNavigationBar from "../../../components/PlayersNavigationBar";
import Footer from "../../../components/Footer";
import "../../organizers/organizersTournaments/TournamentSchedule.css";

function PlayersTournamentSchedule() {
  // Extract tournamentId and esportsTitle from URL parameters
  const { tournamentId, esportsTitle } = useParams();

  // State to manage match schedules
  const [matches, setMatches] = useState([]);

  // Function to format date strings
  const formatDate = (dateString) => {
    const options = { year: "numeric", month: "long", day: "numeric" };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  // Fetch match schedules
  useEffect(() => {
    const fetchSchedules = async () => {
      try {
        // Send a GET request to the server's
        // '/api/organizers/${esportsTitle}/tournament/${tournamentId}' endpoint
        const response = await axios.get(
          `/api/organizers/${esportsTitle}/tournament/${tournamentId}`
        );
        setMatches(response.data.schedules);
      } catch (error) {
        console.error("Error fetching schedules:", error);
      }
    };

    fetchSchedules();
  }, [tournamentId, esportsTitle]);

  return (
    <div className="tournament-schedule-wrapper">
      {/* Organizers navigation bar component */}
      <PlayersNavigationBar />
      <div className="tournament-schedule-list">
        {/* Match schedule heading */}
        <h2 className="tournament-schedule-heading">Match Schedule</h2>
        {/* Table to display match schedules */}
        <Table bordered responsive className="tournament-schedule-table">
          <thead>
            <tr>
              <th className="tournament-schedule-table-header">Teams</th>
              <th className="tournament-schedule-table-header">Date</th>
            </tr>
          </thead>
          <tbody>
            {matches.map((match, index) => (
              <tr key={index} className="tournament-schedule-table-row">
                <td className="tournament-schedule-table-cell">
                  {`${match.teamA} vs. ${match.teamB}`}
                </td>
                <td className="tournament-schedule-table-cell">
                  {`${formatDate(match.date)} at ${match.time}`}
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
      {/* Footer component */}
      <Footer />
    </div>
  );
}

export default PlayersTournamentSchedule;
