import React, { useState, useEffect, useCallback } from "react";
import { Row, Col, Form, Button, Table } from "react-bootstrap";
import { useParams } from "react-router-dom";
import axios from "../../../middleware/axios";
import OrganizersNavigationBar from "../../../components/OrganizersNavigationBar";
import Footer from "../../../components/Footer";
import "./TournamentSchedule.css";

function TournamentSchedule() {
  // Extract tournamentId and esportsTitle from URL parameters
  const { tournamentId, esportsTitle } = useParams();

  // State to manage match schedules, new match input, and editing
  const [matches, setMatches] = useState([]);
  const [newMatch, setNewMatch] = useState({
    teamA: "",
    teamB: "",
    date: "",
    time: "",
  });
  const [editMatch, setEditMatch] = useState(null);

  // Function to format date strings
  const formatDate = (dateString) => {
    const options = { year: "numeric", month: "long", day: "numeric" };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  // Fetch match schedules using useCallback to avoid unnecessary re-renders
  const fetchSchedules = useCallback(async () => {
    try {
      // Send a GET request to the server's '/api/organizers/${esportsTitle}/tournament/${tournamentId}' endpoint
      const response = await axios.get(
        `/api/organizers/${esportsTitle}/tournament/${tournamentId}`
      );
      setMatches(response.data.schedules);
    } catch (error) {
      console.error("Error fetching schedules:", error);
    }
  }, [tournamentId, esportsTitle]);

  // Handle change in new match input fields
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setNewMatch((prevMatch) => ({
      ...prevMatch,
      [name]: value,
    }));
  };

  // Handle creation of a new match schedule
  const handleCreateSchedule = async () => {
    try {
      const newMatchData = {
        teamA: newMatch.teamA,
        teamB: newMatch.teamB,
        date: newMatch.date,
        time: newMatch.time,
        tournament: tournamentId,
      };

      // Send a POST request to the server's '/api/organizers/${esportsTitle}/tournament/${tournamentId}/create-tournament-schedule' endpoint
      await axios.post(
        `/api/organizers/${esportsTitle}/tournament/${tournamentId}/create-tournament-schedule`,
        newMatchData
      );

      fetchSchedules();
      setNewMatch({ teamA: "", teamB: "", date: "", time: "" });
    } catch (error) {
      console.error("Error creating schedule:", error);
    }
  };

  // Handle click on edit button
  const handleEditClick = (scheduleId) => {
    setEditMatch(scheduleId);
  };

  // Handle input change in edit mode
  const handleEditInputChange = (event, scheduleId, fieldName) => {
    const { value } = event.target;
    setMatches((prevMatches) =>
      prevMatches.map((match) =>
        match._id === scheduleId ? { ...match, [fieldName]: value } : match
      )
    );
  };

  // Handle date input change in edit mode
  const handleDateInputChange = (event, scheduleId, fieldName) => {
    const { value } = event.target;
    setMatches((prevMatches) =>
      prevMatches.map((match) =>
        match._id === scheduleId ? { ...match, [fieldName]: value } : match
      )
    );
  };

  // Handle time input change in edit mode
  const handleTimeInputChange = (event, scheduleId, fieldName) => {
    const { value } = event.target;
    setMatches((prevMatches) =>
      prevMatches.map((match) =>
        match._id === scheduleId ? { ...match, [fieldName]: value } : match
      )
    );
  };

  // Handle save edit action
  const handleSaveEdit = async () => {
    const editedMatch = matches.find((match) => match._id === editMatch);
    try {
      // Send a PUT request to the server's '/api/organizers/${esportsTitle}/tournament/${tournamentId}/edit-tournament-schedule/${editMatch}' endpoint
      await axios.put(
        `/api/organizers/${esportsTitle}/tournament/${tournamentId}/edit-tournament-schedule/${editMatch}`,
        editedMatch
      );
      setEditMatch(null);
    } catch (error) {
      console.error("Error editing schedule:", error);
    }
  };

  // Handle deletion of a match schedule
  const handleDeleteSchedule = async (scheduleId) => {
    try {
      // Send a DELETE request to the server's '/api/organizers/${esportsTitle}/tournament/${tournamentId}/delete-tournament-schedule/${scheduleId}' endpoint
      await axios.delete(
        `/api/organizers/${esportsTitle}/tournament/${tournamentId}/delete-tournament-schedule/${scheduleId}`
      );
      fetchSchedules();
    } catch (error) {
      console.error("Error deleting schedule:", error);
    }
  };

  // Fetch match schedules when the component mounts
  useEffect(() => {
    fetchSchedules();
  }, [fetchSchedules]);

  return (
    <div className="tournament-schedule-wrapper">
      {/* Organizers navigation bar component */}
      <OrganizersNavigationBar />
      <div className="tournament-schedule-form">
        {/* Add match schedule heading */}
        <h2 className="tournament-schedule-heading">Add Match Schedule</h2>
        <Row>
          <Col md={6}>
            {/* Team A input */}
            <Form.Control
              type="text"
              name="teamA"
              placeholder="Team A"
              value={newMatch.teamA}
              onChange={handleInputChange}
              className="tournament-schedule-input"
            />
          </Col>
          <Col md={6}>
            {/* Team B input */}
            <Form.Control
              type="text"
              name="teamB"
              placeholder="Team B"
              value={newMatch.teamB}
              onChange={handleInputChange}
              className="tournament-schedule-input"
            />
          </Col>
        </Row>
        <Row>
          <Col md={6}>
            {/* Date input */}
            <Form.Control
              type="date"
              name="date"
              value={newMatch.date}
              onChange={handleInputChange}
              className="tournament-schedule-input"
            />
          </Col>
          <Col md={6}>
            {/* Time input */}
            <Form.Control
              type="time"
              name="time"
              value={newMatch.time}
              onChange={handleInputChange}
              className="tournament-schedule-input"
            />
          </Col>
        </Row>
        {/* Add match button */}
        <Button
          onClick={handleCreateSchedule}
          className="tournament-schedule-add-match-button"
        >
          Add Match
        </Button>
      </div>
      <div className="tournament-schedule-list">
        {/* Match schedule heading */}
        <h2 className="tournament-schedule-heading">Match Schedule</h2>
        {/* Table to display match schedules */}
        <Table bordered responsive className="tournament-schedule-table">
          <thead>
            <tr>
              <th className="tournament-schedule-table-header">Teams</th>
              <th className="tournament-schedule-table-header">Date</th>
              <th className="tournament-schedule-table-header">Edit</th>
              <th className="tournament-schedule-table-header">Delete</th>
            </tr>
          </thead>
          <tbody>
            {matches.map((match, index) => (
              <tr key={index} className="tournament-schedule-table-row">
                <td className="tournament-schedule-table-cell">
                  {/* Display teams in edit mode or regular mode */}
                  {editMatch === match._id ? (
                    <div className="edit-input-wrapper">
                      <Form.Control
                        type="text"
                        name="teamA"
                        value={match.teamA}
                        onChange={(event) =>
                          handleEditInputChange(event, match._id, "teamA")
                        }
                      />
                      <Form.Control
                        type="text"
                        name="teamB"
                        value={match.teamB}
                        onChange={(event) =>
                          handleEditInputChange(event, match._id, "teamB")
                        }
                        className="mt-2"
                      />
                    </div>
                  ) : (
                    `${match.teamA} vs. ${match.teamB}`
                  )}
                </td>
                <td className="tournament-schedule-table-cell">
                  {/* Display date and time in edit mode or regular mode */}
                  {editMatch === match._id ? (
                    <div className="edit-input-wrapper">
                      <Form.Control
                        type="date"
                        name="date"
                        value={match.date}
                        onChange={(event) =>
                          handleDateInputChange(event, match._id, "date")
                        }
                      />
                      <Form.Control
                        type="time"
                        name="time"
                        value={match.time}
                        onChange={(event) =>
                          handleTimeInputChange(event, match._id, "time")
                        }
                        className="mt-2"
                      />
                    </div>
                  ) : (
                    `${formatDate(match.date)} at ${match.time}`
                  )}
                </td>
                <td className="tournament-schedule-table-cell">
                  {/* Display save button in edit mode or edit button in regular mode */}
                  {editMatch === match._id ? (
                    <Button
                      onClick={handleSaveEdit}
                      className="tournament-schedule-save-button"
                    >
                      Save
                    </Button>
                  ) : (
                    <Button
                      onClick={() => handleEditClick(match._id)}
                      className="tournament-schedule-edit-button"
                    >
                      Edit
                    </Button>
                  )}
                </td>
                <td className="tournament-schedule-table-cell">
                  {/* Delete button */}
                  <Button
                    onClick={() => handleDeleteSchedule(match._id)}
                    className="tournament-schedule-delete-button"
                  >
                    Delete
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
      {/* Footer component */}
      <Footer />
    </div>
  );
}

export default TournamentSchedule;
