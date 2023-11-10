const router = require("express").Router();
const HLTV = require("hltv-api").default;

// Route to fetch Counter-Strike news
router.get("/counter-strike", async (req, res) => {
  try {
    // Fetch news using the HLTV API
    const news = await HLTV.getNews();

    // Respond with the fetched news
    res.json(news);
  } catch (error) {
    res.status(500).json(error);
  }
});

module.exports = router;
