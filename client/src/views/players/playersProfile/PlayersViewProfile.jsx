import React, { useState, useEffect } from "react";
import axios from "../../../middleware/axios";
import PlayersNavigationBar from "../../../components/PlayersNavigationBar";
import Footer from "../../../components/Footer";
import "./PlayersViewProfile.css";

function PlayersViewProfile() {
  // State to hold player details
  const [playerDetails, setPlayerDetails] = useState({
    fullName: "",
    gamingAlias: "",
    email: "",
    phone: "",
    description: "",
  });

  // Fetch player details when the component mounts
  useEffect(() => {
    fetchPlayerDetails();
  }, []);

  // Fetch player details from the back-end
  const fetchPlayerDetails = async () => {
    try {
      // Send a GET request to the server's '/api/players/view-profile' endpoint
      const response = await axios.get("/api/players/view-profile");
      setPlayerDetails(response.data.player);
    } catch (error) {
      console.error("Error fetching player details:", error);
    }
  };

  return (
    <div className="pvp-wrapper">
      {/* Players navigation bar component */}
      <PlayersNavigationBar />
      <div className="pvp-container">
        <div className="pvp-header">
          {/* Header section */}
          <div className="pvp-header-text">Your Profile</div>
          <div className="pvp-name">{playerDetails.fullName.split(" ")[0]}</div>
          <div className="pvp-username">@{playerDetails.username}</div>
        </div>
        <div className="pvp-details-container">
          {/* Display the players's full name */}
          <div id="players-view-profile-full-name" className="pvp-details">
            <div className="pvp-details-label">Full Name:</div>
            <div className="pvp-details-value">{playerDetails.fullName}</div>
          </div>
          {/* Display the players's gaming alias */}
          <div id="players-view-profile-gaming-alias" className="pvp-details">
            <div className="pvp-details-label">Gaming Alias:</div>
            <div className="pvp-details-value">{playerDetails.gamingAlias}</div>
          </div>
          {/* Display the players's email */}
          <div id="players-view-profile-email" className="pvp-details">
            <div className="pvp-details-label">Email:</div>
            <div className="pvp-details-value">{playerDetails.email}</div>
          </div>
          {/* Display the players's phone number */}
          <div id="players-view-profile-phone" className="pvp-details">
            <div className="pvp-details-label">Phone:</div>
            <div className="pvp-details-value">{playerDetails.phone}</div>
          </div>
          {/* Display the players's description */}
          <div id="players-view-profile-description" className="pvp-details">
            <div className="pvp-details-label">Description:</div>
            <div className="pvp-details-value">{playerDetails.description}</div>
          </div>
        </div>
      </div>
      {/* Footer component */}
      <Footer />
    </div>
  );
}

export default PlayersViewProfile;
