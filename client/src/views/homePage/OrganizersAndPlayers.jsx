import React from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import Lottie from "lottie-react";
import organizersAnimation from "./animations/organizers.json";
import playersAnimation from "./animations/players.json";
import clansAnimation from "./animations/clans.json";
import newsAnimation from "./animations/news.json";
import "./OrganizersAndPlayers.css";

function OrganizersAndPlayers() {
  return (
    <Container fluid className="mt-0">
      <Row>
        <Col className="organizers-section d-flex align-items-center">
          {/* Organizers section on the left */}
          <div>
            <h2>Organizers</h2>
            <p>
              Are you an Esports tournament organizer? Join our community of
              organizers and take your Esports management to the next level!
            </p>
            <Lottie
              animationData={organizersAnimation}
              className="animation-container"
            />
            <div className="d-flex">
              <Link to="/organizers/register">
                <Button
                  className="btn btn-secondary me-4 btn-responsive"
                  id="home-organizers-register-button"
                >
                  Register as Organizer
                </Button>
              </Link>
              <Link to="/organizers/login">
                <Button
                  className="btn btn-secondary btn-responsive"
                  id="home-organizers-login-button"
                >
                  Login as Organizer
                </Button>
              </Link>
            </div>
          </div>
        </Col>
        <Col className="players-section d-flex align-items-center">
          {/* Players section on the right */}
          <div>
            <h2>Players</h2>
            <p>
              Are you a passionate Esports player looking for the perfect
              tournament? Join our Esports community and showcase your skills!
            </p>
            <Lottie
              animationData={playersAnimation}
              className="animation-container"
            />
            <div className="d-flex">
              <Link to="/players/register">
                <Button
                  className="btn btn-secondary me-4 btn-responsive"
                  id="home-players-register-button"
                >
                  Register as <span className="btn-player-text">Player</span>
                </Button>
              </Link>
              <Link to="/players/login">
                <Button
                  className="btn btn-secondary btn-responsive"
                  id="home-players-login-button"
                >
                  Login as <span className="btn-player-text">Player</span>
                </Button>
              </Link>
            </div>
          </div>
        </Col>
      </Row>

      <Row>
        <Col className="teams-section d-flex align-items-center">
          {/* Teams section on the left */}
          <div>
            <h2>Teams</h2>
            <p>
              Are you part of a dedicated Esports team ready to dominate the
              competition? Join our thriving Esports community and elevate your
              team's performance to new heights!
            </p>
            <Lottie
              animationData={clansAnimation}
              className="animation-container"
            />
            <div className="d-flex">
              <Link to="/teams">
                <Button
                  className="btn btn-secondary me-4 btn-responsive"
                  id="home-teams-view-button"
                >
                  View Teams
                </Button>
              </Link>
            </div>
          </div>
        </Col>
        <Col className="news-section d-flex align-items-center">
          {/* News section on the right */}
          <div>
            <h2>News</h2>
            <p>
              Stay up-to-date with the latest news and updates of your favorite
              Esports title, and immerse yourself in the exciting world of
              competitive gaming!
            </p>
            <Lottie
              animationData={newsAnimation}
              className="animation-container"
            />
            <div className="d-flex">
              <Link to="/news/counter-strike">
                <Button
                  className="btn btn-secondary btn-responsive"
                  id="home-news-read-button"
                >
                  Read News
                </Button>
              </Link>
            </div>
          </div>
        </Col>
      </Row>
    </Container>
  );
}

export default OrganizersAndPlayers;
