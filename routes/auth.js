const express = require("express");
const route = express.Router();
const bcrypt = require("bcryptjs");
const db = require("../data/helpers/usersDb");

route.get("/users", async (req, res) => {
  try {
    const result = await db.get();
    res.json(result);
  } catch (err) {
    res.send(err);
  }
});

route.get("/users/:id", async (req, res) => {
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
  userInfo.password = bcrypt.hashSync(userInfo.password);
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

route.post("/login", async (req, res) => {
  const userInfo = req.body;
  try {
    const result = await db.check(userInfo);
    if (!result || !bcrypt.compareSync(userInfo.password, result[0].password)) {
      console.log("test");
      res.json({ message: "invalid username/password" });
    } else {
      res.json({ messge: "loggedIn" });
    }
  } catch (err) {
    res.status(500).json({ message: "internal server error" });
  }
});

module.exports = route;
