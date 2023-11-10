const TournamentSchedule = require("../models/TournamentSchedule");

// Controller to create a new tournament schedule
const createTournamentSchedule = async (req, res) => {
  try {
    const { tournament, teamA, teamB, date, time } = req.body;

    // Create a new tournament schedule
    const tournamentSchedule = new TournamentSchedule({
      tournament: tournament,
      teamA: teamA,
      teamB: teamB,
      date: date,
      time: time,
    });

    // Save the schedule to the database
    await tournamentSchedule.save();

    // Respond with a success message and schedule ID
    return res.status(201).json({
      message: "Tournament schedule created successfully",
      scheduleId: tournamentSchedule._id,
    });
  } catch (error) {
    return res.status(500).json(error);
  }
};

// Controller to edit a tournament schedule
const editTournamentSchedule = async (req, res) => {
  try {
    const { scheduleId } = req.params;
    const { teamA, teamB, date, time } = req.body;

    // Find and update the tournament schedule by ID
    const tournamentSchedule = await TournamentSchedule.findByIdAndUpdate(
      scheduleId,
      {
        teamA: teamA,
        teamB: teamB,
        date: date,
        time: time,
      },
      { new: true }
    );

    // If schedule is not found, return an error
    if (!tournamentSchedule) {
      return res.status(404).json({ error: "Tournament schedule not found" });
    }

    // Respond with a success message and an updated schedule
    return res.json({
      message: "Tournament schedule updated successfully",
      updatedSchedule: tournamentSchedule,
    });
  } catch (error) {
    return res.status(500).json(error);
  }
};

// Controller to delete a tournament schedule
const deleteTournamentSchedule = async (req, res) => {
  try {
    const { scheduleId } = req.params;

    // Find and delete the tournament schedule by ID
    const deletedSchedule = await TournamentSchedule.findByIdAndDelete(
      scheduleId
    );

    // If schedule is not found, return an error
    if (!deletedSchedule) {
      return res.status(404).json({ error: "Tournament schedule not found" });
    }

    // Respond with a success message
    return res.json({ message: "Tournament schedule deleted successfully" });
  } catch (error) {
    return res.status(500).json(error);
  }
};

module.exports = {
  createTournamentSchedule,
  editTournamentSchedule,
  deleteTournamentSchedule,
};
