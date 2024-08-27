const asyncHandler = require("express-async-handler");
const User = require("../models/userModel");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const register = asyncHandler(async (req, res) => {
  const { name, email, password, password2 } = req.body;
  const userExists = await User.findOne({ email });

  if (password !== password2) {
    console.log(password, "dssdds", password2);
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
    visitedCountries: newUser.visitedCountries,
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
      visitedCountries: user.visitedCountries,
      token: generateToken(user._id),
    });
  } else {
    return res.status(401).send("Invalid credentials");
  }
});

const updateVisitedCountries = asyncHandler(async (req, res) => {
  const { country } = req.body;

  if (!country) {
    return res.status(400).json({ message: "Country is required" });
  }

  const user = await User.findById(req.user._id);

  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }

  user.visitedCountries.push(country);

  await user.save();

  return res.status(200).json({
    message: "Visited country updated",
    visitedCountries: user.visitedCountries,
  });
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

const getUserDetailsById = asyncHandler(async (req, res) => {
  const { userId } = req.params; // get userId from URL params

  if (!userId) {
    return res.status(400).json({ message: "User ID is required" });
  }

  const user = await User.findById(userId).select("name visitedCountries"); // Select only the needed fields

  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }

  return res.status(200).json({
    name: user.name,
    visitedCountries: user.visitedCountries,
  });
});

module.exports = {
  register,
  login,
  profile,
  updateVisitedCountries,
  getUserDetailsById,
};
