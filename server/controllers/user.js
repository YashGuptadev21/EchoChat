const User = require("../models/user");
const { sendToken } = require("../utils/features");
const bcrypt = require("bcrypt");

const newUser = async (req, res) => {
  const { name, username, password, bio } = req.body;

  const avatar = {
    public_id: "Sdfsd",
    url: "asdfd",
  };

  const user = await User.create({
    name,
    username,
    bio,
    password,
    avatar,
  });

  sendToken(res, user, 201, "User Created Successfully");
};

const login = async (req, res, next) => {
  try {
    const { username, password } = req.body;

    const user = await User.findOne(username).select("+password");
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "Invlid Username",
      });
    }

    const isMatchPassword = await bcrypt(password, user.password);

    if (!isMatchPassword) {
      return res.status(400).json({
        message: "Invalid Password",
      });
    }
    sendToken(res, user, 200, `"Account Created" , ${user.name}`);
  } catch (err) {
    next(err);
  }
};

const myProfile = async (req, res, next) => {
  const user = await User.findById(req.user._id);
  res.status(200).json({
    success: true,
    data: req.user,
    user,
  });
};

const logout = (req, res, next) => {
  return res.status(200).json({
    success: true,
    token: "",
    message: "Logged out Successfully",
  });
};

const searchUser = (req,res) => {
  
}
module.exports = { newUser, login, myProfile, logout };
