import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import NavigationBar from "../../components/NavigationBar";
import Footer from "../../components/Footer";
import "./AboutUs.css";

function AboutUs() {
  return (
    <div className="about-wrapper">
      {/* Navigation bar component */}
      <NavigationBar />
      <Container fluid className="about-container">
        <Row>
          <Col>
            {/* Logo */}
            <div className="text-center">
              <img
                src="/lk-esports-logo.png"
                width="150"
                height="150"
                className="d-inline-block align-top"
                alt="LK Esports Logo"
              />
            </div>
            {/* About description */}
            <p className="about-description mt-5">
              Welcome to our Esports tournament management system! We are
              dedicated to transforming the Sri Lankan Esports industry with our
              specially tailored web application. Our platform offers a range of
              features designed to enhance the experience for both tournament
              organizers and Esports athletes.
            </p>
            <p className="about-description">
              Our system focuses on providing a streamlined registration and
              access process, effective tools for tournament management, and
              empowering Esports athletes to create teams, manage them, and
              participate in tournaments seamlessly. With improved tournament
              experiences, secure profile management, and easy online
              registration fee payments, we aim to contribute to the growth and
              success of the Esports industry in Sri Lanka.
            </p>
          </Col>
        </Row>
        <Row>
          <Col className="text-center mt-3">
            {/* Contact section */}
            <h2 className="contact-title">Contact Us</h2>
            <p className="contact-description">
              If you have any questions or feedback, please feel free to contact
              us. You can reach us through the following methods:
            </p>
            {/* Contact information */}
            <ul className="contact-list">
              <li>Email: lkesports@gmail.com</li>
              <li>Phone: +94 (77) 773-3568</li>
            </ul>
          </Col>
        </Row>
      </Container>
      {/* Footer component */}
      <Footer />
    </div>
  );
}

export default AboutUs;
