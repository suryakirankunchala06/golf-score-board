const router = require("express").Router();
const User = require("../models/User");
const Draw = require("../models/Draw");

// RUN DRAW 
router.get("/run", async (req, res) => {
  try {
    const numbers = Array.from({ length: 5 }, () =>
      Math.floor(Math.random() * 45) + 1
    );

    const users = await User.find();
    const winners = [];

    users.forEach(user => {
      if (!user.scores) return;

      const matches = user.scores.filter(s =>
        numbers.includes(s.score)
      ).length;

      if (matches >= 3) {
        winners.push({
          email: user.email,
          matches
        });
      }
    });

    const draw = new Draw({
      numbers,
      winners,
      date: new Date()
    });

    await draw.save();

    // keep only last 5 draws
    const allDraws = await Draw.find().sort({ date: -1 });

    if (allDraws.length > 5) {
      const extra = allDraws.slice(5);
      for (let d of extra) {
        await Draw.findByIdAndDelete(d._id);
      }
    }

    res.json(draw);

  } catch (err) {
    console.log(err);
    res.send("Draw error");
  }
});

// GET PREVIOUS DRAWS 
router.get("/history", async (req, res) => {
  try {
    const draws = await Draw.find().sort({ date: -1 });
    res.json(draws);
  } catch (err) {
    console.log(err);
    res.send("Error fetching history");
  }
});

module.exports = router;