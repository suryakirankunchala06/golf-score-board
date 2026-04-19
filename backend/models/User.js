const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  email: String,
  password: String,
  role: { type: String, default: "user" },

  subscription: {
    status: { type: String, default: "inactive" },
    plan: String,
    expiry: Date,
  },

  charity: {
    name: String,
    percentage: { type: Number, default: 10 },
  },

  scores: [
    {
      score: Number,
      date: String,
    },
  ],
});

module.exports = mongoose.model("User", userSchema);