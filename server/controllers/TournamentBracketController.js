const { TournamentBracket } = require("../models/TournamentBracket");
const { TournamentBracketRound } = require("../models/TournamentBracketRound");
const { TournamentBracketMatch } = require("../models/TournamentBracketMatch");
const {
  TournamentBracketParticipant,
} = require("../models/TournamentBracketParticipant");

const registrationPhase = async (tournamentName, team) => {
  try {
    let foundOne = await TournamentBracket.findOne({
      name: tournamentName,
    });

    let count = 0;

    for (let i = 0; i < foundOne.roundHistory[0].matches.length; i++) {
      for (let j = 0; j < 2; j++) {
        console.log(foundOne.roundHistory[0].matches[i].participants[j].name);
        if (
          foundOne.roundHistory[0].matches[i].participants[j].name === "Null"
        ) {
          foundOne.roundHistory[0].matches[i].participants[j].name = team;
          count++;
        }
      }
    }

    await foundOne.save();

    if (count == 0) {
      return false;
    }

    return true;
  } catch (error) {
    return false;
  }
};

const assignTeam = async (req, res) => {
  const {
    round,
    matchIndex,
    team,
    tournamentName,
    participantIndex,
    scheduleDate,
  } = req.body;

  let foundOne = await TournamentBracket.findOne({
    name: tournamentName,
  });

 
  if (!foundOne) {
    return res.status(404).json({ msg: "Could not find the tournament" });
  }

  try {
    const date = scheduleDate ?? new Date();

    console.log( team)

    foundOne.roundHistory[round - 1].matches[matchIndex].participants[
      participantIndex
    ].name = team;
    foundOne.roundHistory[round - 1].matches[matchIndex].startTime = date;
    foundOne.save();

    return res.status(200).json({ msg: "OK" });
  } catch (error) {
    return res.status(500).json(error);
  }
};

const assignWinnerToNext = async (req, res) => {
  const { nextMatchID, tournamentName, team } = req.body;

  let foundOne = await TournamentBracket.findOne({
    name: tournamentName,
  });

  let found = false;

  for (let i = 0; i < foundOne.roundHistory.length; i++) {
    for (let j = 0; j < foundOne.roundHistory[i].matches.length; j++) {
      for (
        let k = 0;
        k < foundOne.roundHistory[i].matches[j].participants.length;
        k++
      ) {
        if (
          foundOne.roundHistory[i].matches[j].participants[k].name === "Null" &&
          foundOne.roundHistory[i].matches[j].id === nextMatchID
        ) {
          foundOne.roundHistory[i].matches[j].participants[k].name = team;
          found = true;
          break;
        }

        if (found) {
          break;
        }
      }

      if (found) {
        break;
      }
    }
  }

  await foundOne.save();

  return res.status(200).json({ msg: "OK" });
};


const updateMatchStatus = async (req, res) => {
  const { round, matchIndex, wonParticipantIndex, tournamentName } = req.body;

  console.log(tournamentName);

  const lostParticipantIndex = wonParticipantIndex == 1 ? 0 : 1;

  const status = [null, "PLAYED", "NO_SHOW", "WALK_OVER", "NO_PARTY"];

  let foundOne = await TournamentBracket.findOne({
    name: tournamentName,
  });

  if (!foundOne) {
    return res.status(404).json({ msg: "Could not find the tournament" });
  }

  try {
    console.log(wonParticipantIndex);
    console.log(
      foundOne.roundHistory[round - 1].matches[matchIndex].participants[0].name
    );

    if (
      foundOne.roundHistory[round - 1].matches[matchIndex].participants[
        wonParticipantIndex
      ].name === "Null" &&
      foundOne.roundHistory[round - 1].matches[matchIndex].participants[
        lostParticipantIndex
      ].name === "Null"
    ) {
      return res.status(500).json({ msg: "match should contain 2 teams" });
    }

    foundOne.roundHistory[round - 1].matches[matchIndex].participants[
      wonParticipantIndex
    ].status = status[1];
    foundOne.roundHistory[round - 1].matches[matchIndex].participants[
      wonParticipantIndex
    ].isWinner = true;
    foundOne.roundHistory[round - 1].matches[matchIndex].participants[
      wonParticipantIndex
    ].resultText = "Won";

    foundOne.roundHistory[round - 1].matches[matchIndex].participants[
      lostParticipantIndex
    ].status = status[1];
    foundOne.roundHistory[round - 1].matches[matchIndex].participants[
      lostParticipantIndex
    ].isWinner = false;
    foundOne.roundHistory[round - 1].matches[matchIndex].participants[
      lostParticipantIndex
    ].resultText = "Lost";

    completeMatch(foundOne, round, matchIndex);
    isRoundCompleted(foundOne, round);

    foundOne.save();

    return res.status(200).json({ msg: "OK" });
  } catch (error) {
    return res.status(500).json(error.message);
  }
};

