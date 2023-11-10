import React from "react";
import { Link } from "react-router-dom";
import { Card, Container, Row, Col } from "react-bootstrap";
import OrganizersNavigationBar from "../../../components/OrganizersNavigationBar";
import Footer from "../../../components/Footer";
import Lottie from "lottie-react";
import organizersTournamentsAnimation from "../animations/organizers-tournaments.json";
import "./OrganizersTournaments.css";

function OrganizersTournaments() {
  return (
    <div className="organizers-tournaments-wrapper">
      {/* Organizers navigation bar component */}
      <OrganizersNavigationBar />
      <Container fluid>
        <Row>
          <Col>
            {/* Heading */}
            <h1 className="organizers-tournaments-heading">Tournaments</h1>
            {/* Description */}
            <p className="organizers-tournaments-description">
              Here you can create and manage your tournaments.
            </p>
          </Col>
        </Row>
        <Row>
          <Col>
            <div className="organizers-tournaments-cards-container">
              <Lottie
                animationData={organizersTournamentsAnimation}
                className="organizers-tournaments-animation"
              />
              {/* Create a new tournament card */}
              <Link
                to="/organizers/create-tournament"
                className="organizers-tournaments-card"
                id="organizers-tournaments-create-tournament-card"
              >
                <Card>
                  <Card.Body className="organizers-tournaments-card-body">
                    <Card.Title className="organizers-tournaments-card-title">
                      Create a New Tournament
                    </Card.Title>
                    <Card.Text className="organizers-tournaments-card-description">
                      Click here to create a new tournament
                    </Card.Text>
                  </Card.Body>
                </Card>
              </Link>
              {/* Manage tournaments card */}
              <Link
                to="/organizers/manage-tournaments"
                className="organizers-profile-card"
                id="organizers-tournaments-manage-tournaments-card"
              >
                <Card>
                  <Card.Body className="organizers-tournaments-card-body">
                    <Card.Title className="organizers-tournaments-card-title">
                      Manage Tournaments
                    </Card.Title>
                    <Card.Text className="organizers-tournaments-card-description">
                      Click here to manage your tournaments
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

export default OrganizersTournaments;
