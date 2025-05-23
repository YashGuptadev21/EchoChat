const mongoose = require("mongoose");

const requestSchema = new Schema(
  {
    status: {
      type: String,
      default: "pending",
      enum: ["completed", "pending", "rejected"],
    },
    sender: {
      type: mongoose.Types.ObjectId,
      ref: "User",
      required: true,
    },
    reciever: {
      types: mongoose.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Request = mongoose.model("Request", requestSchema);

module.exports = Request;
