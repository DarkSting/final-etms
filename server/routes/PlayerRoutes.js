const router = require("express").Router();
const playerController = require("../controllers/playerController");
const { authenticateUser } = require("../middleware/authentication");

// Player registration route
router.post("/register", playerController.registerPlayer);

// Player login route
router.post("/login", playerController.loginPlayer);

// Player view profile route
router.get(
  "/view-profile",
  authenticateUser,
  playerController.getPlayerProfile
);

// Player edit profile route
router.put(
  "/edit-profile",
  authenticateUser,
  playerController.updatePlayerProfile
);

module.exports = router;
