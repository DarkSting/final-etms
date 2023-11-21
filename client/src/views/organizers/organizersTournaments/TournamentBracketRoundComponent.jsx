import React, { useEffect, useState } from 'react';
import { Button } from 'react-bootstrap';
import axios from "../../../middleware/axios";

const Player = ({ player, handlePlayerClick,playerindex,round,matchindex }) => {
  const handleClick = () => {
    handlePlayerClick(round,playerindex,matchindex,player.name);
  };

  return (
    <Button onClick={handleClick} style={{backgroundColor:'green',padding:'20px 80px'}}>
      {player.name}
    </Button>
  );
};

const Match = ({ match, handleMatchClick,matchindex,round }) => {
  const handlePlayerClick = (r,p,m,t) => {
    console.log(`${p} ${m}`);
    handleMatchClick(r,p,m,t)
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center',margin:'auto',backgroundColor:'' }}>
      <div style={{display:'flex',flexDirection:"column", gap:5,textAlign:'center'}}>
        <h3>Match {match.id}</h3>
        {
            match.participants.map((player,index)=>(
                <Player player={player} playerindex={index} round={round} matchindex={matchindex} handlePlayerClick={handlePlayerClick} />
            ))
        }
        
      </div>
    </div>
  );
};

const RoundDetails = ({roundDetails,setUpdate,tournamentName}) => {
  const [round, setRound] = useState({
    roundNumber: 1,
    matches: [
      {
        id: 1,
        round: 1,
        player1: { name: 'Player 1', score: 0 },
        player2: { name: 'Player 2', score: 0 },
      },
      {
        id: 2,
        round: 2,
        player1: { name: 'Player 1', score: 0 },
        player2: { name: 'Player 2', score: 0 },
      },
      // Add more matches for the round as needed
    ],
  });
  

  useEffect(()=>{

    setRound(roundDetails);

  },[roundDetails])


  const handleMatchClick = async (roundNum, playerindex, matchindex,teamName) => {
    console.log(`Round ${roundNum} - Player ${playerindex} match index ${matchindex} playerName${teamName}`);
    

    let obj = {}

    obj.round = roundNum;
    obj.wonParticipantIndex = playerindex;
    obj.matchIndex = matchindex;
    obj.tournamentName = tournamentName;
    
    await axios.put(
      `/api/organizers/update-match`,obj
    )

    let obj2 = {}
    obj2.round =roundNum+1;
    obj2.team = teamName;
    obj2.tournamentName = tournamentName;
    obj2.participantIndex = playerindex;
    obj2.matchIndex = matchindex;

    console.log(obj2)

    
    await axios.put(
        `/api/organizers/assign-team`,obj2
      )

      setUpdate(true);


  };
  

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <h2>Current Round {roundDetails.currentRound.round} Details</h2>
      {roundDetails?roundDetails.currentRound.matches.map((match,index) => (
        <Match key={match.id} match={match} round={roundDetails.currentRound.round} matchindex={index} handleMatchClick={handleMatchClick} />
      )):<></>}
    </div>
  );
};

export default RoundDetails;
