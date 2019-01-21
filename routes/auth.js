const express = require("express");
const route = express.Router();

route.use("/register", async (req, res) => {
  res.send("working");
});
module.exports = route;
