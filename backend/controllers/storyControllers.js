const Story = require("../models/storyModel");
const asyncHandler = require("express-async-handler");

// Controller to create a new story
const createStory = asyncHandler(async (req, res) => {
  const { title, category, content, status = "draft" } = req.body; // Default status to 'draft'

  if (!title || !category || !content) {
    return res.status(400).json({ message: "All fields are required" });
  }

  const story = await Story.create({
    title,
    category,
    content,
    status,
    user: req.user.id,
  });

  res.status(201).json({
    id: story.id,
    title: story.title,
    category: story.category,
    content: story.content,
    status: story.status,
    user: story.user,
    createdAt: story.createdAt,
  });
});

// Controller to get all stories (published and drafts) for the authenticated user
const getStories = asyncHandler(async (req, res) => {
  const stories = await Story.find({ user: req.user.id });

  if (stories.length === 0) {
    return res.status(404).json({ message: "No stories found for this user" });
  }

  res.status(200).json(stories);
});

// Controller to get a single story by ID
const getStory = asyncHandler(async (req, res) => {
  const story = await Story.findById(req.params.id);

  if (!story) {
    return res.status(404).json({ message: "Story not found" });
  }

  if (story.user.toString() !== req.user.id.toString()) {
    return res
      .status(403)
      .json({ message: "Not authorized to view this story" });
  }

  res.status(200).json(story);
});

// Controller to delete a story
const deleteStory = asyncHandler(async (req, res) => {
  const story = await Story.findById(req.params.id);

  if (!story) {
    return res.status(404).json({ message: "Story not found" });
  }

  if (story.user.toString() !== req.user.id.toString()) {
    return res
      .status(403)
      .json({ message: "Not authorized to delete this story" });
  }

  await story.deleteOne();
  res.status(200).json({ id: story._id });
});

module.exports = { createStory, getStories, getStory, deleteStory };
