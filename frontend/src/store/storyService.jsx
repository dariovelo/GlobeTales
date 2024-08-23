import axios from "axios";

const API_URL = "http://localhost:5000/api/story/";

const createStory = async (storyData, userToken) => {
  const response = await axios.post(API_URL, storyData, {
    headers: {
      Authorization: `Bearer ${userToken}`,
    },
  });

  if (response.data) {
    const existingStories = JSON.parse(localStorage.getItem("story")) || [];
    const updatedStories = Array.isArray(existingStories)
      ? [...existingStories, response.data]
      : [response.data];
    localStorage.setItem("story", JSON.stringify(updatedStories));
  }
  return response.data;
};

const deleteStory = async (storyId, userToken) => {
  const response = await axios.delete(`${API_URL}${storyId}`, {
    headers: {
      Authorization: `Bearer ${userToken}`,
    },
  });

  if (response.data) {
    const existingStories = JSON.parse(localStorage.getItem("story")) || [];
    const updatedStories = Array.isArray(existingStories)
      ? existingStories.filter((item) => item._id !== storyId)
      : [];
    localStorage.setItem("story", JSON.stringify(updatedStories));
  } else {
    console.error("The story in localStorage is not an array or is missing.");
  }

  return response.data;
};

const getStories = async (userToken) => {
  const response = await axios.get(API_URL, {
    headers: {
      Authorization: `Bearer ${userToken}`,
    },
  });

  if (response.data) {
    localStorage.setItem("story", JSON.stringify(response.data));
  }
  return response.data;
};

const getStory = async (storyId, userToken) => {
  const response = await axios.get(`${API_URL}${storyId}`, {
    headers: {
      Authorization: `Bearer ${userToken}`,
    },
  });

  if (response.data) {
    return response.data; // Return the single story directly
  }
};

const clearStoryCache = async () => {
  localStorage.removeItem("story");
};

const storyService = {
  createStory,
  getStories, // Fetch all stories
  getStory, // Fetch a single story by ID
  clearStoryCache,
  deleteStory,
};

export default storyService;
