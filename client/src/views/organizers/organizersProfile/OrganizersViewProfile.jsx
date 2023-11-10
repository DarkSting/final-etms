import React, { useState, useEffect } from "react";
import axios from "../../../middleware/axios";
import OrganizersNavigationBar from "../../../components/OrganizersNavigationBar";
import Footer from "../../../components/Footer";
import "./OrganizersViewProfile.css";

function OrganizersViewProfile() {
  // State to hold organizer details
  const [organizerDetails, setOrganizerDetails] = useState({
    fullName: "",
    organizationName: "",
    email: "",
    phone: "",
    description: "",
  });

  // Fetch organizer details when the component mounts
  useEffect(() => {
    fetchOrganizerDetails();
  }, []);

  // Fetch organizer details from the back-end
  const fetchOrganizerDetails = async () => {
    try {
      // Send a GET request to the server's '/api/organizers/view-profile' endpoint
      const response = await axios.get("/api/organizers/view-profile");
      setOrganizerDetails(response.data.organizer);
    } catch (error) {
      console.error("Error fetching organizer details:", error);
    }
  };

  return (
    <div className="ovp-wrapper">
      {/* Organizers navigation bar component */}
      <OrganizersNavigationBar />
      <div className="ovp-container">
        <div className="ovp-header">
          {/* Header section */}
          <div className="ovp-header-text">Your Profile</div>
          <div className="ovp-name">
            {organizerDetails.fullName.split(" ")[0]}
          </div>
          <div className="ovp-username">@{organizerDetails.username}</div>
        </div>
        <div className="ovp-details-container">
          {/* Display the organizer's full name */}
          <div id="organizers-view-profile-full-name" className="ovp-details">
            <div className="ovp-details-label">Full Name:</div>
            <div className="ovp-details-value">{organizerDetails.fullName}</div>
          </div>
          {/* Display the organization name */}
          <div
            id="organizers-view-profile-organization-name"
            className="ovp-details"
          >
            <div className="ovp-details-label">Organization Name:</div>
            <div className="ovp-details-value">
              {organizerDetails.organizationName}
            </div>
          </div>
          {/* Display the organizer's email */}
          <div id="organizers-view-profile-email" className="ovp-details">
            <div className="ovp-details-label">Email:</div>
            <div className="ovp-details-value">{organizerDetails.email}</div>
          </div>
          {/* Display the organizer's phone number */}
          <div id="organizers-view-profile-phone" className="ovp-details">
            <div className="ovp-details-label">Phone:</div>
            <div className="ovp-details-value">{organizerDetails.phone}</div>
          </div>
          {/* Display the organizer's description */}
          <div id="organizers-view-profile-description" className="ovp-details">
            <div className="ovp-details-label">Description:</div>
            <div className="ovp-details-value">
              {organizerDetails.description}
            </div>
          </div>
        </div>
      </div>
      {/* Footer component */}
      <Footer />
    </div>
  );
}

export default OrganizersViewProfile;
