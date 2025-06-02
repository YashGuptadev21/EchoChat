const { ALERT, REFETCH_CHATS, NEW_ATTACHMENT } = require("../constants/events");
const Chat = require("../models/chat");
const Message = require("../models/message");
const User = require("../models/user");
const { emitEvent } = require("../utils/features");

const newRoom = async (req, res) => {
  const { roomName, members } = req.body;

  if (members.length < 2)
    return res.status(400).json({
      sucesss: false,
      message: "Group Chat must have atleast 3 members",
    });
  const allMembers = [...members];

  await Chat.create({
    roomName,
    roomChat: true,
    creator: req.user,
    members: allMembers,
  });

  emitEvent(req, ALERT, allMembers, `Welcome to ${roomName} group`);
  emitEvent(req, REFETCH_CHATS, members);

  return res.status(201).json({
    success: true,
    message: "Group chat created",
  });
};

const getMyChats = async (req, res) => {
  const chats = await Chat.find({ members: req.user._id }).populate(
    "members",
    "username"
  );

  return res.status(201).json({
    success: true,
    chats,
  });
};

const sendAttachments = async (req, res, next) => {
  const { chatId } = req.body;

  const [chat, me] = await Promise.all([
    Chat.findById(chatId),
    User.findById(req.user, "username"),
  ]);

  const files = req.files || [];
  if (!chat) {
    return next(new Error("Chat Not found"));
  }

  if (files.length < 1) {
    return next(new Error("Please Provide Attachments"));
  }

  const attachments = [];

  const messageForDb = {
    content: "",
    attachments,
    sender: me._id,
    chat: chatId,
  };

  const messageForRealTime = {
    ...messageForDb,
    sender: {
      _id: me._id,
      username: me.username,
    },
  };

  const message = await Message.create(messageForDb);

  emitEvent(req, NEW_ATTACHMENT, chat.members, {
    message: messageForRealTime,
    chatId,
  });

  return res.status(200).json({
    success: true,
    message,
  });
};
module.exports = { newRoom, getMyChats, sendAttachments };
