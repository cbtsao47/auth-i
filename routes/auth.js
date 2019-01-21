const express = require("express");
const route = express.Router();
const db = require("../data/helpers/usersDb");

route.get("/register", async (req, res) => {
  try {
    const result = await db.get();
    res.json(result);
  } catch (err) {
    res.send(err);
  }
});

route.get("/register/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const result = await db.get(id);
    if (result.length) {
      res.json(result);
    } else {
      res.status(404).json({ message: "no" });
    }
  } catch (err) {
    res.status(500).json({ message: "internal server error" });
  }
});

route.post("/register", async (req, res) => {
  const userInfo = req.body;
  try {
    const result = await db.create(userInfo);
    if (!result.length) {
      res.status(400).json({ message: "User already exists" });
    } else {
      res.json({ message: "User created" });
    }
  } catch (err) {
    res.status(500).json({ message: "internal server error" });
  }
});

module.exports = route;
