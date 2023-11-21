import React, { useState } from "react";
import { Container, Form, Button, Dropdown, Alert } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import axios from "../../../middleware/axios";
import PlayersNavigationBar from "../../../components/PlayersNavigationBar";
import Footer from "../../../components/Footer";
import "./CounterStrikeGlobalOffensiveTeam.css";

function CounterStrikeGlobalOffensiveTeam() {
  // State for form fields
  const [teamName, setTeamName] = useState("");
  const [teamTag, setTeamTag] = useState("");
  const [teamDescription, setTeamDescription] = useState("");
  const [selectedClan, setSelectedClan] = useState("");
  const [validationError, setValidationError] = useState("");
  const navigate = useNavigate();

  // List of available clans
  const clans = [
    "Standalone Team",
    "Phoenix GaminG",
    "Xiphos Esports",
    "Maximum e-Sports",
    "Noob Alliance",
    "Tech Morph",
    "Wolfgang e-Sports",
    "EvoX E-Sports",
    "Legion Esports",
    "Union Gaming",
  ];

  // Handle form submit
  const handleFormSubmit = async (e) => {
    e.preventDefault();

    // Clear previous validation error
    setValidationError("");

    try {
      // Set the fixed value for Esports title
      const esportsTitle = "cs-go";

      // Send a POST request to the server's '/api/players/create-team/cs-go' endpoint
      const response = await axios.post("/api/players/create-team/cs-go", {
        esportsTitle,
        teamName,
        teamTag,
        teamDescription,
        selectedClan,
      });

      console.log(response.data);
      const teamId = response.data.teamId;

      // Handle successful team creation
      navigate(`/players/cs-go/team/${teamId}`);
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
    setTeamName("");
    setTeamTag("");
    setTeamDescription("");
    setSelectedClan("");
  };

  // Handle clan selection
  const handleClanSelection = (clan) => {
    setSelectedClan(clan);
  };

  return (
    <div className="create-team-wrapper">
      {/* Players navigation bar component */}
      <PlayersNavigationBar />
      <Container>
        {/* Heading */}
        <h1 className="create-team-heading">
          Create Counter-Strike: Global Offensive Team
        </h1>
        {/* Render an error message using the Alert component if a validation error exists */}
        {validationError && <Alert variant="danger">{validationError}</Alert>}
        <Form className="create-team-form" onSubmit={handleFormSubmit}>
          <h3 className="mb-3">Team Details</h3>
          {/* Team name */}
          <Form.Group controlId="teamName">
            <Form.Label>Team Name</Form.Label>
            <Form.Control
              type="text"
              value={teamName}
              onChange={(e) => setTeamName(e.target.value)}
            />
          </Form.Group>

          {/* Team tag */}
          <Form.Group controlId="teamTag">
            <Form.Label>Team Tag</Form.Label>
            <Form.Control
              type="text"
              value={teamTag}
              onChange={(e) => setTeamTag(e.target.value)}
            />
          </Form.Group>

          {/* Team description */}
          <Form.Group controlId="teamDescription">
            <Form.Label>Team Description</Form.Label>
            <Form.Control
              as="textarea"
              rows={2}
              value={teamDescription}
              onChange={(e) => setTeamDescription(e.target.value)}
            />
          </Form.Group>

          {/* Clan selection dropdown */}
          <Form.Group controlId="clanDropdown">
            <Form.Label className="mt-3">Choose Clan</Form.Label>
            <Dropdown>
              <Dropdown.Toggle variant="light">
                {selectedClan || "Select a Clan"}
              </Dropdown.Toggle>
              <Dropdown.Menu>
                {clans.map((clan, index) => (
                  <Dropdown.Item
                    key={`clan-${index}`}
                    onClick={() => handleClanSelection(clan)}
                  >
                    {clan}
                  </Dropdown.Item>
                ))}
              </Dropdown.Menu>
            </Dropdown>
          </Form.Group>

          {/* Create button */}
          <Button variant="secondary" type="submit" className="mt-4">
            Create Team
          </Button>
          {/* Reset button */}
          <Button
            variant="secondary"
            onClick={handleResetChanges}
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

export default CounterStrikeGlobalOffensiveTeam;
