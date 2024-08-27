import axios from "axios";

const API_URL = "http://localhost:5000/api/experiences/";
const API_URL_USER = "http://localhost:5000/api/user/";

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

const deleteExperience = async (experienceId, userToken) => {
  const response = await axios.delete(`${API_URL}${experienceId}`, {
    headers: {
      Authorization: `Bearer ${userToken}`,
    },
  });

  if (response.data) {
    const existingExperiences =
      JSON.parse(localStorage.getItem("experiences")) || [];
    const updatedExperiences = existingExperiences.filter(
      (item) => item.experienceId !== experienceId
    );
    localStorage.setItem("experiences", JSON.stringify(updatedExperiences));
  }
  return response.data;
};

const getUserDetailsById = async (userId, userToken) => {
  const response = await axios.get(`${API_URL_USER}${userId}`, {
    headers: {
      Authorization: `Bearer ${userToken}`,
    },
  });

  return response.data;
};

const updateExperience = async (experienceId, experienceData, userToken) => {
  const response = await axios.put(
    `${API_URL}${experienceId}`,
    experienceData,
    {
      headers: {
        Authorization: `Bearer ${userToken}`,
      },
    }
  );

  if (response.data) {
    // Update local storage to reflect the updated experience
    const existingExperiences =
      JSON.parse(localStorage.getItem("experiences")) || [];
    const updatedExperiences = existingExperiences.map((exp) =>
      exp.experienceId === experienceId ? response.data : exp
    );
    localStorage.setItem("experiences", JSON.stringify(updatedExperiences));
  }

  return response.data;
};

const getExperiences = async (userToken) => {
  const response = await axios.get(API_URL, {
    headers: {
      Authorization: `Bearer ${userToken}`,
    },
  });

  if (response.data) {
    localStorage.setItem("experiences", JSON.stringify(response.data));
  }
  return response.data;
};

const getExperience = async (experienceId, userToken) => {
  const response = await axios.get(`${API_URL}${experienceId}`, {
    headers: {
      Authorization: `Bearer ${userToken}`,
    },
  });

  return response.data;
};

const clearExperienceCache = async () => {
  localStorage.removeItem("experiences");
};

const experienceService = {
  createExperience,
  getExperiences,
  getExperience,
  clearExperienceCache,
  deleteExperience,
  updateExperience,
  getUserDetailsById,
};

export default experienceService;
