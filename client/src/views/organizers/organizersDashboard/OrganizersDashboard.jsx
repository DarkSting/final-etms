import React from "react";
import { Link } from "react-router-dom";
import { Card, Container, Row, Col } from "react-bootstrap";
import OrganizersNavigationBar from "../../../components/OrganizersNavigationBar";
import Footer from "../../../components/Footer";
import Lottie from "lottie-react";
import organizersDashboardAnimation from "../animations/organizers-dashboard.json";
import "./OrganizersDashboard.css";

function OrganizersDashboard() {
  return (
    <div className="organizers-dashboard-wrapper">
      {/* Organizers navigation bar component */}
      <OrganizersNavigationBar />
      <Container fluid>
        <Row>
          <Col>
            {/* Dashboard heading */}
            <h1 className="organizers-dashboard-heading">Dashboard</h1>
            {/* Dashboard description */}
            <p className="organizers-dashboard-description">
              Welcome to your organizer dashboard! Here, you can manage your
              tournaments and your profile.
            </p>
          </Col>
        </Row>
        <Row>
          <Col>
            <div className="organizers-dashboard-cards-container">
              <Lottie
                animationData={organizersDashboardAnimation}
                className="organizers-dashboard-animation"
              />
              {/* Tournaments card */}
              <Link
                to="/organizers/tournaments"
                className="organizers-dashboard-card"
                id="organizers-dashboard-tournaments-card"
              >
                <Card>
                  <Card.Body className="organizers-dashboard-card-body">
                    <Card.Title className="organizers-dashboard-card-title">
                      Tournaments
                    </Card.Title>
                    <Card.Text className="organizers-dashboard-card-description">
                      Click here to create and manage your tournaments
                    </Card.Text>
                  </Card.Body>
                </Card>
              </Link>
              {/* Profile card */}
              <Link
                to="/organizers/profile"
                className="organizers-dashboard-card"
                id="organizers-dashboard-profile-card"
              >
                <Card>
                  <Card.Body className="organizers-dashboard-card-body">
                    <Card.Title className="organizers-dashboard-card-title">
                      Profile
                    </Card.Title>
                    <Card.Text className="organizers-dashboard-card-description">
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

export default OrganizersDashboard;
