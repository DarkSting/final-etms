import React, { useEffect, useState } from "react";
import { Container, Card, Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";
import axios from "../../../middleware/axios";
import PlayersNavigationBar from "../../../components/PlayersNavigationBar";
import Footer from "../../../components/Footer";
import "./ViewAndManageTeams.css";
import csGoImage from "../images/cs-go.jpg";
import dota2Image from "../images/dota-2.jpg";
import valorantImage from "../images/valorant.jpg";
import lolImage from "../images/lol.jpg";

function ViewAndManageTeams() {
  // Set the default values for filters
  const defaultFilter = "all";
  const defaultEsportsTitle = "cs-go";

  // State to manage the selected filter and Esports title
  const [selectedFilter, setSelectedFilter] = useState(defaultFilter);
  const [selectedEsportsTitle, setSelectedEsportsTitle] =
    useState(defaultEsportsTitle);
  const [teams, setTeams] = useState([]);

  // Fetch team data when the component mounts or when filters change
  useEffect(() => {
    // Function to fetch teams based on filters
    const fetchTeams = async () => {
      try {
        // Define the API endpoint based on filters
        let endpoint = `/api/players/${selectedEsportsTitle}/view-manage-teams/all`;

        if (selectedFilter === "opened") {
          endpoint = `/api/players/${selectedEsportsTitle}/view-manage-teams/opened`;
        } else if (selectedFilter === "joined") {
          endpoint = `/api/players/${selectedEsportsTitle}/view-manage-teams/joined`;
        } else if (selectedFilter === "createdByMe") {
          endpoint = `/api/players/${selectedEsportsTitle}/view-manage-teams/created-by-me`;
        }

        // Send a GET request to the server's endpoint
        const response = await axios.get(endpoint);

        // Update the state with the fetched teams
        setTeams(response.data.teams);
      } catch (error) {
        console.error("Error fetching teams:", error);
      }
    };

    // Call the function to fetch teams when the component mounts or when filters change
    fetchTeams();
  }, [selectedFilter, selectedEsportsTitle]);

  // Handle the change in the Esports title dropdown
  const handleEsportsTitleChange = (event) => {
    const newEsportsTitle = event.target.value;
    setSelectedEsportsTitle(newEsportsTitle); // Update the selectedEsportsTitle state
  };

  // Function to get the correct image based on the Esports title
  const getEsportsImage = () => {
    switch (selectedEsportsTitle) {
      case "cs-go":
        return csGoImage;
      case "dota-2":
        return dota2Image;
      case "valorant":
        return valorantImage;
      case "lol":
        return lolImage;
      default:
        return csGoImage;
    }
  };

  return (
    <div className="view-and-manage-teams-wrapper">
      {/* Players navigation bar component */}
      <PlayersNavigationBar />
      <Container>
        {/* Heading */}
        <h1 className="view-and-manage-teams-heading">View and Manage Teams</h1>
        {/* Filters */}
        <div className="view-and-manage-team-filters">
          {/* Dropdown for selecting filter */}
          <select
            className="view-and-manage-team-filter-dropdown"
            value={selectedFilter}
            onChange={(e) => setSelectedFilter(e.target.value)}
          >
            <option value="all">All Teams</option>
            <option value="opened">Opened Teams</option>
            <option value="joined">Joined</option>
            <option value="createdByMe">Created by Me</option>
          </select>
          {/* Dropdown for selecting Esports title */}
          <select
            className="view-and-manage-team-esports-dropdown"
            value={selectedEsportsTitle}
            onChange={handleEsportsTitleChange}
          >
            <option value="cs-go">CS:GO</option>
            <option value="dota-2">Dota 2</option>
            <option value="valorant">Valorant</option>
            <option value="lol">League of Legends</option>
          </select>
        </div>
        {/* Container for displaying tournament cards in a grid */}
        <Row className="view-and-manage-tournaments-card-container">
          {teams.length > 0 ? (
            teams.map((team) => (
              <Col key={team._id} lg={4}>
                {/* Card for displaying team information */}
                <Card
                  className="view-and-manage-tournaments-tournament-card"
                  as={Link}
                  to={
                    selectedFilter === "createdByMe"
                      ? `/players/${selectedEsportsTitle}/team/${team._id}`
                      : selectedFilter === "all"
                      ? `/players/${selectedEsportsTitle}/all/team/${team._id}`
                      : selectedFilter === "joined"
                      ? `/players/${selectedEsportsTitle}/joined/team/${team._id}`
                      : `/players/${selectedEsportsTitle}/opened/team/${team._id}`
                  }
                  id={`view-and-manage-tournaments-tournament-card`}
                >
                  {/* Container for card content */}
                  <div className="view-and-manage-tournaments-card-content">
                    <Card.Title className="view-and-manage-tournaments-card-title">
                      {team.teamName}
                    </Card.Title>
                    {/* Container for displaying tournament image */}
                    <div
                      className="view-and-manage-tournaments-card-image"
                      style={{
                        backgroundImage: `url(${getEsportsImage()})`,
                      }}
                    ></div>
                  </div>
                </Card>
              </Col>
            ))
          ) : (
            <Col lg={12}>
              <p>No teams available for the selected Esports title.</p>
            </Col>
          )}
        </Row>
      </Container>
      {/* Footer component */}
      <Footer />
    </div>
  );
}

export default ViewAndManageTeams;
