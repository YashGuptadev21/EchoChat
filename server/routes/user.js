const express = require("express");
const { singleAvatar } = require("../middlewares/multer");
const { newUser, myProfile, logout } = require("../controllers/user");
const isAuthenticated = require("../middlewares/auth");

const app = express.Router();

app.post("/new", singleAvatar, newUser);
app.post("/logout", logout);
app.use(isAuthenticated);
app.get("/me", myProfile);

module.exports = app;
