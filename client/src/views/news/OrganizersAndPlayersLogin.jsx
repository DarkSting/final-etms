import React from "react";
import { Row, Col, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import Lottie from "lottie-react";
import NavigationBar from "../../components/NavigationBar";
import Footer from "../../components/Footer";
import organizersAnimation from "./animations/organizers.json";
import playersAnimation from "./animations/players.json";
import "./OrganizersAndPlayersLogin.css";

function OrganizersAndPlayersLogin() {
  return (
    <div className="organizers-players-login-container">
      {/* Navigation bar component */}
      <NavigationBar />
      <div className="organizers-players-login-content">
        <h2 className="organizers-players-login-login-heading">
          Please Login as an Organizer or Player
        </h2>
        <p className="organizers-players-login-login-sub-heading">
          Login to access news about your favorite Esports title.
        </p>
        <Row>
          <Col className="organizers-players-login-organizers-login-section d-flex align-items-center">
            {/* Organizers login section on the left */}
            <div>
              <Lottie
                animationData={organizersAnimation}
                className="organizers-players-login-animation-container"
              />
              <Link to="/organizers/login">
                <Button className="btn btn-secondary organizers-players-login-btn-responsive">
                  Login as Organizer
                </Button>
              </Link>
            </div>
          </Col>
          <Col className="organizers-players-login-players-login-section d-flex align-items-center">
            {/* Players login section on the right */}
            <div>
              <Lottie
                animationData={playersAnimation}
                className="organizers-players-login-animation-container"
              />
              <Link to="/players/login">
                <Button className="btn btn-secondary organizers-players-login-btn-responsive">
                  Login as Player
                </Button>
              </Link>
            </div>
          </Col>
        </Row>
      </div>
      {/* Footer component */}
      <Footer />
    </div>
  );
}

export default OrganizersAndPlayersLogin;
