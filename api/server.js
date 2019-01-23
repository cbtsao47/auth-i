const express = require("express");
const server = express();
const configureMiddleware = require("../config/middleware");
const auth = require("../routes/auth");
const restricted = require("../routes/restricted");
const session = require("express-session");
const knexSessionStore = require("connect-session-knex")(session);
const protected = require("../common/authenticate");
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

configureMiddleware(server);

server.use(session(sessionConfig));
server.use("/api/restricted", protected, restricted);
server.use("/api", auth);
module.exports = server;
