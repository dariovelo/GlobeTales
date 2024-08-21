import axios from "axios";

const API_URL = "http://localhost:5000/api/story/";

const createStory = async (storyData, userToken) => {
  const response = await axios.post(API_URL, storyData, {
    headers: {
      Authorization: `Bearer ${userToken}`,
    },
  });

  if (response.data) {
    localStorage.setItem("story", JSON.stringify(response.data));
  }
  return response.data;
};

const getStory = async (userToken) => {
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

const clearStoryCache = async () => {
  localStorage.removeItem("story");
};

const storyService = {
  createStory,
  getStory,
  clearStoryCache,
};

export default storyService;
