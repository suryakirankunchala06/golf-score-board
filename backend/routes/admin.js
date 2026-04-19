const router = require("express").Router();
const Draw = require("../models/Draw");

router.get("/draws", async (req, res) => {
  const draws = await Draw.find().sort({ date: -1 });
  res.json(draws);
});

module.exports = router;