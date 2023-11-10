import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "../../../middleware/axios";
import PlayersNavigationBar from "../../../components/PlayersNavigationBar";
import Footer from "../../../components/Footer";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./TeamPage.css";

function TeamPageOpenedTeamsView() {
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

  // Function to handle sending a join team request
  const handleJoinTeam = async () => {
    try {
      // Send a POST request to the server's '/api/players/${esportsTitle}/opened/team/${teamId}/send-team-request' endpoint
      const response = await axios.post(
        `/api/players/${esportsTitle}/opened/team/${teamId}/send-team-request`
      );

      if (response.status === 200) {
        // Display success toast
        toast.success("Request sent successfully!");
      } else {
        // Display error toast
        toast.error("Failed to send request. Please try again.");
      }
    } catch (error) {
      console.error("Error sending join request:", error);
      // Display error toast
      toast.error("Failed to send request. Please try again.");
    }
  };

  return (
    <div className="team-page-wrapper">
      {/* Players navigation bar component */}
      <PlayersNavigationBar />
      <div className="team-page-header">
        {/* Display team name */}
        <h1 className="team-page-team-name">{teamData.team.teamName}</h1>
        {/* Join team button */}
        <button
          onClick={handleJoinTeam}
          className="btn btn-success team-page-join-team-button"
        >
          Join Team
        </button>
      </div>
      <div className="team-page-team-buttons-container">
        {/* Link to players section */}
        <Link
          to={`/players/${esportsTitle}/opened/team/${teamId}/players`}
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
      {/* Add ToastContainer */}
      <ToastContainer />
      {/* Footer component */}
      <Footer />
    </div>
  );
}

export default TeamPageOpenedTeamsView;
