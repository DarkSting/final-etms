import React, { useState, useEffect } from "react";
import { Form, Button } from "react-bootstrap";
import { useParams } from "react-router-dom";
import axios from "../../../middleware/axios";
import OrganizersNavigationBar from "../../../components/OrganizersNavigationBar";
import Footer from "../../../components/Footer";
import "./TournamentRegistration.css";

function TournamentRegistration() {
  // Extract tournamentId and esportsTitle from URL parameters
  const { tournamentId, esportsTitle } = useParams();

  // State to manage start and end date inputs and registration status
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [registrationStatus, setRegistrationStatus] = useState(false);

  // Use useEffect to fetch current registration status when the component mounts
  useEffect(() => {
    const fetchCurrentRegistrationStatus = async () => {
      try {
        const response = await axios.get(
          `/api/organizers/${esportsTitle}/tournament/${tournamentId}/current-registration-status`
        );
        const {
          isRegistrationOpen,
          startDateRegistration,
          endDateRegistration,
        } = response.data;

        setRegistrationStatus(isRegistrationOpen);

        if (isRegistrationOpen) {
          // Set start and end dates if registration is open
          setStartDate(new Date(startDateRegistration));
          setEndDate(new Date(endDateRegistration));
        }
      } catch (error) {
        console.error("Error fetching current registration status:", error);
      }
    };

    fetchCurrentRegistrationStatus();
  }, [esportsTitle, tournamentId]);

  // Handle change in start date input
  const handleStartDateChange = (event) => {
    setStartDate(new Date(event.target.value));
  };

  // Handle change in end date input
  const handleEndDateChange = (event) => {
    setEndDate(new Date(event.target.value));
  };

  // Handle change in registration status
  const handleRegistrationStatusChange = () => {
    // Send a POST request to the server's '/api/organizers/${esportsTitle}/tournament/${tournamentId}/registration' endpoint
    axios
      .post(
        `/api/organizers/${esportsTitle}/tournament/${tournamentId}/registration`,
        {
          startDate,
          endDate,
          registrationStatus: !registrationStatus,
        }
      )
      .then((response) => {
        setRegistrationStatus(!registrationStatus);
      })
      .catch((error) => {
        console.error("Error updating registration status:", error);
      });
  };

  return (
    <div className="tournament-registration-wrapper">
      {/* Organizers navigation bar component */}
      <OrganizersNavigationBar />
      <div className="tournament-registration-header">
        {/* Heading */}
        <h1 className="tournament-registration-heading">
          Tournament Registration
        </h1>
      </div>
      <div className="tournament-registration-form">
        {/* Start date input */}
        <Form.Group>
          <Form.Label
            htmlFor="start-date"
            className="tournament-registration-label"
          >
            Start Date:
          </Form.Label>
          <Form.Control
            type="date"
            id="start-date"
            value={startDate.toISOString().substr(0, 10)}
            onChange={handleStartDateChange}
            className="tournament-registration-input"
          />
        </Form.Group>
        {/* End date input */}
        <Form.Group>
          <Form.Label
            htmlFor="end-date"
            className="tournament-registration-label"
          >
            End Date:
          </Form.Label>
          <Form.Control
            type="date"
            id="end-date"
            value={endDate.toISOString().substr(0, 10)}
            onChange={handleEndDateChange}
            className="tournament-registration-input"
          />
        </Form.Group>
        {/* Button to change registration status */}
        <Button
          variant="primary"
          onClick={handleRegistrationStatusChange}
          className="tournament-registration-button"
        >
          {registrationStatus ? "Close Registrations" : "Open Registrations"}
        </Button>
      </div>
      {/* Footer component */}
      <Footer />
    </div>
  );
}

export default TournamentRegistration;
