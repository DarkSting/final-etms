import React, { useState, useEffect } from "react";
import { Button, Modal } from "react-bootstrap";
import { useParams, useNavigate } from "react-router-dom";
import axios from "../../../middleware/axios";
import PlayersNavigationBar from "../../../components/PlayersNavigationBar";
import Footer from "../../../components/Footer";
import "./PlayersTournamentRegistrationPayment.css";

function PlayersTournamentRegistrationPayment() {
  const { tournamentId, esportsTitle, teamId } = useParams();
  const [registrationFee, setRegistrationFee] = useState(0);
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch the registration fee from the API
    axios
      .get(
        `/api/players/${esportsTitle}/tournament/${tournamentId}/registration`
      )
      .then((response) => {
        setRegistrationFee(response.data.registrationFees);
      })
      .catch((error) => {
        console.error("Error fetching registration fee:", error);
      });
  }, [tournamentId, esportsTitle]);

  const handlePayNow = async () => {
    setShowPaymentModal(true);
  };

  const closePaymentModal = () => {
    setShowPaymentModal(false);
  };

  const handlePayment = () => {
    // Navigate to the debit/credit card payment page
    navigate(
      `/players/${esportsTitle}/tournament/${tournamentId}/registration/card-payment/${teamId}`
    );
  };

  return (
    <div className="players-tournament-registration-payment-page-wrapper">
      {/* Players navigation bar component */}
      <PlayersNavigationBar />
      <div className="players-tournament-registration-payment-header">
        {/* Display the payment page title */}
        <h1 className="players-tournament-registration-payment-heading">
          Tournament Registration Payment
        </h1>
      </div>
      <div className="players-tournament-registration-payment-details">
        {/* Display the registration fee (retrieved from the API) */}
        <p className="players-tournament-registration-payment-label">
          Registration Fee:{" "}
          {registrationFee === 0 ? "Free" : `${registrationFee} LKR`}
        </p>
      </div>
      <div className="players-tournament-registration-payment-button-container">
        {/* Button to make the payment and register the team */}
        <Button
          onClick={handlePayNow}
          className="btn btn-success players-tournament-registration-payment-button"
        >
          Pay Now
        </Button>
      </div>
      {/* Footer component */}
      <Footer />

      {/* Payment modal */}
      <Modal
        show={showPaymentModal}
        onHide={closePaymentModal}
        dialogClassName="payment-modal"
      >
        <Modal.Header closeButton>
          <Modal.Title className="payment-title">
            Choose Payment Type
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>Select a payment method:</p>
          <div className="payment-item">
            <label htmlFor="debitCard">
              <input
                type="radio"
                id="debitCard"
                name="paymentType"
                value="debitCreditCard"
              />
              Debit/Credit Card
            </label>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={closePaymentModal}>
            Close
          </Button>
          <Button variant="success" onClick={handlePayment}>
            Proceed
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default PlayersTournamentRegistrationPayment;
