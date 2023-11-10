const Team = require("../models/Team")


//getting the teams 
const getAvailableTeams = async(req,res)=>{


    const foundTeams = await Team.find({isOpen:false});

    if(foundTeams){

        return res.status(200).json({foundTeams});

    }
    else{

        return res.status(500).json({msg:"no available teams", code:404})
    }


}

//closes the team availability
const updateTeamAvailabilty = async(req,res)=>{

    const{teamID} = req.body;


    try{
        await Team.findOneAndUpdate({_id:teamID},{isOpen:true});

        return res.status(200).json({msg:'team is closed for invitations'})
    }
    catch(error){
        return res.status(500).json({msg:error.message});
    }

}

//sending request for team joining
const sendInvitation = async(req,res)=>{

    const{playerID,description,teamID} = req.body;



    try{

    const foundAnExitingInvitation = await PlayerInvitation.findOne({$and:[{playerID:playerID},{isAccept:false},{teamID:teamID}]})

    if(foundAnExitingInvitation){
        return res.status(500).json({msg:'you cannot send not more than 1 request for per team'})
    }
    
    const newInvitation = new PlayerInvitation({
        playerID:playerID,
        description:description,
        teamID:teamID,
    })

    await newInvitation.save();

    return res.status(200).json({msg:'Invitation is sent'})

}
catch(error){
    return res.status(500).json({msg:error.message})
}

}

const acceptInvitation = async(req,res)=>{


    const{playerID,teamID} = req.body;

    try{
        const foundPlayerRequest = await PlayerInvitation.findOneAndUpdate({$and:[{playerID:playerID},{isAccept:false},{teamID:teamID}]},{isAccept:true})
        
        return res.status(200).json({msg:'request accepted'})
    }
    catch(error){

        return res.status(500).json({msg:'request cannot update'})
    }
    

}

const rejectInvitation = async(req,res)=>{


    const{playerID,teamID} = req.body;

    try{
        const foundPlayerRequest = await PlayerInvitation.findOneAndUpdate({$and:[{playerID:playerID},{teamID:teamID}]},{isRejected:true})
        
        return res.status(200).json({msg:'request rejected'})
    }
    catch(error){

        return res.status(500).json({msg:'request cannot update'})
    }
    

}



   

