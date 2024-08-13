const express = require("express");
const router = express.Router();
const {
  createStory,
  deleteStory,
  getStory,
} = require("../controllers/storyControllers");

const { protect } = require("../middleware/authMiddleware");

router.route("/").post(protect, createStory).get(protect, getStory);
router.route("/:id").delete(protect, deleteStory);

module.exports = router;
