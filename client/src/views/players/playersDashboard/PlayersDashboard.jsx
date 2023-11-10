import React from "react";
import { Link } from "react-router-dom";
import { Card, Container, Row, Col } from "react-bootstrap";
import PlayersNavigationBar from "../../../components/PlayersNavigationBar";
import Footer from "../../../components/Footer";
import Lottie from "lottie-react";
import playersDashboardAnimation from "../animations/players-dashboard.json";
import "./PlayersDashboard.css";

function PlayersDashboard() {
  return (
    <div className="players-dashboard-wrapper">
      {/* Players navigation bar component */}
      <PlayersNavigationBar />
      <Container fluid>
        <Row>
          <Col>
            {/* Dashboard heading */}
            <h1 className="players-dashboard-heading">Dashboard</h1>
            {/* Dashboard description */}
            <p className="players-dashboard-description">
              Welcome to your player dashboard! Here you can participate in
              tournaments, manage your teams, and more.
            </p>
          </Col>
        </Row>
        <Row>
          <Col>
            <div className="players-dashboard-cards-container">
              <Lottie
                animationData={playersDashboardAnimation}
                className="players-dashboard-animation"
              />
              {/* Tournaments card */}
              <Link
                to="/players/tournaments"
                className="players-dashboard-card"
                id="players-dashboard-tournaments-card"
              >
                <Card>
                  <Card.Body className="players-dashboard-card-body">
                    <Card.Title className="players-dashboard-card-title">
                      Tournaments
                    </Card.Title>
                    <Card.Text className="players-dashboard-card-description">
                      Click here to participate in tournaments
                    </Card.Text>
                  </Card.Body>
                </Card>
              </Link>
              {/* Teams card */}
              <Link
                to="/players/teams"
                className="players-dashboard-card"
                id="players-dashboard-teams-card"
              >
                <Card>
                  <Card.Body className="players-dashboard-card-body">
                    <Card.Title className="players-dashboard-card-title">
                      Teams
                    </Card.Title>
                    <Card.Text className="players-dashboard-card-description">
                      Click here to create and manage your teams
                    </Card.Text>
                  </Card.Body>
                </Card>
              </Link>
              {/* Registrations card */}
              <Link
                to="/players/registrations"
                className="players-dashboard-card"
                id="players-dashboard-registrations-card"
              >
                <Card>
                  <Card.Body className="players-dashboard-card-body">
                    <Card.Title className="players-dashboard-card-title">
                      Registrations
                    </Card.Title>
                    <Card.Text className="players-dashboard-card-description">
                      Click here to view your tournament registrations
                    </Card.Text>
                  </Card.Body>
                </Card>
              </Link>
              {/* Profile card */}
              <Link
                to="/players/profile"
                className="players-dashboard-card"
                id="players-dashboard-profile-card"
              >
                <Card>
                  <Card.Body className="players-dashboard-card-body">
                    <Card.Title className="players-dashboard-card-title">
                      Profile
                    </Card.Title>
                    <Card.Text className="players-dashboard-card-description">
                      Click here to view and update your profile
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

export default PlayersDashboard;
