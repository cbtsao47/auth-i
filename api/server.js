const express = require("express");
const server = express();
const configureMiddleware = require("../config/middleware");

configureMiddleware(server);

module.exports = server;
