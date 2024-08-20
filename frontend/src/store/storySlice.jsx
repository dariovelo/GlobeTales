import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { useSelector } from "react-redux";

const getUserToken = () => {
  const { user, isLoading, isError, isSuccess, message } = useSelector(
    (state) => state.auth
  );
  if (!user || !user.token) {
    return null;
  }
  return user.token;
};

const initialState = {
  story: [],
  isError: false,
  isLoading: false,
  isSuccess: false,
  message: "",
};

export const createStory = createAsyncThunk(
  "story/create",
  async (storyData, thunkAPI) => {
    try {
      return await storyService.createStory(storyData, getUserToken());
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

export const storySlice = createSlice({
  name: "story",
  initialState,
  reducers: {
    reset: (state) => {
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
        state.message = action.payload?.message || "Creating story failed"; // Assuming action.payload contains a message
      });
  },
});

export const { reset } = storySlice.actions;

export default storySlice.reducer;
