const express = require("express");
const router = express.Router();
const { signIn, signUp, userInfo } = require("../controllers/userControllers");

router.post("/signup", signUp);
router.post("/signin", signIn);
router.get("/userinfo", userInfo);

module.exports = router;
