const express = require("express");
const server = express();
const configureMiddleware = require("../config/middleware");
const auth = require("../routes/auth");

configureMiddleware(server);

server.use("/api", auth);
module.exports = server;
