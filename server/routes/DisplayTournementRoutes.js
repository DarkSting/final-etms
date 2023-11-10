const router = require("express").Router();
const { CreateTournementMatches, getTournement, assignTeam, updateMatchStatus } = require("../controllers/DisplayTournementController");

router.post("/create-tournement", CreateTournementMatches);
router.get("/get-tournement", getTournement);
router.post("/assign-tournement-team", assignTeam);
router.put("/update-tournement-match", updateMatchStatus);

module.exports = router;