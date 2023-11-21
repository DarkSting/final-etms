import React, { useEffect, useState } from "react";
import { Container, Card, Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";
import axios from "../../../middleware/axios";
import PlayersNavigationBar from "../../../components/PlayersNavigationBar";
import Footer from "../../../components/Footer";
import "./PlayersTournaments.css";
import csGoImage from "../images/cs-go.jpg";
import dota2Image from "../images/dota-2.jpg";
import valorantImage from "../images/valorant.jpg";
import lolImage from "../images/lol.jpg";

function PlayerTournaments() {
  // State to store the selected esports title, list of past tournaments, and list of upcoming tournaments
  const [selectedEsportsTitle, setSelectedEsportsTitle] = useState("cs-go");
  const [pastTournaments, setPastTournaments] = useState([]);
  const [upcomingTournaments, setUpcomingTournaments] = useState([]);

  useEffect(() => {
    // Function to fetch player's tournaments
    const fetchPlayerTournaments = async () => {
      try {
        // Send a GET request to the server's '/api/players/${selectedEsportsTitle}/tournaments' endpoint
        const response = await axios.get(
          `/api/players/${selectedEsportsTitle}/tournaments`,
          {
            params: {
              selectedEsportsTitle,
            },
          }
        );

        // Update state with past and upcoming tournaments
        setPastTournaments(response.data.pastTournaments);
        setUpcomingTournaments(response.data.upcomingTournaments);
      } catch (error) {
        console.error("Error fetching player's tournaments:", error);
      }
    };

    // Call the function to fetch tournaments when the component mounts or when the selected title changes
    fetchPlayerTournaments();
  }, [selectedEsportsTitle]);

  return (
    <div className="players-tournaments-wrapper">
      {/* Players navigation bar component */}
      <PlayersNavigationBar />
      <Container>
        {/* Heading for the player tournaments section */}
        <h1 className="players-tournaments-heading">Player Tournaments</h1>
        {/* Dropdown to select the Esports title */}
        <select
          className="players-tournaments-tournament-dropdown"
          value={selectedEsportsTitle}
          onChange={(e) => setSelectedEsportsTitle(e.target.value)}
        >
          <option value="cs-go">CS:GO</option>
          <option value="dota-2">Dota 2</option>
          <option value="valorant">Valorant</option>
          <option value="lol">League of Legends</option>
        </select>
        {/* Subheading for upcoming tournaments */}
        <h2 className="players-tournaments-subheading">Upcoming Tournaments</h2>
        {/* Check if there are upcoming tournaments to display */}
        {upcomingTournaments.length === 0 ? (
          <p>No upcoming tournaments</p>
        ) : (
          // Display cards for each upcoming tournament
          <Row className="players-tournaments-card-container">
            {upcomingTournaments.map((tournament) => (
              <Col key={tournament._id} lg={4}>
                <Card
                  className="players-tournaments-tournament-card"
                  as={Link}
                  to={`/players/${selectedEsportsTitle}/tournament/${tournament._id}`}
                >
                  <div className="players-tournaments-card-content">
                    <Card.Title className="players-tournaments-card-title">
                      {tournament.tournamentName}
                    </Card.Title>
                    {/* Add tournament image based on the selectedEsportsTitle */}
                    <div
                      className="players-tournaments-card-image"
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
        )}
        {/* Subheading for past tournaments */}
        <h2 className="players-tournaments-subheading">Past Tournaments</h2>
        {/* Check if there are past tournaments to display */}
        {pastTournaments.length === 0 ? (
          <p>No past tournaments</p>
        ) : (
          // Display cards for each past tournament
          <Row className="players-tournaments-card-container">
            {pastTournaments.map((tournament) => (
              <Col key={tournament._id} lg={4}>
                <Card
                  className="players-tournaments-tournament-card"
                  as={Link}
                  to={`/players/${selectedEsportsTitle}/tournament/${tournament._id}`}
                >
                  <div className="players-tournaments-card-content">
                    <Card.Title className="players-tournaments-card-title">
                      {tournament.tournamentName}
                    </Card.Title>
                    {/* Add tournament image based on the selectedEsportsTitle */}
                    <div
                      className="players-tournaments-card-image"
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
        )}
      </Container>
      {/* Footer component */}
      <Footer />
    </div>
  );
}

export default PlayerTournaments;
