const express = require("express");
const route = express.Router();

route.get("/:id", async (req, res) => {
  try {
    res.status(200).json({ message: "you found the secret!!!!" });
  } catch (err) {
    res.status(500).json({ message: "internal server error" });
  }
});

module.exports = route;
