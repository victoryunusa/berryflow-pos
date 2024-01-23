import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import branchService from "./branchService";

const initialState = {
  branches: [],
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: "",
};

//Get products

export const getBranches = createAsyncThunk(
  "api/get_branches",
  async (_, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.token;
      return await branchService.getBranches(token);
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

export const addBranch = createAsyncThunk(
  "api/add_branch",
  async (formData, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.token;
      return await branchService.addBranch({ token, formData });
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

export const branchSlice = createSlice({
  name: "branches",
  initialState,
  reducers: {
    reset: (state) => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(getBranches.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getBranches.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.branches = action.payload;
      })
      .addCase(getBranches.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        state.branches = [];
      })
      .addCase(addBranch.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(addBranch.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
      })
      .addCase(addBranch.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      });
  },
});

export const { reset } = branchSlice.actions;
export default branchSlice.reducer;
