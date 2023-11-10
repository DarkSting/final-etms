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
              Welcome to our Esports tournament management system! Lorem ipsum
              dolor sit amet, consectetur adipiscing elit. Nulla sodales
              tristique mi, non hendrerit lectus cursus at. Integer vitae
              vehicula dolor, in tempus odio. Morbi vestibulum consequat dolor,
              id sollicitudin libero dignissim sit amet. Ut id dapibus risus.
              Nunc vitae lectus sit amet mauris cursus fermentum. Vivamus a orci
              et quam dictum rutrum. Vestibulum pulvinar libero ac mi placerat,
              at dapibus turpis facilisis. Suspendisse ut purus ipsum.
              Pellentesque vel tincidunt elit. Vestibulum tempor sapien libero,
              nec tincidunt orci varius sed.
            </p>
            <p className="about-description">
              Etiam consequat augue eu massa ullamcorper, vel blandit neque
              scelerisque. Nulla bibendum eros et ullamcorper vehicula. Cras
              mattis aliquam libero, vitae venenatis turpis volutpat id. Sed
              pharetra euismod aliquam. In vitae odio at urna consequat
              interdum. Vestibulum facilisis ullamcorper orci ut ultrices. In
              hac habitasse platea dictumst. Pellentesque habitant morbi
              tristique senectus et netus et malesuada fames ac turpis egestas.
              Praesent vehicula a lacus ut efficitur. In vel libero ac enim
              facilisis volutpat at vitae neque.
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
