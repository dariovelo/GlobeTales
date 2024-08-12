const express = require("express");
const router = express.Router();
const { createStory } = require("../controllers/storyControllers");

router.post("/create", createStory);

module.exports = router;
