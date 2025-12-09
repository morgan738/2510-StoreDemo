const express = require("express");
const app = express.Router();
const { authenticate } = require("../db/auth");
const { isLoggedIn } = require("../middleware/auth");

app.post("/login", async (req, res, next) => {
  const token = await authenticate(req.body);
  res.send(token);
});

app.get("/me", isLoggedIn, async (req, res, next) => {
  res.send(req.user);
});

module.exports = app;
