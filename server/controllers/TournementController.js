const { MatchModel } = require("../Models/Match");
const { ParticipantModel } = require("../Models/ParticipantModel");
const { RoundModel } = require("../Models/RoundModel");
const { TournementModel } = require("../Models/TournementModel");

//assignTeam
const assignTeam = async(req,res)=>{

  const{round,matchIndex,team,tournementName,participantIndex,scheduledate} = req.body;

  let foundOne = await TournementModel.findOne({

    name:tournementName

  })

  if(!foundOne){

    return res.status(404).json({msg:'coudnt find the tournement'})

  }

  try{

    const date = new Date(scheduledate);

    foundOne.roundHistory[round-1].matches[matchIndex].participants[participantIndex].name = team;
    foundOne.roundHistory[round-1].matches[matchIndex].startTime= date;
    foundOne.save();

    return res.status(200).json({msg:"ok"})

  }catch(error){
    return res.status(500).json(error)
  }


}


const updateMatchStatus = async(req,res)=>{

  const{round,matchIndex,wonparticipantIndex,matchstatus,tournementName} = req.body;

  const lostparticipantIndex = wonparticipantIndex==1?0:1

  const status = [null, "PLAYED", "NO_SHOW", "WALK_OVER", "NO_PARTY"];

  let foundOne = await TournementModel.findOne({

    name:tournementName

  })

  if(!foundOne){

    return res.status(404).json({msg:'coudnt find the tournement'})

  }

  try{


    //updating wonparticipant index
    foundOne.roundHistory[round-1].matches[matchIndex].participants[wonparticipantIndex].status = status[matchstatus];
    foundOne.roundHistory[round-1].matches[matchIndex].participants[wonparticipantIndex].isWinner = true;
    foundOne.roundHistory[round-1].matches[matchIndex].participants[wonparticipantIndex].resultText = "Won"

    //updating lostparticipant index
    foundOne.roundHistory[round-1].matches[matchIndex].participants[lostparticipantIndex].status = status[matchstatus];
    foundOne.roundHistory[round-1].matches[matchIndex].participants[lostparticipantIndex].isWinner = false;
    foundOne.roundHistory[round-1].matches[matchIndex].participants[lostparticipantIndex].resultText = "Lost"
    foundOne.save();

    return res.status(200).json({msg:"ok"})

  }catch(error){
    return res.status(500).json(error)
  }
  

}

//creating the tournement 
const CreateTournementMatches = async (req, res) => {
  //teams : array of teams
  const { teams, tournementName } = req.body;

  let count = teams.length;
  let rounds = 0;

  if (count < 4) {
    return res
      .status(500)
      .json({ msg: "teams not sufficient to create a tournement" });
  }

  //counting the match rounds
  for (let i = 2; i < 5; i++) {
    if (count === Math.pow(2, i)) {
      rounds = i;
      console.log(count);
    }
  }

  if (rounds === 0) {
    return res.status(500).json({ msg: "teams count should be equal to 2^n" });
  }

  let currentMatchCount = count / 2;

  //store rounds
  let rd = [];

  let currentMatchId = 1000
  //creating matches according to team count
  for (let i = 0; i < rounds; i++) {
    //store matches in each round
    let mt = [];

    for (let j = 0; j < currentMatchCount; j++) {

      let participants = [];

      for(let k=2;k>0;k--){
        const savedParticipant = await new ParticipantModel({

        }).save()

        participants.push(savedParticipant);
      }

      const currentMatch = new MatchModel({
        id:currentMatchId,
        tournamentRoundText:(i+1).toString(),
        participants:participants
      });

      let savedMatch = await currentMatch.save();
      mt.push(savedMatch);
      currentMatchId++;
    }

    const savedRound = await new RoundModel({
      round: i+1,
      matches: mt,
    }).save();

    rd.push(savedRound);

    currentMatchCount = currentMatchCount / 2;
  }

  //creating the match network
  for (let i = 0; i < rd.length; i++) {
    //iterating the 2d dynamic array
    for (let j = 0; j < rd[i].matches.length; j++) {
      if ((j + 1) % 2 === 0 && i + 1 < rd.length) {

        //getting the next rounds match 
        let nextMatchID = rd[i+1].matches[((j + 1) / 2 )-1].id

        let previous = rd[i].matches[j-1];
        let current  = rd[i].matches[j];

        //assigning the match id to the current iterative matches
        previous.nextMatchId = nextMatchID;
        current.nextMatchId = nextMatchID;


      }
    }

    try{
      (await rd[i]).save()
    }
    catch(error){

      return res.status(500).json({msg:error.message})
    }
    
  }

  const newTournement = new TournementModel({
    name:tournementName,
    currentRound:1,
    roundHistory:rd
  })
  
  newTournement.save();

  await MatchModel.deleteMany();
  await ParticipantModel.deleteMany();
  await RoundModel.deleteMany();

  return res.status(200).json({ msg: "match network created" });

};

//finding the tournement by name
const getTournement = async(req,res)=>{

  const {tournementName} = req.query;

  const foundTournement = await TournementModel.findOne({
    name:tournementName
  })

  if(!foundTournement){
    return res.status(404).json({msg:'coudnt find the tournement'})
  }

  let matches = [];

  //getting matches of the tournement 
  for(let i=0;i<foundTournement.roundHistory.length;i++){
    for(let j=0;j<foundTournement.roundHistory[i].matches.length;j++){
      matches.push(foundTournement.roundHistory[i].matches[j])
    }
  }

  console.log(matches);

  return res.status(200).json(matches)
}

module.exports = {
  CreateTournementMatches,
  getTournement,
  assignTeam,
  updateMatchStatus
};