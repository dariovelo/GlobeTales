const express = require("express");
const router = express.Router();
const {
  createStory,
  getStories,
  getStory,
  deleteStory,
} = require("../controllers/storyControllers");

const { protect } = require("../middleware/authMiddleware");

// Route for creating a story and getting all stories
router.route("/").post(protect, createStory).get(protect, getStories); //get all stories

// Route for getting a single story and deleting a story
router
  .route("/:id")
  .get(protect, getStory) // Get a single story by ID
  .delete(protect, deleteStory);

module.exports = router;
