const express = require("express");
const isAuthenticated = require("../middlewares/auth");
const { newRoom, getMyChats, sendAttachments } = require("../controllers/chat");
const { attachmentsMulter } = require("../middlewares/multer");

const app = express.Router();

app.use(isAuthenticated);

app.post("/new", newRoom);
app.get("/getChats", getMyChats);
app.post("/attachments", attachmentsMulter, sendAttachments);

module.exports = app;
