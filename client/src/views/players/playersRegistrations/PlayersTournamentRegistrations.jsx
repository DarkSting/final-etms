import React, { useEffect, useState } from "react";
import { Container, Card, Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";
import axios from "../../../middleware/axios";
import PlayersNavigationBar from "../../../components/PlayersNavigationBar";
import Footer from "../../../components/Footer";
import "./PlayersTournamentRegistrations.css";
import csGoImage from "../images/cs-go.jpg";
import dota2Image from "../images/dota-2.jpg";
import valorantImage from "../images/valorant.jpg";
import lolImage from "../images/lol.jpg";

function PlayersTournamentRegistrations() {
  const [selectedEsportsTitle, setSelectedEsportsTitle] = useState("cs-go");
  const [tournamentRegistrations, setTournamentRegistrations] = useState([]);

  useEffect(() => {
    const fetchTournamentRegistrations = async () => {
      try {
        const response = await axios.get(
          `/api/players/${selectedEsportsTitle}/registrations`,
          {
            params: {
              selectedEsportsTitle,
            },
          }
        );
        setTournamentRegistrations(response.data.tournaments || []);
      } catch (error) {
        console.error("Error fetching tournament registrations:", error);
      }
    };

    fetchTournamentRegistrations();
  }, [selectedEsportsTitle]);

  return (
    <div className="players-tournament-registrations-wrapper">
      <PlayersNavigationBar />
      <Container>
        <h1 className="players-tournaments-heading">
          Your Tournament Registrations
        </h1>
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

        {tournamentRegistrations.length === 0 ? (
          <p>No tournament registrations</p>
        ) : (
          <Row className="players-tournaments-card-container">
            {tournamentRegistrations.map((registration) => (
              <Col key={registration._id} lg={4}>
                <Card
                  className="players-tournaments-tournament-card"
                  as={Link}
                  to={`/players/${selectedEsportsTitle}/tournament/${registration._id}`}
                >
                  <div className="players-tournaments-card-content">
                    <Card.Title className="players-tournaments-card-title">
                      {registration.tournamentName}
                    </Card.Title>
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
      <Footer />
    </div>
  );
}

export default PlayersTournamentRegistrations;
