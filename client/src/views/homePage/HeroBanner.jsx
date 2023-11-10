import React from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import "./HeroBanner.css";

function HeroBanner() {
  return (
    <div className="hero-banner">
      <Container>
        <Row>
          <Col xs={12} className="text-center">
            {/* Hero title */}
            <h1 className="hero-title">LK Esports</h1>
            {/* Hero description */}
            <p className="hero-description">
              Here, you can manage your tournaments, teams, and players.
            </p>
            {/* Learn more button */}
            <p>
              <Link to="/about-us">
                <Button
                  className="btn btn-light btn-lg hero-button"
                  id="home-hero-learn-more-button"
                >
                  Learn more
                </Button>
              </Link>
            </p>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default HeroBanner;
