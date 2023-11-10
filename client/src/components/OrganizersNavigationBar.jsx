import React from "react";
import { Navbar, Nav, NavDropdown } from "react-bootstrap";
import { Link } from "react-router-dom";
import { CgProfile } from "react-icons/cg";
import "./OrganizersNavigationBar.css";

function OrganizersNavigationBar() {
  return (
    <Navbar
      className="custom-navbar custom-glowing-border sticky-top"
      variant="dark"
      expand="md"
    >
      {/* Logo */}
      <Navbar.Brand as={Link} to="/organizers/dashboard">
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
          {/* Dashboard link for organizers */}
          <Nav.Link
            as={Link}
            to="/organizers/dashboard"
            id="nav-organizers-dashboard-link"
          >
            Dashboard
          </Nav.Link>
          {/* Tournaments dropdown */}
          <NavDropdown title="Tournaments" id="basic-nav-dropdown">
            {/* Create a new tournament link */}
            <NavDropdown.Item
              as={Link}
              to="/organizers/create-tournament"
              id="nav-organizers-create-tournament-link"
            >
              Create a New Tournament
            </NavDropdown.Item>
            {/* Manage tournaments link */}
            <NavDropdown.Item
              as={Link}
              to="/organizers/manage-tournaments"
              id="nav-organizers-manage-tournaments-link"
            >
              Manage Tournaments
            </NavDropdown.Item>
          </NavDropdown>
          {/* News dropdown */}
          <NavDropdown title="News" id="basic-nav-dropdown">
            {/* Link to Counter-Strike news */}
            <NavDropdown.Item
              as={Link}
              to="/organizers/news/counter-strike"
              id="nav-counter-strike-news-link"
            >
              Counter-Strike
            </NavDropdown.Item>
          </NavDropdown>
        </Nav>
        <Nav className="ml-auto">
          {/* Profile dropdown */}
          <NavDropdown title={<CgProfile size={24} />} id="profile-dropdown">
            {/* View profile link */}
            <NavDropdown.Item
              as={Link}
              to="/organizers/view-profile"
              id="nav-organizers-view-profile-link"
            >
              View Profile
            </NavDropdown.Item>
            {/* Edit profile link */}
            <NavDropdown.Item
              as={Link}
              to="/organizers/edit-profile"
              id="nav-organizers-edit-profile-link"
            >
              Edit Profile
            </NavDropdown.Item>
            <NavDropdown.Divider />
            {/* Logout link */}
            <NavDropdown.Item
              as={Link}
              to="/organizers/logout"
              id="nav-organizers-logout-link"
            >
              Logout
            </NavDropdown.Item>
          </NavDropdown>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
}

export default OrganizersNavigationBar;
