const mongoose = require("mongoose");
const Experience = require("../models/experienceModel");
const asyncHandler = require("express-async-handler");

const createExperience = asyncHandler(async (req, res) => {
  const { title, country, content } = req.body;

  if (!title || !country || !content) {
    return res.status(400).json({ message: "All fields are required" });
  }

  const experience = await Experience.create({
    title,
    country,
    content,
    user: req.user.id,
    experienceId: new mongoose.Types.ObjectId(), // Create a new ObjectId for experienceId
  });

  res.status(201).json(experience);
});

const getExperiences = asyncHandler(async (req, res) => {
  try {
    const experiences = await Experience.find({});
    if (experiences.length === 0) {
      return res.status(404).json({ message: "No experiences found" });
    }
    res.status(200).json(experiences);
  } catch (error) {
    res.status(500).json({ message: "Error fetching experiences" });
  }
});

const getExperience = asyncHandler(async (req, res) => {
  const experienceId = req.params.id;

  if (!mongoose.Types.ObjectId.isValid(experienceId)) {
    return res.status(400).json({ message: "Invalid Experience ID" });
  }

  const experience = await Experience.findOne({ experienceId });

  if (!experience) {
    return res.status(404).json({ message: "Experience not found at GET" });
  }

  if (experience.user.toString() !== req.user.id.toString()) {
    return res
      .status(403)
      .json({ message: "Not authorized to view this experience" });
  }

  res.status(200).json(experience);
});

const deleteExperience = asyncHandler(async (req, res) => {
  const experienceId = req.params.id;

  if (!mongoose.Types.ObjectId.isValid(experienceId)) {
    return res.status(400).json({ message: "Invalid Experience ID" });
  }

  const experience = await Experience.findOne({ experienceId });

  if (!experience) {
    return res.status(404).json({ message: "Experience not found at DELETE" });
  }

  if (experience.user.toString() !== req.user.id.toString()) {
    return res.status(403).json({
      message: "Not authorized to update this experience",
      experienceUserId: experienceId,
      requestUserId: req.user.id.toString(),
    });
  }

  await experience.deleteOne();
  res.status(200).json({ id: experience.experienceId });
});

const updateExperience = asyncHandler(async (req, res) => {
  const { title, country, content } = req.body;
  const experienceId = req.params.id;

  // Find the experience by ID
  const experience = await Experience.findOne({ experienceId });

  // Check if the experience exists
  if (!experience) {
    return res.status(404).json({
      experienceId,
      title,
      country,
      content,
    });
  }

  // Check if the user is authorized to update this experience
  if (experience.user.toString() !== req.user.id.toString()) {
    return res
      .status(403)
      .json({ message: "Not authorized to update this experience" });
  }

  // Update the experience
  experience.title = title || experience.title;
  experience.country = country || experience.country;
  experience.content = content || experience.content;

  // Save the updated experience
  const updatedExperience = await experience.save();

  // Return the updated experience
  res.status(200).json(updatedExperience);
});

module.exports = {
  createExperience,
  getExperiences,
  getExperience,
  deleteExperience,
  updateExperience,
};
