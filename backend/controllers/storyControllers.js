const Story = require("../models/storyModel");
const asyncHandler = require("express-async-handler");

const createStory = asyncHandler(async (req, res) => {
  const { title, category, content } = req.body;

  const storyExists = await Story.findById("66bbc29adb0cc819256bc39a");

  if (storyExists) {
    return res.status(400).json({ message: "Story already exists" });
  }

  const story = await Story.create({
    title: title,
    category: category,
    content: content,
    user: req.user.id,
  });

  if (story) {
    return res.status(201).json({
      id: story._id,
      title: story.title,
      category: story.category,
      content: story.content,
      user: story.user._id,
    });
  } else {
    return res.status(400).json({ message: "Failed to create story" });
  }
});

const getStory = asyncHandler(async (req, res) => {
  const story = await Story.find({ user: req.user.id });
  if (story) {
    return res.status(200).json(story);
  } else {
    return res.status(404).json({ message: "Story not found" });
  }
});

const deleteStory = asyncHandler(async (req, res) => {
  const userStories = await Story.find({ user: req.user.id });
  if (!userStories) {
    return res.status(404).json({ message: "No stories found for this user" });
  }
  const story = await Story.findById(req.params.id);
  if (!story) {
    return res.status(404).json({ message: "Story not found" });
  }
  await story.deleteOne();
  res.status(200).json({ id: req.params.id });
});

module.exports = { createStory, getStory, deleteStory };
