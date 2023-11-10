import React from "react";
import { Container, Card, Row, Col } from "react-bootstrap";
import OrganizersNavigationBar from "../../../components/OrganizersNavigationBar";
import Footer from "../../../components/Footer";
import { Link } from "react-router-dom";
import "./ChooseTitle.css";

function ChooseTitle() {
  return (
    <div className="choose-title-wrapper">
      {/* Organizers navigation bar component */}
      <OrganizersNavigationBar />
      <Container>
        {/* Heading */}
        <h1 className="choose-title-heading">Choose Esports Title</h1>
        <Row className="choose-title-card-container">
          {/* Card for Counter-Strike: Global Offensive */}
          <Col lg={4}>
            <Card
              className="choose-title-title-card"
              as={Link}
              to="/organizers/create-tournament/cs-go"
              id="choose-title-cs-go-card"
            >
              <Card.Title>Counter-Strike: Global Offensive</Card.Title>
              <Card.Body className="choose-title-card-image choose-title-cs-go"></Card.Body>
            </Card>
          </Col>
          {/* Card for Dota 2 */}
          <Col lg={4}>
            <Card
              className="choose-title-title-card"
              as={Link}
              to="/organizers/create-tournament/dota-2"
              id="choose-title-dota-2-card"
            >
              <Card.Title>Dota 2</Card.Title>
              <Card.Body className="choose-title-card-image choose-title-dota-2"></Card.Body>
            </Card>
          </Col>
          {/* Card for Valorant */}
          <Col lg={4}>
            <Card
              className="choose-title-title-card"
              as={Link}
              to="/organizers/create-tournament/valorant"
              id="choose-title-valorant-card"
            >
              <Card.Title>Valorant</Card.Title>
              <Card.Body className="choose-title-card-image choose-title-valorant"></Card.Body>
            </Card>
          </Col>
          {/* Card for League of Legends */}
          <Col lg={4}>
            <Card
              className="choose-title-title-card mb-5"
              as={Link}
              to="/organizers/create-tournament/lol"
              id="choose-title-lol-card"
            >
              <Card.Title>League of Legends</Card.Title>
              <Card.Body className="choose-title-card-image choose-title-lol"></Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
      {/* Footer component */}
      <Footer />
    </div>
  );
}

export default ChooseTitle;
