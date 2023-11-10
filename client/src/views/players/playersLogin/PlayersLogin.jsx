import React, { useState } from "react";
import { Form, Button, Alert } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import axios from "../../../middleware/axios";
import NavigationBar from "../../../components/NavigationBar";
import Footer from "../../../components/Footer";
import "./PlayersLogin.css";

function PlayersLogin() {
  // State for form fields
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loginSuccess, setLoginSuccess] = useState(false);
  const [validationError, setValidationError] = useState("");
  const navigate = useNavigate();

  // Handle form submit
  const handleSubmit = async (event) => {
    event.preventDefault();

    // Clear previous validation error
    setValidationError("");

    // Validate form fields
    if (!username) {
      setValidationError("Please enter your username");
      return;
    }
    if (!password) {
      setValidationError("Please enter your password");
      return;
    }

    try {
      // Send a POST request to the server's '/api/players/login' endpoint
      const response = await axios.post("/api/players/login", {
        username,
        password,
      });

      console.log(response.data);
      setLoginSuccess(true);
    } catch (error) {
      if (error.response && error.response.data) {
        setValidationError(error.response.data.error);
      } else {
        setValidationError("An error occurred. Please try again.");
      }
    }
  };

  // Handle successful login
  if (loginSuccess) {
    navigate("/players/dashboard");
  }

  return (
    <div className="players-login-container">
      {/* Navigation bar component */}
      <NavigationBar />
      <div className="players-login-content">
        <div className="players-login-form-container">
          <h1 className="players-login-title">Player Login</h1>
          {/* Render an error message using the Alert component if a validation error exists */}
          {validationError && <Alert variant="danger">{validationError}</Alert>}
          <Form onSubmit={handleSubmit}>
            {/* Username field */}
            <Form.Group className="mb-3 mt-4">
              <Form.Label>Username</Form.Label>
              <Form.Control
                type="text"
                id="players-login-username"
                placeholder="Enter your username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
            </Form.Group>
            {/* Password field */}
            <Form.Group className="mb-3">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                id="players-login-password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </Form.Group>
            {/* Login button */}
            <div className="players-login-button-container">
              <Button
                type="submit"
                id="players-login-login-button"
                variant="secondary"
                className="players-login-button"
              >
                Login
              </Button>
              {/* Register link */}
              <p className="players-login-register-link">
                Don't have an account? Click{" "}
                <Link
                  to="/players/register"
                  id="players-login-players-register-link"
                >
                  here
                </Link>{" "}
                to register.
              </p>
            </div>
          </Form>
        </div>
      </div>
      {/* Footer component */}
      <Footer />
    </div>
  );
}

export default PlayersLogin;
