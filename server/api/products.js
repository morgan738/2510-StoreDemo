const express = require("express");
const app = express.Router();
const { fetchProducts } = require("../db/products");

app.get("/", async (req, res, next) => {
  res.send(await fetchProducts());
});

module.exports = app;
