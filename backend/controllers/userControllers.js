const asyncHandler = require("express-async-handler");

const signUp = asyncHandler(async (req, res) => {
  const userData = req.body;
  if (userData.password !== userData.password2) {
    return res.status(400).send("Passwords do not match");
  }
  res.send(
    `User data: ${userData.email}, ${userData.password}, ${userData.password2}`
  );
});

const signIn = asyncHandler(async (req, res) => {
  const userData = req.body;
  res.send(`User data: ${userData.email}, ${userData.password}`);
});

const userInfo = asyncHandler(async (req, res) => {
  res.send("userInfo works");
});

module.exports = {
  signUp,
  signIn,
  userInfo,
};
