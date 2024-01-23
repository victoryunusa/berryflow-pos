import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import kybService from "./kybService";

const initialState = {
  kyb: [],
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: "",
};

//Get products

export const getKyb = createAsyncThunk("api/get_kyb", async (_, thunkAPI) => {
  try {
    const token = thunkAPI.getState().auth.token;
    return await kybService.getKyb(token);
  } catch (error) {
    const message =
      (error.response && error.response.data && error.response.data.message) ||
      error.message ||
      error.toString();
    return thunkAPI.rejectWithValue(message);
  }
});

export const addKyb = createAsyncThunk(
  "api/add_kyb",
  async (formData, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.token;
      return await kybService.addKyb({ token, formData });
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

export const kybSlice = createSlice({
  name: "kyb",
  initialState,
  reducers: {
    reset: (state) => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(getKyb.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getKyb.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.kyb = action.payload;
      })
      .addCase(getKyb.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        state.kyb = [];
      })
      .addCase(addKyb.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(addKyb.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
      })
      .addCase(addKyb.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      });
  },
});

export const { reset } = kybSlice.actions;
export default kybSlice.reducer;
