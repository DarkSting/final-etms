import React from "react";
import { Link } from "react-router-dom";
import { Card, Container, Row, Col } from "react-bootstrap";
import PlayersNavigationBar from "../../../components/PlayersNavigationBar";
import Footer from "../../../components/Footer";
import Lottie from "lottie-react";
import playersProfileAnimation from "../animations/players-profile.json";
import "./PlayersProfile.css";

function PlayersProfile() {
  return (
    <div className="players-profile-wrapper">
      {/* Players navigation bar component */}
      <PlayersNavigationBar />
      <Container fluid>
        <Row>
          <Col>
            {/* Heading */}
            <h1 className="players-profile-heading">Profile</h1>
            {/* Description */}
            <p className="players-profile-description">
              Here you can view and update your profile.
            </p>
          </Col>
        </Row>
        <Row>
          <Col>
            <div className="players-profile-cards-container">
              <Lottie
                animationData={playersProfileAnimation}
                className="players-profile-animation"
              />
              {/* View profile card */}
              <Link
                to="/players/view-profile"
                className="players-profile-card"
                id="players-profile-view-profile-card"
              >
                <Card>
                  <Card.Body className="players-profile-card-body">
                    <Card.Title className="players-profile-card-title">
                      View Profile
                    </Card.Title>
                    <Card.Text className="players-profile-card-description">
                      Click here to view your profile
                    </Card.Text>
                  </Card.Body>
                </Card>
              </Link>
              {/* Edit profile card */}
              <Link
                to="/players/edit-profile"
                className="players-profile-card"
                id="players-profile-edit-profile-card"
              >
                <Card>
                  <Card.Body className="players-profile-card-body">
                    <Card.Title className="players-profile-card-title">
                      Edit Profile
                    </Card.Title>
                    <Card.Text className="players-profile-card-description">
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

export default PlayersProfile;
