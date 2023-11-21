import React, { useState, useEffect } from "react";
import { Modal, Button } from "react-bootstrap";
import { Link, useParams, useNavigate } from "react-router-dom";
import axios from "../../../middleware/axios";
import PlayersNavigationBar from "../../../components/PlayersNavigationBar";
import Footer from "../../../components/Footer";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./PlayersTournamentRegistration.css";

function PlayersTournamentRegistration() {
  // Extract tournamentId and esportsTitle from URL parameters
  const { tournamentId, esportsTitle } = useParams();
  const navigate = useNavigate();

  // State to hold registration details, registration status,
  // team selection modal, teams created by the player, and the selected team
  const [startDateRegistration, setStartDateRegistration] = useState(null);
  const [endDateRegistration, setEndDateRegistration] = useState(null);
  const [isRegistrationOpen, setIsRegistrationOpen] = useState(false);
  const [registrationFee, setRegistrationFee] = useState(0);
  const [showTeamModal, setShowTeamModal] = useState(false);
  const [playerTeams, setPlayerTeams] = useState([]);
  const [selectedTeam, setSelectedTeam] = useState(null);

  // Fetch tournament registration details when the component mounts
  useEffect(() => {
    // Fetch teams created by the player
    axios
      .get(`/api/players/${esportsTitle}/view-manage-teams/created-by-me`)
      .then((response) => {
        setPlayerTeams(response.data.teams);
      })
      .catch((error) => {
        console.error("Error fetching player's teams:", error);
      });

    // Fetch registration details, including start and end dates, registration status, and fee
    axios
      .get(
        `/api/players/${esportsTitle}/tournament/${tournamentId}/registration`
      )
      .then((response) => {
        // Format the dates as DD/MM/YYYY
        const startDate = new Date(response.data.startDateRegistration);
        const endDate = new Date(response.data.endDateRegistration);
        setStartDateRegistration(
          `${startDate.getDate()}/${
            startDate.getMonth() + 1
          }/${startDate.getFullYear()}`
        );
        setEndDateRegistration(
          `${endDate.getDate()}/${
            endDate.getMonth() + 1
          }/${endDate.getFullYear()}`
        );

        setIsRegistrationOpen(response.data.isRegistrationOpen);
        setRegistrationFee(response.data.registrationFees);
      })
      .catch((error) => {
        console.error("Error fetching registration details:", error);
      });
  }, [tournamentId, esportsTitle]);

  // Function to handle opening the team selection modal
  const openTeamModal = () => {
    setShowTeamModal(true);
  };

  // Function to handle closing the team selection modal
  const closeTeamModal = () => {
    setShowTeamModal(false);
  };

  // Function to handle team selection
  const handleTeamSelection = (teamId) => {
    setSelectedTeam(teamId);
  };

  // Function to handle tournament registration with the selected team
  const handleTournamentRegistrationWithTeam = async () => {
    if (selectedTeam !== null) {
      if (registrationFee === 0) {
        try {
          const teamId = selectedTeam;
          // Send a POST request to the server's
          // `/api/players/${esportsTitle}/tournament/${tournamentId}/registration/register-as-team`
          // endpoint
          const response = await axios.post(
            `/api/players/${esportsTitle}/tournament/${tournamentId}/registration/register-as-team`,
            {
              teamId: selectedTeam,
            }
          );

          console.log(response.data);

          // Navigate to the successful registration page
          navigate(
            `/players/${esportsTitle}/tournament/${tournamentId}/registration/successful/${teamId}`
          );
        } catch (error) {
          console.error("Error registering the team:", error);
          toast.error("Team has already been registered!");
        }
      }
    }
  };

  return (
    <div className="players-tournament-registration-page-wrapper">
      {/* Players navigation bar component */}
      <PlayersNavigationBar />
      <div className="players-tournament-registration-header">
        {/* Display tournament name */}
        <h1 className="players-tournament-registration-heading">
          Tournament Registration
        </h1>
      </div>
      <div className="players-tournament-registration-details">
        {/* Display registration details */}
        {isRegistrationOpen ? (
          <>
            <p className="players-tournament-registration-label">
              Registration Start Date: {startDateRegistration}
            </p>
            <p className="players-tournament-registration-label">
              Registration End Date: {endDateRegistration}
            </p>
          </>
        ) : (
          <p className="players-tournament-registration-label">
            Registration has not yet opened!
          </p>
        )}
        {registrationFee === 0 ? (
          <p className="players-tournament-registration-label">
            Registration Fee: Free
          </p>
        ) : (
          <p className="players-tournament-registration-label">
            Registration Fee: {registrationFee} LKR
          </p>
        )}
      </div>
      <div className="players-tournament-registration-button-container">
        {/* Button to join the tournament as a team */}
        <button
          onClick={openTeamModal}
          className="btn btn-success players-tournament-registration-button"
        >
          Join Tournament as a Team
        </button>
      </div>
      {/* Add ToastContainer */}
      <ToastContainer />
      {/* Footer component */}
      <Footer />

      {/* Team selection modal */}
      <Modal
        show={showTeamModal}
        onHide={closeTeamModal}
        dialogClassName="team-selection-modal"
      >
        <Modal.Header closeButton>
          <Modal.Title className="team-selection-title">
            Select Your Team
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {playerTeams.map((team) => (
            <div key={team.id} className="team-selection-item">
              <label>
                <input
                  type="radio"
                  name="teamSelection"
                  value={team.id}
                  onChange={() => handleTeamSelection(team._id)}
                />
                {team.teamName}
              </label>
            </div>
          ))}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={closeTeamModal}>
            Close
          </Button>
          {/* Check the registration fee */}
          {registrationFee > 0 ? (
            // If the fee is greater than zero, use Link to navigate to the payment page
            <Link
              to={`/players/${esportsTitle}/tournament/${tournamentId}/registration/payment/${selectedTeam}`}
            >
              <Button variant="success">Register with Selected Team</Button>
            </Link>
          ) : (
            <Button
              variant="success"
              onClick={handleTournamentRegistrationWithTeam}
            >
              Register with Selected Team
            </Button>
          )}
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default PlayersTournamentRegistration;
