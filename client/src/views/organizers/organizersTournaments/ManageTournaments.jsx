import React, { useEffect, useState } from "react";
import { Container, Card, Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";
import axios from "../../../middleware/axios";
import OrganizersNavigationBar from "../../../components/OrganizersNavigationBar";
import Footer from "../../../components/Footer";
import "./ManageTournaments.css";
import csGoImage from "../images/cs-go.jpg";
import dota2Image from "../images/dota-2.jpg";
import valorantImage from "../images/valorant.jpg";
import lolImage from "../images/lol.jpg";

function ManageTournaments() {
  // Set the default Esports title
  const defaultEsportsTitle = "cs-go";

  // State to manage the selected Esports title and tournament data
  const [selectedEsportsTitle, setSelectedEsportsTitle] =
    useState(defaultEsportsTitle);
  const [tournaments, setTournaments] = useState([]);

  // Fetch tournament data when the component mounts
  useEffect(() => {
    // Function to fetch organizer's tournaments
    const fetchOrganizerTournaments = async () => {
      try {
        // Send a GET request to the server's '/api/organizers/${selectedEsportsTitle}/manage-tournaments' endpoint
        const response = await axios.get(
          `/api/organizers/${selectedEsportsTitle}/manage-tournaments`
        );

        // Update the state with the fetched tournaments
        setTournaments(response.data.tournaments);
      } catch (error) {
        console.error("Error fetching organizer's tournaments:", error);
      }
    };

    // Call the function to fetch tournaments when the component mounts or when the selected title changes
    fetchOrganizerTournaments();
  }, [selectedEsportsTitle]);

  return (
    <div className="manage-tournaments-wrapper">
      {/* Organizers navigation bar component */}
      <OrganizersNavigationBar />
      <Container>
        {/* Heading */}
        <h1 className="manage-tournaments-heading">Manage Tournaments</h1>
        {/* Dropdown for selecting Esports title */}
        <select
          className="manage-tournaments-tournament-dropdown"
          value={selectedEsportsTitle}
          onChange={(e) => setSelectedEsportsTitle(e.target.value)}
        >
          <option value="cs-go">CS:GO</option>
          <option value="dota-2">Dota 2</option>
          <option value="valorant">Valorant</option>
          <option value="lol">League of Legends</option>
        </select>
        {/* Container for displaying tournament cards in a grid */}
        <Row className="manage-tournaments-card-container">
          {tournaments.map((tournament) => (
            <Col key={tournament._id} lg={4}>
              {/* Card for displaying tournament information */}
              <Card
                className="manage-tournaments-tournament-card"
                as={Link}
                to={`/organizers/${selectedEsportsTitle}/tournament/${tournament._id}`}
                id={`manage-tournaments-tournament-card`}
              >
                {/* Container for card content */}
                <div className="manage-tournaments-card-content">
                  <Card.Title className="manage-tournaments-card-title">
                    {tournament.tournamentName}
                  </Card.Title>
                  {/* Container for displaying tournament image */}
                  <div
                    className="manage-tournaments-card-image"
                    style={{
                      backgroundImage: `url(${
                        selectedEsportsTitle === "cs-go"
                          ? csGoImage
                          : selectedEsportsTitle === "dota-2"
                          ? dota2Image
                          : selectedEsportsTitle === "valorant"
                          ? valorantImage
                          : lolImage
                      })`,
                    }}
                  ></div>
                </div>
              </Card>
            </Col>
          ))}
        </Row>
      </Container>
      {/* Footer component */}
      <Footer />
    </div>
  );
}

export default ManageTournaments;
