import React from "react";
import { Link } from "react-router-dom";
import { Card, Container, Row, Col } from "react-bootstrap";
import PlayersNavigationBar from "../../../components/PlayersNavigationBar";
import Footer from "../../../components/Footer";
import Lottie from "lottie-react";
import playersTeamsAnimation from "../animations/players-teams.json";
import "./PlayersTeams.css";

function PlayersTeams() {
  return (
    <div className="players-teams-wrapper">
      {/* Players navigation bar component */}
      <PlayersNavigationBar />
      <Container fluid>
        <Row>
          <Col>
            {/* Heading */}
            <h1 className="players-teams-heading">Teams</h1>
            {/* Description */}
            <p className="players-teams-description">
              Here you can create and manage your teams.
            </p>
          </Col>
        </Row>
        <Row>
          <Col>
            <div className="players-teams-cards-container">
              <Lottie
                animationData={playersTeamsAnimation}
                className="players-teams-animation"
              />
              {/* Create a new team card */}
              <Link to="/players/create-team" className="players-teams-card">
                <Card>
                  <Card.Body className="players-teams-card-body">
                    <Card.Title className="players-teams-card-title">
                      Create a New Team
                    </Card.Title>
                    <Card.Text className="players-profile-card-description">
                      Click here to create a new team
                    </Card.Text>
                  </Card.Body>
                </Card>
              </Link>
              {/* View and manage teams card */}
              <Link
                to="/players/view-manage-teams"
                className="players-teams-card"
              >
                <Card>
                  <Card.Body className="players-teams-card-body">
                    <Card.Title className="players-teams-card-title">
                      View and Manage Teams
                    </Card.Title>
                    <Card.Text className="players-profile-card-description">
                      Click here to view all teams and manage your teams
                    </Card.Text>
                  </Card.Body>
                </Card>
              </Link>
            </div>
          </Col>
        </Row>
      </Container>
      {/* Footer component */}
      <Footer />
    </div>
  );
}

export default PlayersTeams;
