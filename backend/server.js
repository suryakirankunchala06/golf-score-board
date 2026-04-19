const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

// ROUTES
app.use("/api/auth", require("./routes/auth"));
app.use("/api/user", require("./routes/user"));
app.use("/api/draw", require("./routes/draw"));
app.use("/api/admin", require("./routes/admin"));

// DB
mongoose.connect("mongodb://127.0.0.1:27017/golf")
.then(() => console.log("MongoDB Connected"))
.catch(err => console.log(err));

// SERVER
app.listen(5000, () => {
  console.log("Server running on port 5000");
});