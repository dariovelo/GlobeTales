import axios from "axios";

const API_URL = "http://localhost:5000/api/experiences/"; // Update API URL

// Create a new experience
const createExperience = async (experienceData, userToken) => {
  const response = await axios.post(API_URL, experienceData, {
    headers: {
      Authorization: `Bearer ${userToken}`,
    },
  });

  if (response.data) {
    const existingExperiences =
      JSON.parse(localStorage.getItem("experiences")) || [];
    const updatedExperiences = Array.isArray(existingExperiences)
      ? [...existingExperiences, response.data]
      : [response.data];
    localStorage.setItem("experiences", JSON.stringify(updatedExperiences));
  }
  return response.data;
};

// Delete an experience by ID
const deleteExperience = async (experienceData, userToken) => {
  const experienceId = experienceData.id
    ? experienceData.id
    : experienceData._id;
  const response = await axios.delete(`${API_URL}${experienceId}`, {
    headers: {
      Authorization: `Bearer ${userToken}`,
    },
  });

  if (response.data) {
    const existingExperiences =
      JSON.parse(localStorage.getItem("experiences")) || [];
    const updatedExperiences = Array.isArray(existingExperiences)
      ? existingExperiences.filter((item) => item.id !== experienceId)
      : [];
    localStorage.setItem("experiences", JSON.stringify(updatedExperiences));
  } else {
    console.error(
      "The experiences in localStorage is not an array or is missing."
    );
  }

  return response.data;
};

// Get all experiences
const getExperiences = async (userToken) => {
  const response = await axios.get(API_URL);

  if (response.data) {
    localStorage.setItem("experiences", JSON.stringify(response.data));
  }
  return response.data;
};

// Get a single experience by ID
const getExperience = async (experienceId, userToken) => {
  const response = await axios.get(`${API_URL}${experienceId}`, {
    headers: {
      Authorization: `Bearer ${userToken}`,
    },
  });

  if (response.data) {
    return response.data; // Return the single experience directly
  }
};

// Clear the experiences cache
const clearExperienceCache = async () => {
  localStorage.removeItem("experiences");
};

const experienceService = {
  createExperience,
  getExperiences, // Fetch all experiences
  getExperience, // Fetch a single experience by ID
  clearExperienceCache,
  deleteExperience,
};

export default experienceService;
