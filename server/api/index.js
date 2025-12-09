const express = require("express");
const app = express.Router();

//define api routes here
app.use("/users", require("./users"));
app.use("/products", require("./products"));
app.use("/auth", require("./auth"));

module.exports = app;
