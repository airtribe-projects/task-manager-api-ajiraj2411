require("dotenv").config();
const express = require("express");
const init = require("./startup");
const taskRoutes = require("./routes/task.routes");

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// 🔒 BLOCK REQUESTS UNTIL DB + SEED IS DONE
app.use(async (req, res, next) => {
  try {
    await init();
    next();
  } catch (err) {
    res.status(500).json({ error: "App not ready" });
  }
});

app.use("/tasks", taskRoutes);

module.exports = app;