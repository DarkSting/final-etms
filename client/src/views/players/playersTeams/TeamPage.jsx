import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "../../../middleware/axios";
import PlayersNavigationBar from "../../../components/PlayersNavigationBar";
import Footer from "../../../components/Footer";
import "./TeamPage.css";

function TeamPage() {
  // Extract teamId and esportsTitle from URL parameters
  const { teamId, esportsTitle } = useParams();

  // State to hold team data
  const [teamData, setTeamData] = useState({
    team: {},
  });

  // Fetch team details when the component mounts
  useEffect(() => {
    // Send a GET request to the server's '/api/players/${esportsTitle}/team/${teamId}' endpoint
    axios
      .get(`/api/players/${esportsTitle}/team/${teamId}`)
      .then((response) => {
        setTeamData(response.data);
      })
      .catch((error) => {
        console.error("Error fetching team details:", error);
      });
  }, [teamId, esportsTitle]);

  return (
    <div className="team-page-wrapper">
      {/* Players navigation bar component */}
      <PlayersNavigationBar />
      <div className="team-page-header">
        {/* Display team name */}
        <h1 className="team-page-team-name">{teamData.team.teamName}</h1>
      </div>
      <div className="team-page-team-buttons-container">
        {/* Links to different team sections */}
        <Link
          to={`/players/${esportsTitle}/team/${teamId}/requests`}
          className="btn btn-secondary team-page-team-button"
        >
          Requests
        </Link>
        <Link
          to={`/players/${esportsTitle}/team/${teamId}/players`}
          className="btn btn-secondary team-page-team-button"
        >
          Players
        </Link>
      </div>
      <div className="team-page-team-details">
        {/* Display team details */}
        <p className="team-page-team-description">
          {teamData.team.teamDescription}
        </p>
        <p className="team-page-team-detail">
          Team tag: {teamData.team.teamTag}
        </p>
        <p className="team-page-team-detail">
          Associated clan: {teamData.team.selectedClan}
        </p>
      </div>
      {/* Footer component */}
      <Footer />
    </div>
  );
}

export default TeamPage;
