import axios from "axios";

const API_URL = "https://globetales-backend.onrender.com/api/user/";

const register = async (userData) => {
  const response = await axios.post(API_URL + "register", userData);

  if (response.data) {
    localStorage.setItem("user", JSON.stringify(response.data));
  }

  return response.data;
};

const logout = async () => {
  localStorage.removeItem("user");
};

const login = async (userData) => {
  const response = await axios.post(API_URL + "/login", userData);

  if (response.data) {
    localStorage.setItem("user", JSON.stringify(response.data));
  }

  return response.data;
};

const updateVisitedCountries = async (country, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.put(
    `${API_URL}profile/visited-countries`,
    { country },
    config
  );

  return response.data;
};

const authService = {
  register,
  logout,
  login,
  updateVisitedCountries,
};

export default authService;
