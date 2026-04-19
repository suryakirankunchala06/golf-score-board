const router = require("express").Router();
const User = require("../models/User");
const auth = require("../middleware/auth");

// ADD SCORE 
router.post("/score", auth, async (req, res) => {
  try {
    let { score, date } = req.body;

    score = Number(score);

    if (!score || isNaN(score) || score < 1 || score > 45) {
      return res.send("Score must be between 1 and 45");
    }

    if (!date) {
      return res.send("Date is required");
    }

    const user = await User.findById(req.user.id);

    if (user.scores.find(s => s.date === date)) {
      return res.send("Score already exists for this date");
    }

    user.scores.push({ score, date });

    if (user.scores.length > 5) {
      user.scores.shift();
    }

    await user.save();

    res.send("Score added");

  } catch (err) {
    console.log(err);
    res.send("Error adding score");
  }
});

// GET SCORES 
router.get("/scores", auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id);

    const cleanScores = user.scores.filter(s => s.score && s.date);

    res.json(cleanScores);

  } catch (err) {
    console.log(err);
    res.send("Error fetching scores");
  }
});

// DELETE SCORE 
router.post("/delete-score", auth, async (req, res) => {
  try {
    const { date } = req.body;

    const user = await User.findById(req.user.id);

    user.scores = user.scores.filter(s => s.date !== date);

    await user.save();

    res.send("Score deleted");

  } catch (err) {
    console.log(err);
    res.send("Error deleting score");
  }
});

//  SUBSCRIBE 
router.post("/subscribe", auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id);

    user.subscribed = true;

    await user.save();

    res.send("Subscribed successfully");

  } catch (err) {
    console.log(err);
    res.send("Subscription failed");
  }
});

router.get("/fix", async (req, res) => {
  try {
    const users = await User.find();

    for (let user of users) {
      user.scores = user.scores.filter(s => s.score && s.date);
      await user.save();
    }

    res.send("Database cleaned");

  } catch (err) {
    console.log(err);
    res.send("Error cleaning data");
  }
});

module.exports = router;