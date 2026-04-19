const router = require("express").Router();
const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const SECRET = "secret";

console.log("Auth route loaded");

// ================= REGISTER =================
router.post("/register", async (req, res) => {
  try {
    console.log("Register API hit"); // debug

    const { email, password } = req.body;

    // check if user already exists
    const existing = await User.findOne({ email });
    if (existing) return res.send("User already exists");

    // hash password
    const hash = await bcrypt.hash(password, 10);

    const user = new User({
      email,
      password: hash,
    });

    await user.save();

    res.send("Registered Successfully");
  } catch (err) {
    console.log(err);
    res.status(500).send("Error in register");
  }
});

// ================= LOGIN =================
router.post("/login", async (req, res) => {
  try {
    console.log("Login API hit"); // debug

    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (!user) return res.send("Invalid Email");

    const match = await bcrypt.compare(password, user.password);

    if (!match) return res.send("Invalid Password");

    const token = jwt.sign(
      { id: user._id, role: user.role },
      SECRET
    );

    res.json({ token });
  } catch (err) {
    console.log(err);
    res.status(500).send("Error in login");
  }
});

module.exports = router;