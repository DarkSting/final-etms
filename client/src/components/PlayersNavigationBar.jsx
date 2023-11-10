import React from "react";
import { Navbar, Nav, NavDropdown } from "react-bootstrap";
import { Link } from "react-router-dom";
import { CgProfile } from "react-icons/cg";
import "./PlayersNavigationBar.css";

function PlayersNavigationBar() {
  return (
    <Navbar
      className="custom-navbar custom-glowing-border sticky-top"
      variant="dark"
      expand="md"
    >
      {/* Logo */}
      <Navbar.Brand as={Link} to="/players/dashboard">
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
          {/* Dashboard link for players */}
          <Nav.Link
            as={Link}
            to="/players/dashboard"
            id="nav-players-dashboard-link"
          >
            Dashboard
          </Nav.Link>
          {/* Tournaments link */}
          <Nav.Link
            as={Link}
            to="/players/tournaments"
            id="nav-players-tournaments-link"
          >
            Tournaments
          </Nav.Link>
          {/* Teams dropdown */}
          <NavDropdown title="Teams" id="basic-nav-dropdown">
            {/* Create a new team link */}
            <NavDropdown.Item
              as={Link}
              to="/players/create-team"
              id="nav-players-create-team-link"
            >
              Create a New Team
            </NavDropdown.Item>
            {/* View and manage teams link */}
            <NavDropdown.Item
              as={Link}
              to="/players/view-manage-teams"
              id="nav-players-view-manage-teams-link"
            >
              View and Manage Teams
            </NavDropdown.Item>
          </NavDropdown>
          {/* Registrations link */}
          <Nav.Link
            as={Link}
            to="/players/registrations"
            id="nav-players-registrations-link"
          >
            Registrations
          </Nav.Link>
          {/* News dropdown */}
          <NavDropdown title="News" id="basic-nav-dropdown">
            {/* Link to Counter-Strike news */}
            <NavDropdown.Item
              as={Link}
              to="/players/news/counter-strike"
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
              to="/players/view-profile"
              id="nav-players-view-profile-link"
            >
              View Profile
            </NavDropdown.Item>
            {/* Edit profile link */}
            <NavDropdown.Item
              as={Link}
              to="/players/edit-profile"
              id="nav-players-edit-profile-link"
            >
              Edit Profile
            </NavDropdown.Item>
            <NavDropdown.Divider />
            {/* Logout link */}
            <NavDropdown.Item
              as={Link}
              to="/players/logout"
              id="nav-players-logout-link"
            >
              Logout
            </NavDropdown.Item>
          </NavDropdown>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
}

export default PlayersNavigationBar;
