import React, { useState, useEffect } from "react";
import axios from "../../../middleware/axios";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import PlayersNavigationBar from "../../../components/PlayersNavigationBar";
import Footer from "../../../components/Footer";
import "./PlayersEditProfile.css";

function PlayersEditProfile() {
  // State to hold the original and current player details
  const [originalPlayerDetails, setOriginalPlayerDetails] = useState({
    fullName: "",
    gamingAlias: "",
    email: "",
    phone: "",
    description: "",
  });
  const [playerDetails, setPlayerDetails] = useState({
    fullName: "",
    gamingAlias: "",
    email: "",
    phone: "",
    description: "",
  });

  // Fetch player details when the component mounts
  useEffect(() => {
    fetchPlayerDetails();
  }, []);

  // Fetch player details from the back-end
  const fetchPlayerDetails = async () => {
    try {
      const response = await axios.get("/api/players/view-profile");
      setOriginalPlayerDetails(response.data.player);
      setPlayerDetails(response.data.player);
    } catch (error) {
      console.error("Error fetching player details:", error);
    }
  };

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setPlayerDetails((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Send a PUT request to the server's '/api/players/edit-profile' endpoint
      await axios.put("/api/players/edit-profile", playerDetails);
    } catch (error) {
      console.error("Error updating player profile:", error);
    }
  };

  // Handle cancel button click
  const handleCancel = () => {
    setPlayerDetails(originalPlayerDetails);
  };

  return (
    <div className="pep-wrapper">
      {/* Players navigation bar component */}
      <PlayersNavigationBar />
      <Container className="pep-container">
        <div className="pep-header">
          {/* Header section */}
          <div className="pep-header-text">Update Profile</div>
          <div className="pep-name">{playerDetails.fullName.split(" ")[0]}</div>
          <div className="pep-username">@{playerDetails.username}</div>
        </div>
        <div className="pep-form-container">
          <Form onSubmit={handleSubmit}>
            <Row className="pep-form">
              <Col xs={12} sm={6} className="mb-3 mb-sm-0">
                <Form.Group controlId="formFullName">
                  {/* Full name field */}
                  <Form.Label className="pep-form-label">Full Name</Form.Label>
                  <Form.Control
                    type="text"
                    name="fullName"
                    value={playerDetails.fullName}
                    placeholder="Enter full name"
                    id="players-edit-profile-full-name"
                    onChange={handleChange}
                  />
                </Form.Group>
              </Col>
              <Col xs={12} sm={6}>
                <Form.Group controlId="formGamingAlias">
                  {/* Gaming alias field */}
                  <Form.Label className="pep-form-label">
                    Gaming Alias
                  </Form.Label>
                  <Form.Control
                    type="text"
                    name="gamingAlias"
                    value={playerDetails.gamingAlias}
                    placeholder="Enter gaming alias"
                    id="players-edit-profile-gaming-alias"
                    onChange={handleChange}
                  />
                </Form.Group>
              </Col>
            </Row>
            <Row className="pep-form">
              <Col xs={12} sm={6} className="mb-3 mb-sm-0">
                <Form.Group controlId="formEmail">
                  {/* Email field */}
                  <Form.Label className="pep-form-label">Email</Form.Label>
                  <Form.Control
                    type="email"
                    name="email"
                    value={playerDetails.email}
                    placeholder="Enter email"
                    id="players-edit-profile-email"
                    onChange={handleChange}
                  />
                </Form.Group>
              </Col>
              <Col xs={12} sm={6}>
                <Form.Group controlId="formPhone">
                  {/* Phone field */}
                  <Form.Label className="pep-form-label">Phone</Form.Label>
                  <Form.Control
                    type="tel"
                    name="phone"
                    value={playerDetails.phone}
                    placeholder="Enter phone"
                    id="players-edit-profile-phone"
                    onChange={handleChange}
                  />
                </Form.Group>
              </Col>
            </Row>
            <Form.Group controlId="formDescription">
              {/* Description field */}
              <Form.Label className="pep-form-label">Description</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                name="description"
                value={playerDetails.description}
                placeholder="Enter description"
                id="players-edit-profile-description"
                onChange={handleChange}
              />
            </Form.Group>
            <div className="pep-button-container">
              {/* Save changes button */}
              <Button
                variant="secondary"
                type="submit"
                id="players-edit-profile-save-button"
                className="pep-button"
              >
                Save Changes
              </Button>
              {/* Cancel changes button */}
              <Button
                variant="secondary"
                type="reset"
                id="players-edit-profile-cancel-button"
                className="pep-button"
                onClick={handleCancel}
              >
                Cancel Changes
              </Button>
            </div>
          </Form>
        </div>
      </Container>
      {/* Footer component */}
      <Footer />
    </div>
  );
}

export default PlayersEditProfile;
