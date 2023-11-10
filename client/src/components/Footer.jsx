import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import "./Footer.css";

function Footer() {
  return (
    <footer className="footer-container">
      <Container>
        <Row>
          <Col md={12}>
            {/* Footer heading */}
            <h4>LK Esports</h4>
            {/* Footer description */}
            <p>
              An online platform for organizing and participating in Sri Lankan
              Esports tournaments
            </p>
            <br />
            {/* Footer copyright */}
            <p>&copy; 2023 LK Esports - All Rights Reserved</p>
          </Col>
        </Row>
      </Container>
    </footer>
  );
}

export default Footer;
