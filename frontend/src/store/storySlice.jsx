import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { useSelector } from "react-redux";
import storyService from "./storyService";

const story = JSON.parse(localStorage.getItem("story"));

const initialState = {
  story: story ? story : [],
  isError: false,
  isLoading: false,
  isSuccess: false,
  message: "",
};

export const createStory = createAsyncThunk(
  "story/create",
  async (storyData, thunkAPI) => {
    try {
      if (thunkAPI.getState().auth.user) {
        const authToken = thunkAPI.getState().auth.user.token;
        return await storyService.createStory(storyData, authToken);
      }
    } catch (error) {
      if (error instanceof Error) {
        const message =
          (error.response &&
            error.response.data &&
            error.response.data.message) ||
          error.message ||
          error.toString();
        return thunkAPI.rejectWithValue(message);
      }
    }
  }
);

export const getStory = createAsyncThunk("story/get", async (_, thunkAPI) => {
  try {
    if (thunkAPI.getState().auth.user) {
      const authToken = thunkAPI.getState().auth.user.token;
      return await storyService.getStory(authToken);
    }
  } catch (error) {
    if (error instanceof Error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
});

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
        state.message = action.payload || "Creating story failed"; // Assuming action.payload contains a message
      })
      .addCase(getStory.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getStory.fulfilled, (state, action) => {
        state.isSuccess = true;
        state.isLoading = false;
        state.story = action.payload;
      })
      .addCase(getStory.rejected, (state, action) => {
        state.isError = true;
        state.isLoading = false;
        state.message = action.payload || "Receiving story failed"; // Assuming action.payload contains a message
      });
  },
});

export const { resetStory } = storySlice.actions;

export default storySlice.reducer;
