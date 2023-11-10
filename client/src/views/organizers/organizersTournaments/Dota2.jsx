import React, { useState } from "react";
import { Container, Form, Button, Alert } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import axios from "../../../middleware/axios";
import OrganizersNavigationBar from "../../../components/OrganizersNavigationBar";
import Footer from "../../../components/Footer";
import "./Dota2.css";

function Dota2() {
  // State for form fields
  const [tournamentName, setTournamentName] = useState("");
  const [tournamentDescription, setTournamentDescription] = useState("");
  const [registrationFees, setRegistrationFees] = useState(0);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [maxTeams, setMaxTeams] = useState("");
  const [isOnline, setIsOnline] = useState(false);
  const [tournamentLocation, setTournamentLocation] = useState("");
  const [tournamentFormat, setTournamentFormat] = useState("singleElimination");
  const [tournamentRules, setTournamentRules] = useState("");
  const [validationError, setValidationError] = useState("");
  const navigate = useNavigate();

  // Handle form submit
  const handleFormSubmit = async (e) => {
    e.preventDefault();

    // Clear previous validation error
    setValidationError("");

    try {
      // Set the fixed value for Esports title
      const esportsTitle = "dota-2";

      // Send a POST request to the server's '/api/organizers/create-tournament/dota-2' endpoint
      const response = await axios.post(
        "/api/organizers/create-tournament/dota-2",
        {
          esportsTitle,
          tournamentName,
          tournamentDescription,
          registrationFees,
          startDate,
          endDate,
          maxTeams,
          isOnline,
          tournamentLocation,
          tournamentFormat,
          tournamentRules,
        }
      );

      console.log(response.data);
      const tournamentId = response.data.tournamentId;

      // Handle successful tournament creation
      navigate(`/organizers/dota-2/tournament/${tournamentId}`);
    } catch (error) {
      if (error.response && error.response.data) {
        setValidationError(error.response.data.error);
      } else {
        setValidationError("An error occurred. Please try again.");
      }
    }
  };

  // Reset form changes
  const handleResetChanges = () => {
    setTournamentName("");
    setTournamentDescription("");
    setRegistrationFees(0);
    setStartDate("");
    setEndDate("");
    setMaxTeams("");
    setIsOnline(false);
    setTournamentLocation("");
    setTournamentFormat("");
    setTournamentRules("");
  };

  return (
    <div className="create-tournament-wrapper">
      {/* Organizers navigation bar component */}
      <OrganizersNavigationBar />
      <Container>
        {/* Heading */}
        <h1 className="create-tournament-heading">Create Dota 2 Tournament</h1>
        {/* Render an error message using the Alert component if a validation error exists */}
        {validationError && <Alert variant="danger">{validationError}</Alert>}
        <Form className="create-tournament-form" onSubmit={handleFormSubmit}>
          {/* Tournament name */}
          <Form.Group controlId="tournamentName">
            <Form.Label>Tournament Name</Form.Label>
            <Form.Control
              type="text"
              value={tournamentName}
              id="dota-2-tournament-name"
              onChange={(e) => setTournamentName(e.target.value)}
            />
          </Form.Group>

          {/* Tournament description */}
          <Form.Group controlId="tournamentDescription">
            <Form.Label>Tournament Description</Form.Label>
            <Form.Control
              as="textarea"
              rows={2}
              value={tournamentDescription}
              id="dota-2-tournament-description"
              onChange={(e) => setTournamentDescription(e.target.value)}
            />
          </Form.Group>

          {/* Tournament registration fees */}
          <Form.Group controlId="registrationFees" className="mt-3">
            <Form.Label>Registration Fees (LKR)</Form.Label>
            <Form.Control
              type="number"
              value={registrationFees}
              id="cs-go-tournament-registration-fees"
              onChange={(e) => setRegistrationFees(e.target.value)}
              required
            />
          </Form.Group>

          {/* Tournament start date */}
          <Form.Group controlId="startDate" className="mt-3">
            <Form.Label>Tournament Start Date</Form.Label>
            <Form.Control
              type="date"
              value={startDate}
              id="dota-2-tournament-start-date"
              onChange={(e) => setStartDate(e.target.value)}
            />
          </Form.Group>

          {/* Tournament end date */}
          <Form.Group controlId="endDate">
            <Form.Label>Tournament End Date</Form.Label>
            <Form.Control
              type="date"
              value={endDate}
              id="dota-2-tournament-end-date"
              onChange={(e) => setEndDate(e.target.value)}
            />
          </Form.Group>

          {/* Maximum teams allowed */}
          <Form.Group controlId="maxTeams">
            <Form.Label>Maximum Teams Allowed</Form.Label>
            <Form.Control
              type="number"
              value={maxTeams}
              id="dota-2-max-teams-allowed"
              onChange={(e) => setMaxTeams(e.target.value)}
            />
          </Form.Group>

          {/* Is the tournament held offline? */}
          <Form.Group controlId="isOnline" className="mt-3 mb-3">
            <Form.Check
              type="checkbox"
              label="Is the tournament held offline?"
              checked={isOnline}
              id="dota-2-is-tournament-held-offline"
              onChange={(e) => setIsOnline(e.target.checked)}
            />
          </Form.Group>

          {/* Tournament location (displayed only if isOnline is true) */}
          {isOnline && (
            <Form.Group controlId="tournamentLocation">
              <Form.Label>Tournament Location</Form.Label>
              <Form.Control
                type="text"
                value={tournamentLocation}
                id="dota-2-tournament-location"
                onChange={(e) => setTournamentLocation(e.target.value)}
              />
            </Form.Group>
          )}

          {/* Tournament rules */}
          <Form.Group controlId="tournamentRules">
            <Form.Label>Tournament Rules</Form.Label>
            <Form.Control
              as="textarea"
              rows={2}
              value={tournamentRules}
              id="dota-2-tournament-rules"
              onChange={(e) => setTournamentRules(e.target.value)}
            />
          </Form.Group>

          {/* Create button */}
          <Button
            variant="secondary"
            type="submit"
            id="dota-2-create-button"
            className="mt-3"
          >
            Create Tournament
          </Button>
          {/* Reset button */}
          <Button
            variant="secondary"
            onClick={handleResetChanges}
            id="dota-2-reset-button"
            className="mt-3"
          >
            Reset Changes
          </Button>
        </Form>
      </Container>
      {/* Footer component */}
      <Footer />
    </div>
  );
}

export default Dota2;