const completeMatch = (model, round, matchindex) => {
  model.roundHistory[round - 1].matches[matchindex].state = "PLAYED";
};

const isRoundCompleted = (model, round) => {
  for (let i = 0; i < model.roundHistory[round - 1].matches.length; i++) {
    if (model.roundHistory[round - 1].matches[i].state === null) {
      return false;
    }
  }

  model.currentRound = round + 1;
  model.roundHistory[round - 1].isCompleted = true;

  return true;
};

const createTournamentMatches = async (tournamentName) => {
  let count = 4;
  let rounds = 0;

  console.log(tournamentName);

  if (count < 4) {
    return false;
    // return res
    //   .status(500)
    //   .json({ msg: "Teams not sufficient to create generate matches" });
  }

  for (let i = 2; i < 5; i++) {
    if (count === Math.pow(2, i)) {
      rounds = i;
    }
  }

  if (rounds === 0) {
    return false;
    //return res.status(500).json({ msg: "Team count should be equal to 2^n" });
  }

  let currentMatchCount = count / 2;
  let rd = [];
  let currentMatchId = 1000;

  for (let i = 0; i < rounds; i++) {
    let mt = [];

    for (let j = 0; j < currentMatchCount; j++) {
      let participants = [];

      for (let k = 2; k > 0; k--) {
        const savedParticipant = await new TournamentBracketParticipant(
          {}
        ).save();
        participants.push(savedParticipant);
      }

      const currentMatch = new TournamentBracketMatch({
        id: currentMatchId,
        tournamentRoundText: (i + 1).toString(),
        participants: participants,
      });

      let savedMatch = await currentMatch.save();
      mt.push(savedMatch);
      currentMatchId++;
    }

    const savedRound = await new TournamentBracketRound({
      round: i + 1,
      matches: mt,
    }).save();

    rd.push(savedRound);
    currentMatchCount = currentMatchCount / 2;
  }

  for (let i = 0; i < rd.length; i++) {
    for (let j = 0; j < rd[i].matches.length; j++) {
      if ((j + 1) % 2 === 0 && i + 1 < rd.length) {
        let nextMatchID = rd[i + 1].matches[(j + 1) / 2 - 1].id;
        let previous = rd[i].matches[j - 1];
        let current = rd[i].matches[j];
        previous.nextMatchId = nextMatchID;
        current.nextMatchId = nextMatchID;
      }
    }

    try {
      (await rd[i]).save();
    } catch (error) {
      return res.status(500).json({ msg: error.message });
    }
  }

  const newTournament = new TournamentBracket({
    name: tournamentName,
    currentRound: 1,
    roundHistory: rd,
  });

  newTournament.save();

  await TournamentBracketMatch.deleteMany();
  await TournamentBracketParticipant.deleteMany();
  await TournamentBracketRound.deleteMany();

  return true;

  //return res.status(200).json({ msg: "Match network created" });
};

const getTournament = async (req, res) => {
  const { tournamentName } = req.query;

  console.log(tournamentName);

  const foundTournament = await TournamentBracket.findOne({
    name: tournamentName,
  });

  if (!foundTournament) {
    return res.status(404).json({ msg: "Could not find the tournament" });
  }

  let matches = [];
  let currentRoundDetails = null;
  let completedRounds = [];

  currentRoundDetails = foundTournament.roundHistory[foundTournament.currentRound-1]
  //iterating the tournement round by round
  for (let i = 0; i < foundTournament.roundHistory.length; i++) {
    //let currentRound = [];

    for (let j = 0; j < foundTournament.roundHistory[i].matches.length; j++) {
      matches.push(foundTournament.roundHistory[i].matches[j]);


      //gets matches of completed round
      // if (foundTournament.roundHistory[i].isCompleted) {
      //   currentRound.push(foundTournament.roundHistory[i].matches[j]);
      // }
    }

    if (foundTournament.roundHistory[i].isCompleted) {
      completedRounds.push(foundTournament.roundHistory[i]);
    }
  }

  let obj = {
    allMatches: matches,
    currentRound: currentRoundDetails,
    completedRounds: completedRounds,
  };

  return res.status(200).json(obj);
};

module.exports = {
  assignTeam,
  updateMatchStatus,
  createTournamentMatches,
  getTournament,
  registrationPhase,
  assignWinnerToNext,
};
