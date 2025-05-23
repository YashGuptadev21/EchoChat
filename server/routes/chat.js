const express = require("express");
const isAuthenticated = require("../middlewares/auth");

const app = express.Router();

app.use(isAuthenticated);


module.exports = app;
