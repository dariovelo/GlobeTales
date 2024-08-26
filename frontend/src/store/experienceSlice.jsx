import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import experienceService from "./experienceService"; // Update the service import

// Initialize state with experiences from localStorage
let experiences = [];
try {
  const storedExperiences = localStorage.getItem("experiences");
  experiences = storedExperiences ? JSON.parse(storedExperiences) : [];
} catch (error) {
  console.error("Error parsing experiences from localStorage", error);
  experiences = [];
}

const initialState = {
  experiences,
  isError: false,
  isLoading: false,
  isSuccess: false,
  message: "",
};

// Thunks to handle async actions
export const createExperience = createAsyncThunk(
  "experience/create",
  async (experienceData, thunkAPI) => {
    try {
      const authToken = thunkAPI.getState().auth.user?.token;
      if (authToken) {
        return await experienceService.createExperience(
          experienceData,
          authToken
        );
      } else {
        return thunkAPI.rejectWithValue("No authentication token available");
      }
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const getExperiences = createAsyncThunk(
  "experience/getAll",
  async (_, thunkAPI) => {
    try {
      return await experienceService.getExperiences(); // Updated to get all experiences
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const getExperience = createAsyncThunk(
  "experience/get",
  async (experienceId, thunkAPI) => {
    try {
      const authToken = thunkAPI.getState().auth.user?.token;
      if (authToken) {
        return await experienceService.getExperience(experienceId, authToken); // Fetch single experience by ID
      } else {
        return thunkAPI.rejectWithValue("No authentication token available");
      }
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const deleteExperience = createAsyncThunk(
  "experience/delete",
  async (experienceData, thunkAPI) => {
    try {
      const authToken = thunkAPI.getState().auth.user?.token;
      if (authToken) {
        return await experienceService.deleteExperience(
          experienceData,
          authToken
        );
      } else {
        return thunkAPI.rejectWithValue("No authentication token available");
      }
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const clearExperienceCache = createAsyncThunk(
  "experience/clear",
  async (_, thunkAPI) => {
    try {
      return await experienceService.clearExperienceCache(); // Adjust if necessary
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// Slice for experiences
export const experienceSlice = createSlice({
  name: "experience",
  initialState,
  reducers: {
    resetExperience: (state) => {
      state.isSuccess = false;
      state.isError = false;
      state.isLoading = false;
      state.message = "";
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createExperience.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createExperience.fulfilled, (state, action) => {
        state.isSuccess = true;
        state.isLoading = false;
        state.experiences.push(action.payload);
      })
      .addCase(createExperience.rejected, (state, action) => {
        state.isError = true;
        state.isLoading = false;
        state.message = action.payload || "Creating experience failed";
      })
      .addCase(getExperiences.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getExperiences.fulfilled, (state, action) => {
        state.isSuccess = true;
        state.isLoading = false;
        state.experiences = action.payload;
      })
      .addCase(getExperiences.rejected, (state, action) => {
        state.isError = true;
        state.isLoading = false;
        state.message = action.payload || "Fetching experiences failed";
      })
      .addCase(getExperience.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getExperience.fulfilled, (state, action) => {
        state.isSuccess = true;
        state.isLoading = false;
        state.experiences = [action.payload]; // Assuming a single experience is returned
      })
      .addCase(getExperience.rejected, (state, action) => {
        state.isError = true;
        state.isLoading = false;
        state.message = action.payload || "Fetching experience failed";
      })
      .addCase(clearExperienceCache.fulfilled, (state) => {
        state.experiences = [];
      })
      .addCase(deleteExperience.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteExperience.fulfilled, (state, action) => {
        state.isSuccess = true;
        state.isLoading = false;
        state.experiences = state.experiences.filter(
          (experience) => experience.id !== action.payload.id
        );
      })
      .addCase(deleteExperience.rejected, (state, action) => {
        state.isError = true;
        state.isLoading = false;
        state.message = action.payload || "Deleting experience failed";
      });
  },
});

export const { resetExperience } = experienceSlice.actions;

export default experienceSlice.reducer;
