import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import experienceService from "./experienceService";

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
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const getExperiences = createAsyncThunk(
  "experience/getAll",
  async (_, thunkAPI) => {
    try {
      return await experienceService.getExperiences(
        thunkAPI.getState().auth.user?.token
      );
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const getExperience = createAsyncThunk(
  "experience/get",
  async (experienceId, thunkAPI) => {
    try {
      const authToken = thunkAPI.getState().auth.user?.token;
      if (authToken) {
        return await experienceService.getExperience(experienceId, authToken);
      } else {
        return thunkAPI.rejectWithValue("No authentication token available");
      }
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const deleteExperience = createAsyncThunk(
  "experience/delete",
  async (experienceId, thunkAPI) => {
    try {
      const authToken = thunkAPI.getState().auth.user?.token;
      if (authToken) {
        return await experienceService.deleteExperience(
          experienceId,
          authToken
        );
      } else {
        return thunkAPI.rejectWithValue("No authentication token available");
      }
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const updateExperience = createAsyncThunk(
  "experience/update",
  async ({ experienceId, experienceData }, thunkAPI) => {
    try {
      const authToken = thunkAPI.getState().auth.user?.token;
      if (authToken) {
        return await experienceService.updateExperience(
          experienceId,
          experienceData,
          authToken
        );
      } else {
        return thunkAPI.rejectWithValue("No authentication token available");
      }
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const fetchUserDetailsById = createAsyncThunk(
  "experience/fetchUserDetailsById",
  async (userId, thunkAPI) => {
    try {
      const authToken = thunkAPI.getState().auth.user?.token;
      if (authToken) {
        return await experienceService.getUserDetailsById(userId, authToken);
      } else {
        return thunkAPI.rejectWithValue("No authentication token available");
      }
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const clearExperienceCache = createAsyncThunk(
  "experience/clear",
  async (_, thunkAPI) => {
    try {
      return await experienceService.clearExperienceCache();
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

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
        state.experiences = [action.payload];
      })
      .addCase(getExperience.rejected, (state, action) => {
        state.isError = true;
        state.isLoading = false;
        state.message = action.payload || "Fetching experience failed";
      })
      .addCase(deleteExperience.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteExperience.fulfilled, (state, action) => {
        state.isSuccess = true;
        state.isLoading = false;
        state.experiences = state.experiences.filter(
          (experience) => experience.experienceId !== action.payload.id
        );
      })
      .addCase(deleteExperience.rejected, (state, action) => {
        state.isError = true;
        state.isLoading = false;
        state.message = action.payload || "Deleting experience failed";
      })
      .addCase(updateExperience.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateExperience.fulfilled, (state, action) => {
        state.isSuccess = true;
        state.isLoading = false;
        state.experiences = state.experiences.map((experience) =>
          experience.experienceId === action.payload.experienceId
            ? action.payload
            : experience
        );
      })
      .addCase(updateExperience.rejected, (state, action) => {
        state.isError = true;
        state.isLoading = false;
        state.message = action.payload || "Updating experience failed";
      })
      .addCase(clearExperienceCache.fulfilled, (state) => {
        state.experiences = [];
      })
      .addCase(fetchUserDetailsById.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchUserDetailsById.fulfilled, (state, action) => {
        state.isSuccess = true;
        state.isLoading = false;
      })
      .addCase(fetchUserDetailsById.rejected, (state, action) => {
        state.isError = true;
        state.isLoading = false;
        state.message = action.payload || "Fetching user details failed";
      });
  },
});

export const { resetExperience } = experienceSlice.actions;

export default experienceSlice.reducer;
