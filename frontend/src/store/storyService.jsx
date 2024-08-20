import axios from "axios";

const API_URL = "http://localhost:5000/api/story/";

const createStory = async (storyData, userToken) => {
  const response = await axios.post(API_URL, storyData, {
    headers: {
      Authorization: `Bearer ${userToken}`,
    },
  });
  return response.data;
};

const storyService = {
  createStory,
};

export default storyService;
