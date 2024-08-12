const Story = require("../models/storyModel");
const asyncHandler = require("express-async-handler");

const createStory = asyncHandler(async (req, res) => {
  const { title, category, content } = req.body;

  const storyExists = await Story.findById("66ba6575658a6911f247de9e");

  if (storyExists) {
    return res.status(400).json({ message: "Story already exists" });
  }

  const story = await Story.create({
    title,
    category,
    content,
  });

  if (story) {
    res.status(201).json(story);
  }

  res.status(400).json({ message: "Failed to create story" });
});

module.exports = { createStory };
