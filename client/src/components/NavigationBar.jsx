import React from "react";
import { Navbar, Nav, NavDropdown } from "react-bootstrap";
import { Link } from "react-router-dom";
import "./NavigationBar.css";

function NavigationBar() {
  return (
    <Navbar
      sticky="top"
      className="custom-navbar custom-glowing-border"
      variant="dark"
      expand="md"
    >
      {/* Logo */}
      <Navbar.Brand as={Link} to="/">
        <img
          src="/lk-esports-logo.png"
          width="40"
          height="40"
          className="d-inline-block align-top"
          alt="LK Esports Logo"
        />
      </Navbar.Brand>
      {/* Toggle button for mobile view */}
      <Navbar.Toggle aria-controls="responsive-navbar-nav" />
      {/* Collapsible navbar content */}
      <Navbar.Collapse id="responsive-navbar-nav">
        <Nav className="mr-auto">
          {/* Home link */}
          <Nav.Link as={Link} to="/" id="nav-home-link">
            Home
          </Nav.Link>
          {/* Organizers dropdown */}
          <NavDropdown title="Organizers" id="basic-nav-dropdown">
            {/* Register link for organizers */}
            <NavDropdown.Item
              as={Link}
              to="/organizers/register"
              id="nav-organizers-register-link"
            >
              Register
            </NavDropdown.Item>
            {/* Login link for organizers */}
            <NavDropdown.Item
              as={Link}
              to="/organizers/login"
              id="nav-organizers-login-link"
            >
              Login
            </NavDropdown.Item>
          </NavDropdown>
          {/* Players dropdown */}
          <NavDropdown title="Players" id="basic-nav-dropdown">
            {/* Register link for players */}
            <NavDropdown.Item
              as={Link}
              to="/players/register"
              id="nav-players-register-link"
            >
              Register
            </NavDropdown.Item>
            {/* Login link for players */}
            <NavDropdown.Item
              as={Link}
              to="/players/login"
              id="nav-players-login-link"
            >
              Login
            </NavDropdown.Item>
          </NavDropdown>
          {/* About link */}
          <Nav.Link as={Link} to="/about-us" id="nav-about-link">
            About
          </Nav.Link>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
}

export default NavigationBar;
