const express = require("express");
const route = express.Router();
const bcrypt = require("bcryptjs");
const session = require("express-session");
const knexSessionStore = require("connect-session-knex")(session);
const db = require("../data/helpers/usersDb");
const sessionConfig = {
  name: "Monkey", //default is sid
  secret: "thisismysecret",
  cookie: {
    maxAge: 1000 * 60 * 10,
    secure: false // only send the cookie over https, should be true in production
  },
  httpOnly: true, //js can't touch this cookie
  resave: false,
  saveUninitialized: false,
  store: new knexSessionStore({
    tablename: "sessions",
    sidfieldname: "sid",
    knex: require("../data/dbConfig"),
    createtable: true,
    clearInterval: 1000 * 60 * 10
  })
};

route.use(session(sessionConfig));

function protected(req, res, next) {
  if (req.session.user) {
    next();
  } else {
    res.status(401).json({ message: "invalid username/password" });
  }
}

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
    const user = await db.check(userInfo);
    if (!user || !bcrypt.compareSync(userInfo.password, user.password)) {
      res.json({ message: "invalid username/password" });
    } else {
      req.session.user = user;
      console.log(user);
      res.json({ messge: `Welcome, ${user.username}` });
    }
  } catch (err) {
    res.status(500).json({ message: "You shall not pass!" });
  }
});

route.get("/logout", async (req, res) => {
  if (req.session) {
    req.session.destroy();
  } else {
    res.status(400).json({ message: "already logged out" });
  }
});

module.exports = route;
