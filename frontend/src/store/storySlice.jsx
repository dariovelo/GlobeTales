import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import storyService from "./storyService";

let story = [];
try {
  const storedStory = localStorage.getItem("story");
  story = storedStory ? JSON.parse(storedStory) : [];
} catch (error) {
  console.error("Error parsing story from localStorage", error);
  story = [];
}

const initialState = {
  story,
  isError: false,
  isLoading: false,
  isSuccess: false,
  message: "",
};

export const createStory = createAsyncThunk(
  "story/create",
  async (storyData, thunkAPI) => {
    try {
      const authToken = thunkAPI.getState().auth.user?.token;
      if (authToken) {
        return await storyService.createStory(storyData, authToken);
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

export const getStories = createAsyncThunk(
  "story/getAll",
  async (_, thunkAPI) => {
    try {
      const authToken = thunkAPI.getState().auth.user?.token;
      if (authToken) {
        return await storyService.getStories(authToken); // Updated to get multiple stories
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

export const getStory = createAsyncThunk(
  "story/get",
  async (storyData, thunkAPI) => {
    try {
      const authToken = thunkAPI.getState().auth.user?.token;
      if (authToken) {
        return await storyService.getStory(storyData, authToken); // Fetch single story by ID
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

export const deleteStory = createAsyncThunk(
  "story/delete",
  async (storyData, thunkAPI) => {
    try {
      const authToken = thunkAPI.getState().auth.user?.token;
      if (authToken) {
        return await storyService.deleteStory(storyData, authToken);
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

export const clearStoryCache = createAsyncThunk(
  "story/clear",
  async (_, thunkAPI) => {
    try {
      return await storyService.clearStoryCache(); // Adjust if necessary
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

export const storySlice = createSlice({
  name: "story",
  initialState,
  reducers: {
    resetStory: (state) => {
      state.isSuccess = false;
      state.isError = false;
      state.isLoading = false;
      state.message = "";
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createStory.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createStory.fulfilled, (state, action) => {
        state.isSuccess = true;
        state.isLoading = false;
        state.story.push(action.payload);
      })
      .addCase(createStory.rejected, (state, action) => {
        state.isError = true;
        state.isLoading = false;
        state.message = action.payload || "Creating story failed";
      })
      .addCase(getStories.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getStories.fulfilled, (state, action) => {
        state.isSuccess = true;
        state.isLoading = false;
        state.story = action.payload;
      })
      .addCase(getStories.rejected, (state, action) => {
        state.isError = true;
        state.isLoading = false;
        state.message = action.payload || "Fetching stories failed";
      })
      .addCase(getStory.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getStory.fulfilled, (state, action) => {
        state.isSuccess = true;
        state.isLoading = false;
        state.story = [action.payload]; // Assuming a single story is returned
      })
      .addCase(getStory.rejected, (state, action) => {
        state.isError = true;
        state.isLoading = false;
        state.message = action.payload || "Fetching story failed";
      })
      .addCase(clearStoryCache.fulfilled, (state) => {
        state.story = [];
      })
      .addCase(deleteStory.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteStory.fulfilled, (state, action) => {
        state.isSuccess = true;
        state.isLoading = false;
        state.story = state.story.filter(
          (story_) => story_.id !== action.payload.id
        );
      })
      .addCase(deleteStory.rejected, (state, action) => {
        state.isError = true;
        state.isLoading = false;
        state.message = action.payload || "Deleting story failed";
      });
  },
});

export const { resetStory } = storySlice.actions;

export default storySlice.reducer;
