const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");

const connectDb = (uri) => {
  mongoose
    .connect(uri, {
      dbName: "EchoChat",
    })
    .then((data) => console.log(`Connected to DB: ${data.connection.host}`))
    .catch((err) => {
      throw err;
    });
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
    user,
  });
};

module.exports = {
  sendToken,
  connectDb,
};
