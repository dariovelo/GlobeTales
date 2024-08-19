const asyncHandler = require("express-async-handler");
const User = require("../models/userModel");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const register = asyncHandler(async (req, res) => {
  const { name, email, password, password2 } = req.body;
  const userExists = await User.findOne({ email });

  if (password !== password2) {
    return res.status(400).send("Passwords do not match backend");
  }
  if (userExists) {
    return res.status(400).send("Email already exists");
  }

  //hash the password
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  const newUser = await User.create({
    name,
    email,
    password: hashedPassword,
  });
  res.status(200).json({
    _id: newUser._id,
    name: newUser.name,
    email: newUser.email,
    password: newUser.password,
    token: generateToken(newUser._id),
  });
});

const login = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });

  //verify the hashed password
  if (user && (await bcrypt.compare(password, user.password))) {
    return res.status(200).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      token: generateToken(user._id),
    });
  } else {
    return res.status(401).send("Invalid credentials");
  }
});

const profile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);
  return res.status(200).json(user);
});

//generate JWT
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: "30d",
  });
};

module.exports = {
  register,
  login,
  profile,
};
