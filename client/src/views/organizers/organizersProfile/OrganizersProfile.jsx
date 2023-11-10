import React from "react";
import { Link } from "react-router-dom";
import { Card, Container, Row, Col } from "react-bootstrap";
import OrganizersNavigationBar from "../../../components/OrganizersNavigationBar";
import Footer from "../../../components/Footer";
import Lottie from "lottie-react";
import organizersProfileAnimation from "../animations/organizers-profile.json";
import "./OrganizersProfile.css";

function OrganizersProfile() {
  return (
    <div className="organizers-profile-wrapper">
      {/* Organizers navigation bar component */}
      <OrganizersNavigationBar />
      <Container fluid>
        <Row>
          <Col>
            {/* Heading */}
            <h1 className="organizers-profile-heading">Profile</h1>
            {/* Description */}
            <p className="organizers-profile-description">
              Here you can view and update your profile.
            </p>
          </Col>
        </Row>
        <Row>
          <Col>
            <div className="organizers-profile-cards-container">
              <Lottie
                animationData={organizersProfileAnimation}
                className="organizers-profile-animation"
              />
              {/* View profile card */}
              <Link
                to="/organizers/view-profile"
                className="organizers-profile-card"
                id="organizers-profile-view-profile-card"
              >
                <Card>
                  <Card.Body className="organizers-profile-card-body">
                    <Card.Title className="organizers-profile-card-title">
                      View Profile
                    </Card.Title>
                    <Card.Text className="organizers-profile-card-description">
                      Click here to view your profile
                    </Card.Text>
                  </Card.Body>
                </Card>
              </Link>
              {/* Edit profile card */}
              <Link
                to="/organizers/edit-profile"
                className="organizers-profile-card"
                id="organizers-profile-edit-profile-card"
              >
                <Card>
                  <Card.Body className="organizers-profile-card-body">
                    <Card.Title className="organizers-profile-card-title">
                      Edit Profile
                    </Card.Title>
                    <Card.Text className="organizers-profile-card-description">
                      Click here to update your profile
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

export default OrganizersProfile;
