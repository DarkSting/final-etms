import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Button, ListGroup } from "react-bootstrap";
import axios from "../../../middleware/axios";
import PlayersNavigationBar from "../../../components/PlayersNavigationBar";
import Footer from "../../../components/Footer";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./TeamRequests.css";

function TeamRequests() {
  // Extract teamId and esportsTitle from URL parameters
  const { teamId, esportsTitle } = useParams();

  // State to store the list of join requests
  const [joinRequests, setJoinRequests] = useState([]);

  useEffect(() => {
    // Function to fetch join requests
    const fetchJoinRequests = async () => {
      try {
        // Send a GET request to the server's
        // '/api/players/${esportsTitle}/team/${teamId}/team-join-requests' endpoint
        const response = await axios.get(
          `/api/players/${esportsTitle}/team/${teamId}/team-join-requests`
        );

        // Ensure that the response.data.joinRequests is an array before setting it
        if (Array.isArray(response.data.joinRequests)) {
          setJoinRequests(response.data.joinRequests);
        } else {
          // If it's not an array, set an empty array to prevent errors
          setJoinRequests([]);
        }
      } catch (error) {
        console.error("Error fetching join requests:", error);
        // Set an empty array in case of an error
        setJoinRequests([]);
      }
    };

    // Call the function to fetch join requests when the component mounts
    fetchJoinRequests();
  }, [teamId, esportsTitle]);

  // Function to handle accepting a join request
  const handleAcceptRequest = async (requestId) => {
    try {
      // Send a POST request to the server's
      // `/api/players/${esportsTitle}/team/${teamId}/accept-team-request` endpoint
      await axios.post(
        `/api/players/${esportsTitle}/team/${teamId}/accept-team-request`,
        { playerId: requestId }
      );

      // Remove the player from joinRequests
      const updatedJoinRequests = joinRequests.filter(
        (request) => request.playerId._id !== requestId
      );
      setJoinRequests(updatedJoinRequests);

      // Display a success notification
      toast.success("Player accepted successfully!");
    } catch (error) {
      console.error("Error accepting join request:", error);
      // Display an error notification
      toast.error("Team has reached the maximum number of players.");
    }
  };

  // Function to handle rejecting a join request
  const handleRejectRequest = async (requestId) => {
    try {
      // Send a POST request to the server's
      // `/api/players/${esportsTitle}/team/${teamId}/reject-team-request` endpoint
      await axios.post(
        `/api/players/${esportsTitle}/team/${teamId}/reject-team-request`,
        { playerId: requestId }
      );

      // Remove the player from joinRequests
      const updatedJoinRequests = joinRequests.filter(
        (request) => request.playerId._id !== requestId
      );
      setJoinRequests(updatedJoinRequests);

      // Display a success notification
      toast.success("Player rejected successfully!");
    } catch (error) {
      console.error("Error rejecting join request:", error);
      // Display an error notification
      toast.error("Failed to reject player. Please try again.");
    }
  };

  return (
    <div className="team-requests-wrapper">
      {/* Players navigation bar component */}
      <PlayersNavigationBar />
      <h1 className="team-requests-heading">Team Requests</h1>
      <div className="team-requests-join-requests">
        <h2 className="team-requests-join-requests-heading">Join Requests</h2>
        <ListGroup>
          {joinRequests.map((request) => (
            <ListGroup.Item
              key={request._id}
              className="team-requests-join-request-item"
            >
              {/* Display the gaming alias and username */}
              {request.playerId.gamingAlias} ({request.playerId.username})
              <Button
                variant="success"
                onClick={() => handleAcceptRequest(request.playerId._id)}
                className="team-requests-accept-button"
              >
                Accept
              </Button>
              <Button
                variant="danger"
                onClick={() => handleRejectRequest(request.playerId._id)}
                className="team-requests-reject-button"
              >
                Reject
              </Button>
            </ListGroup.Item>
          ))}
        </ListGroup>
      </div>
      {/* Add ToastContainer */}
      <ToastContainer />
      {/* Footer component */}
      <Footer />
    </div>
  );
}

export default TeamRequests;
