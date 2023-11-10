import React, { useState } from "react";
import { Button } from "react-bootstrap";
import { useParams, useNavigate } from "react-router-dom";
import Cards from "react-credit-cards";
import { ToastContainer, toast } from "react-toastify";
import axios from "../../../middleware/axios";
import PlayersNavigationBar from "../../../components/PlayersNavigationBar";
import Footer from "../../../components/Footer";
import "react-credit-cards/es/styles-compiled.css";
import "react-toastify/dist/ReactToastify.css";
import "./PlayersTournamentRegistrationCardPayment.css";

function PlayersTournamentRegistrationCardPayment() {
  const { tournamentId, esportsTitle, teamId } = useParams();
  const navigate = useNavigate();

  const [cardNumber, setCardNumber] = useState("");
  const [cardName, setCardName] = useState("");
  const [expiryDate, setExpiryDate] = useState("");
  const [cvv, setCvv] = useState("");

  const handlePayment = async () => {
    // Regular expressions for validation
    const cardNumberPattern = /^[0-9]{16}$/;
    const expiryDatePattern = /^(0[1-9]|1[0-2])\/\d{2}$/;
    const cvvPattern = /^\d{3}$/;

    if (
      cardNumber.match(cardNumberPattern) &&
      expiryDate.match(expiryDatePattern) &&
      cvv.match(cvvPattern)
    ) {
      try {
        // Register the team based on the provided parameters
        const registrationResponse = await axios.post(
          `/api/players/${esportsTitle}/tournament/${tournamentId}/registration/register-as-team`,
          {
            teamId: teamId,
          }
        );

        console.log(registrationResponse.data);

        // Navigate to the successful registration page
        navigate(
          `/players/${esportsTitle}/tournament/${tournamentId}/registration/successful/${teamId}`
        );
      } catch (error) {
        console.error("Error registering the team:", error);
        toast.error("Team has already been registered!");
      }
    } else {
      toast.error("Please enter valid card details.");
    }
  };

  return (
    <div className="players-tournament-registration-card-payment-page-wrapper">
      {/* Players navigation bar component */}
      <PlayersNavigationBar />
      <div className="players-tournament-registration-card-payment-header">
        {/* Display the payment page title */}
        <h1 className="players-tournament-registration-card-payment-heading">
          Debit/Credit Card Payment
        </h1>
      </div>
      <div className="players-tournament-registration-card-payment-form">
        {/* Form for entering card details */}
        <Cards
          cvc={cvv}
          expiry={expiryDate}
          name={cardName}
          number={cardNumber}
        />
        <div className="players-tournament-registration-card-payment-form-group mt-4">
          <label>Card Number:</label>
          <input
            type="text"
            value={cardNumber}
            onChange={(e) => setCardNumber(e.target.value)}
          />
        </div>
        <div className="players-tournament-registration-card-payment-form-group">
          <label>Cardholder's Name:</label>
          <input
            type="text"
            value={cardName}
            onChange={(e) => setCardName(e.target.value)}
          />
        </div>
        <div className="players-tournament-registration-card-payment-form-group">
          <label>Expiry Date (MM/YY):</label>
          <input
            type="text"
            value={expiryDate}
            onChange={(e) => setExpiryDate(e.target.value)}
          />
        </div>
        <div className="players-tournament-registration-card-payment-form-group">
          <label>CVV (3 digits):</label>
          <input
            type="text"
            value={cvv}
            onChange={(e) => setCvv(e.target.value)}
          />
        </div>
        <Button
          onClick={handlePayment}
          className="players-tournament-registration-card-payment-button btn btn-success"
        >
          Pay Now
        </Button>
      </div>
      {/* Add ToastContainer */}
      <ToastContainer />
      {/* Footer component */}
      <Footer />
    </div>
  );
}

export default PlayersTournamentRegistrationCardPayment;
