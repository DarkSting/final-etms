import React, { useState } from "react";
import { Container, Form, Button, Dropdown } from "react-bootstrap";
import PlayersNavigationBar from "../../../components/PlayersNavigationBar";
import Footer from "../../../components/Footer";
import "./Dota2Team.css";

function Dota2Team() {
  // State for form fields
  const [teamName, setTeamName] = useState("");
  const [teamTag, setTeamTag] = useState("");
  const [teamDescription, setTeamDescription] = useState("");
  const [selectedClan, setSelectedClan] = useState("");

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
  const handleFormSubmit = (e) => {
    e.preventDefault();
    console.log("Creating team with the following details:");
    console.log("Team Name:", teamName);
    console.log("Team Tag:", teamTag);
    console.log("Team Description:", teamDescription);
    console.log("Selected Clan:", selectedClan);
    console.log("Captain (Current User):", "Replace with current user data");
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
        <h1 className="create-team-heading">Create Dota 2 Team</h1>
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

export default Dota2Team;
