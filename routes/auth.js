const express = require("express");
const route = express.Router();
const bcrypt = require("bcryptjs");

const db = require("../data/helpers/usersDb");

const protected = (req, res, next) => {
  if (req.session.user) {
    next();
  } else {
    res.status(401).json({ message: "invalid username/password" });
  }
};

route.get("/users", protected, async (req, res) => {
  try {
    const result = await db.get();
    res.json(result);
  } catch (err) {
    res.send(err);
  }
});

route.get("/users/:id", protected, async (req, res) => {
  const { id } = req.params;
  try {
    const result = await db.get(id);
    if (result) {
      res.json(result);
    } else {
      res.status(404).json({ message: "not found" });
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
    const user = await db.check(userInfo);
    if (!user || !bcrypt.compareSync(userInfo.password, user.password)) {
      res.json({ message: "invalid username/password" });
    } else {
      req.session.user = user;
      res.json({ messge: `Welcome, ${user.username}` });
    }
  } catch (err) {
    res.status(500).json({ message: "You shall not pass!" });
  }
});

route.get("/logout", async (req, res) => {
  if (req.session) {
    req.session.destroy(err => {
      res.send("logged out");
    });
  } else {
    res.status(400).json({ message: "already logged out" });
  }
});

module.exports = route;
