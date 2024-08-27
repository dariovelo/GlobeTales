const express = require("express");
const router = express.Router();
const {
  createExperience,
  getExperiences,
  getExperience,
  deleteExperience,
  updateExperience,
} = require("../controllers/experienceControllers");

const { protect } = require("../middleware/authMiddleware");

// Route for creating a story and getting all stories
router.route("/").post(protect, createExperience).get(getExperiences); //get all stories

// Route for getting a single story and deleting a story
router
  .route("/:id")
  .get(protect, getExperience)
  .delete(protect, deleteExperience)
  .put(protect, updateExperience);

module.exports = router;
