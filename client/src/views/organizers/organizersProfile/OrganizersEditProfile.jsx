import React, { useState, useEffect } from "react";
import axios from "../../../middleware/axios";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import OrganizersNavigationBar from "../../../components/OrganizersNavigationBar";
import Footer from "../../../components/Footer";
import "./OrganizersEditProfile.css";

function OrganizersEditProfile() {
  // State to hold the original and current organizer details
  const [originalOrganizerDetails, setOriginalOrganizerDetails] = useState({
    fullName: "",
    organizationName: "",
    email: "",
    phone: "",
    description: "",
  });
  const [organizerDetails, setOrganizerDetails] = useState({
    fullName: "",
    organizationName: "",
    email: "",
    phone: "",
    description: "",
  });

  // Fetch organizer details when the component mounts
  useEffect(() => {
    fetchOrganizerDetails();
  }, []);

  // Fetch organizer details from the back-end
  const fetchOrganizerDetails = async () => {
    try {
      const response = await axios.get("/api/organizers/view-profile");
      setOriginalOrganizerDetails(response.data.organizer);
      setOrganizerDetails(response.data.organizer);
    } catch (error) {
      console.error("Error fetching organizer details:", error);
    }
  };

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setOrganizerDetails((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Send a PUT request to the server's '/api/organizers/edit-profile' endpoint
      await axios.put("/api/organizers/edit-profile", organizerDetails);
    } catch (error) {
      console.error("Error updating organizer profile:", error);
    }
  };

  // Handle cancel button click
  const handleCancel = () => {
    setOrganizerDetails(originalOrganizerDetails);
  };

  return (
    <div className="oep-wrapper">
      {/* Organizers navigation bar component */}
      <OrganizersNavigationBar />
      <Container className="oep-container">
        <div className="oep-header">
          {/* Header section */}
          <div className="oep-header-text">Update Profile</div>
          <div className="oep-name">
            {organizerDetails.fullName.split(" ")[0]}
          </div>
          <div className="oep-username">@{organizerDetails.username}</div>
        </div>
        <div className="oep-form-container">
          <Form onSubmit={handleSubmit}>
            <Row className="oep-form">
              <Col xs={12} sm={6} className="mb-3 mb-sm-0">
                <Form.Group controlId="formFullName">
                  {/* Full name field */}
                  <Form.Label className="oep-form-label">Full Name</Form.Label>
                  <Form.Control
                    type="text"
                    name="fullName"
                    value={organizerDetails.fullName}
                    placeholder="Enter full name"
                    id="organizers-edit-profile-full-name"
                    onChange={handleChange}
                  />
                </Form.Group>
              </Col>
              <Col xs={12} sm={6}>
                <Form.Group controlId="formOrganizationName">
                  {/* Organization name field */}
                  <Form.Label className="oep-form-label">
                    Organization Name
                  </Form.Label>
                  <Form.Control
                    type="text"
                    name="organizationName"
                    value={organizerDetails.organizationName}
                    placeholder="Enter organization name"
                    id="organizers-edit-profile-organization-name"
                    onChange={handleChange}
                  />
                </Form.Group>
              </Col>
            </Row>
            <Row className="oep-form">
              <Col xs={12} sm={6} className="mb-3 mb-sm-0">
                <Form.Group controlId="formEmail">
                  {/* Email field */}
                  <Form.Label className="oep-form-label">Email</Form.Label>
                  <Form.Control
                    type="email"
                    name="email"
                    value={organizerDetails.email}
                    placeholder="Enter email"
                    id="organizers-edit-profile-email"
                    onChange={handleChange}
                  />
                </Form.Group>
              </Col>
              <Col xs={12} sm={6}>
                <Form.Group controlId="formPhone">
                  {/* Phone field */}
                  <Form.Label className="oep-form-label">Phone</Form.Label>
                  <Form.Control
                    type="tel"
                    name="phone"
                    value={organizerDetails.phone}
                    placeholder="Enter phone"
                    id="organizers-edit-profile-phone"
                    onChange={handleChange}
                  />
                </Form.Group>
              </Col>
            </Row>
            <Form.Group controlId="formDescription">
              {/* Description field */}
              <Form.Label className="oep-form-label">Description</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                name="description"
                value={organizerDetails.description}
                placeholder="Enter description"
                id="organizers-edit-profile-description"
                onChange={handleChange}
              />
            </Form.Group>
            <div className="oep-button-container">
              {/* Save changes button */}
              <Button
                variant="secondary"
                type="submit"
                id="organizers-edit-profile-save-button"
                className="oep-button"
              >
                Save Changes
              </Button>
              {/* Cancel changes button */}
              <Button
                variant="secondary"
                type="reset"
                id="organizers-edit-profile-cancel-button"
                className="oep-button"
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

export default OrganizersEditProfile;
