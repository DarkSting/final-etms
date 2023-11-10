import React from "react";
import { Container, Card, Row, Col } from "react-bootstrap";
import PlayersNavigationBar from "../../../components/PlayersNavigationBar";
import Footer from "../../../components/Footer";
import { Link } from "react-router-dom";
import "./ChooseTeamTitle.css";

function ChooseTeamTitle() {
  return (
    <div className="choose-team-title-wrapper">
      {/* Players navigation bar component */}
      <PlayersNavigationBar />
      <Container>
        {/* Heading */}
        <h1 className="choose-team-title-heading">Choose Team Title</h1>
        <Row className="card-container">
          {/* Card for Counter-Strike: Global Offensive */}
          <Col lg={4}>
            <Card
              className="title-card"
              as={Link}
              to="/players/create-team/cs-go"
            >
              <Card.Title>Counter-Strike: Global Offensive</Card.Title>
              <Card.Body className="card-image cs-go"></Card.Body>
            </Card>
          </Col>
          {/* Card for Dota 2 */}
          <Col lg={4}>
            <Card
              className="title-card"
              as={Link}
              to="/players/create-team/dota-2"
            >
              <Card.Title>Dota 2</Card.Title>
              <Card.Body className="card-image dota-2"></Card.Body>
            </Card>
          </Col>
          {/* Card for Valorant */}
          <Col lg={4}>
            <Card
              className="title-card"
              as={Link}
              to="/players/create-team/valorant"
            >
              <Card.Title>Valorant</Card.Title>
              <Card.Body className="card-image valorant"></Card.Body>
            </Card>
          </Col>
          {/* Card for League of Legends */}
          <Col lg={4}>
            <Card
              className="title-card mb-5"
              as={Link}
              to="/players/create-team/lol"
            >
              <Card.Title>League of Legends</Card.Title>
              <Card.Body className="card-image lol"></Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
      {/* Footer component */}
      <Footer />
    </div>
  );
}

export default ChooseTeamTitle;
