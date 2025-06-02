const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");

const connectDb = async (uri) => {
  try {
    const connection = await mongoose.connect(uri, {
      dbName: "EchoChat",
    });

    console.log(`Connected to MongoDb :${connection.connection.host}`);
  } catch (err) {
    console.error("Failed to connect to MongoDb:", err.message);
    process.exit(1);
  }
};

const sendToken = (res, user, code, message) => {
  const token = jwt.sign(
    {
      _id: user._id,
    },
    process.env.JWT_SECRET
  );

  console.log(token);

  return res.status(code).setHeader("Authorization", `Bearer ${token}`).json({
    success: true,
    token,
    message,
    user:{
      _id : user._id,
      username : user.username,
    },
  });
};

const emitEvent = (req, event, users, data) => {
  console.log("Event Emmitted");
};

module.exports = {
  sendToken,
  connectDb,
  emitEvent,
};
