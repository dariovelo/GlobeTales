const Experience = require("../models/experienceModel");
const asyncHandler = require("express-async-handler");

// Controller to create a new experience
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
  });

  res.status(201).json({
    id: experience.id,
    title: experience.title,
    country: experience.country,
    content: experience.content,
    user: experience.user,
    createdAt: experience.createdAt,
  });
});

// Controller to get all experiences
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

// Controller to get a single experience by ID
const getExperience = asyncHandler(async (req, res) => {
  const experience = await Experience.findById(req.params.id);

  if (!experience) {
    return res.status(404).json({ message: "Experience not found" });
  }

  if (experience.user.toString() !== req.user.id.toString()) {
    return res
      .status(403)
      .json({ message: "Not authorized to view this experience" });
  }

  res.status(200).json(experience);
});

// Controller to delete an experience
const deleteExperience = asyncHandler(async (req, res) => {
  const experience = await Experience.findById({ _id: req.params.id });

  if (!experience) {
    return res.status(404).json({ message: "Experience not found" });
  }

  if (experience.user.toString() !== req.user.id.toString()) {
    return res
      .status(403)
      .json({ message: "Not authorized to delete this experience" });
  }

  await experience.deleteOne();
  res.status(200).json({ id: experience._id });
});

module.exports = {
  createExperience,
  getExperiences,
  getExperience,
  deleteExperience,
};
