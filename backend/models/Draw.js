const mongoose = require("mongoose");

const DrawSchema = new mongoose.Schema({
  numbers: [Number],
  winners: [
    {
      email: String,
      matches: Number
    }
  ],
  date: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model("Draw", DrawSchema);