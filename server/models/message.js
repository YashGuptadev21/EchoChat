const mongoose = require("mongoose");

const messageSchema = new Schema({
  content: String,
  attachments: [
    {
      public_id: {
        type: String,
        required: true,
      },
      url: {
        type: String,
        required: true,
      },
    },
  ],
  sender: {
    type: mongoose.Types.ObjectId,
    ref: "User",
    required: true,
  },
  chat: {
    type: mongoose.Types.ObjectId,
    ref: "Chat",
    required: true,
  },
});

const Message = mongoose.Model("Message", messageSchema);

module.exports = Message;
