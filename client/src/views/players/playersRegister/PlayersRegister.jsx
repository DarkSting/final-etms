import React, { useState } from "react";
import { Form, Button, Alert, Modal } from "react-bootstrap";
import { Link } from "react-router-dom";
import axios from "../../../middleware/axios";
import NavigationBar from "../../../components/NavigationBar";
import Footer from "../../../components/Footer";
import "./PlayersRegister.css";

function PlayersRegister() {
  // State for form fields
  const [fullName, setFullName] = useState("");
  const [gamingAlias, setGamingAlias] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [validationError, setValidationError] = useState("");
  const [registrationStatus, setRegistrationStatus] = useState("");
  const [showModal, setShowModal] = useState(false);

  // Handle form submit
  const handleSubmit = async (event) => {
    event.preventDefault();

    // Clear previous validation error
    setValidationError("");

    // Check if password and confirm password match
    if (password !== confirmPassword) {
      setValidationError("Passwords do not match");
      return;
    }

    try {
      // Send a POST request to the server's '/api/players/register' endpoint
      const response = await axios.post("/api/players/register", {
        fullName,
        gamingAlias,
        username,
        email,
        password,
      });

      console.log(response.data);
      setRegistrationStatus("Please log in to your account.");
      setShowModal(true);
    } catch (error) {
      if (error.response && error.response.data) {
        const { field, error: errorMessage } = error.response.data;
        if (field === "username") {
          setValidationError(errorMessage);
        } else if (field === "email") {
          setValidationError(errorMessage);
        } else {
          setValidationError(errorMessage);
        }
      } else {
        console.error(error);
        setValidationError("Please try again.");
      }
    }
  };

  return (
    <div className="players-register-container">
      {/* Navigation bar component */}
      <NavigationBar />
      <div className="players-register-content">
        <div className="players-register-form-container">
          <h1 className="players-register-title">Player Registration</h1>
          {/* Render an error message using the Alert component if a validation error exists */}
          {validationError && <Alert variant="danger">{validationError}</Alert>}
          <Form onSubmit={handleSubmit}>
            {/* Full name field */}
            <Form.Group className="mb-3 mt-4">
              <Form.Label>
                Full Name<span className="required">*</span>
              </Form.Label>
              <Form.Control
                type="text"
                id="players-register-full-name"
                placeholder="Enter your full name"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                required
              />
            </Form.Group>
            {/* Gaming alias field */}
            <Form.Group className="mb-3">
              <Form.Label>
                Gaming Alias<span className="required">*</span>
              </Form.Label>
              <Form.Control
                type="text"
                id="players-register-gaming-alias"
                placeholder="Enter your gaming alias"
                value={gamingAlias}
                onChange={(e) => setGamingAlias(e.target.value)}
                required
              />
            </Form.Group>
            {/* Username field */}
            <Form.Group className="mb-3">
              <Form.Label>
                Username<span className="required">*</span>
              </Form.Label>
              <Form.Control
                type="text"
                id="players-register-username"
                placeholder="Enter your username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
            </Form.Group>
            {/* Email field */}
            <Form.Group className="mb-3">
              <Form.Label>
                Email<span className="required">*</span>
              </Form.Label>
              <Form.Control
                type="email"
                id="players-register-email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </Form.Group>
            {/* Password field */}
            <Form.Group className="mb-3">
              <Form.Label>
                Password<span className="required">*</span>
              </Form.Label>
              <Form.Control
                type="password"
                id="players-register-password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </Form.Group>
            {/* Confirm password field */}
            <Form.Group className="mb-3">
              <Form.Label>
                Confirm Password<span className="required">*</span>
              </Form.Label>
              <Form.Control
                type="password"
                id="players-register-confirm-password"
                placeholder="Confirm your password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
              />
            </Form.Group>
            {/* Register button */}
            <div className="players-register-button-container">
              <Button
                type="submit"
                variant="secondary"
                className="players-register-button"
              >
                Register
              </Button>
              {/* Login link */}
              <p className="players-register-login-link">
                Already have an account? Click{" "}
                <Link to="/players/login">here</Link> to login.
              </p>
            </div>
          </Form>
        </div>
      </div>
      {/* Footer component */}
      <Footer />

      {/* Registration success modal */}
      <Modal
        show={showModal}
        onHide={() => setShowModal(false)}
        centered
        id="players-register-registration-modal"
        className="players-register-modal"
      >
        {/* Modal header */}
        <Modal.Header closeButton>
          <Modal.Title
            id="players-register-registration-modal-title"
            className="text-center players-register-modal-title"
          >
            Registration Successful
          </Modal.Title>
        </Modal.Header>
        {/* Modal body */}
        <Modal.Body>
          <p
            id="players-register-registration-modal-message"
            className="text-center players-register-modal-message"
          >
            {registrationStatus}
          </p>
        </Modal.Body>
        {/* Modal footer */}
        <Modal.Footer className="d-flex justify-content-center players-register-modal-footer">
          <div>
            {/* Okay button for closing the modal */}
            <Link to="/players/login">
              <Button
                variant="secondary"
                id="players-register-registration-modal-okay-button"
              >
                Okay
              </Button>
            </Link>
          </div>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default PlayersRegister;
