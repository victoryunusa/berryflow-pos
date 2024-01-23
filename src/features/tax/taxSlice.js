import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import taxService from "./taxservice";

const initialState = {
  taxes: [],
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: "",
};

//Get products

export const getTaxes = createAsyncThunk(
  "api/get_taxes",
  async (_, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.token;
      return await taxService.getTaxes(token);
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

export const addTax = createAsyncThunk(
  "api/add_table",
  async (formData, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.token;
      return await taxService.addTax({ token, formData });
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

export const taxSlice = createSlice({
  name: "taxes",
  initialState,
  reducers: {
    reset: (state) => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(getTaxes.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getTaxes.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.taxes = action.payload;
      })
      .addCase(getTaxes.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        state.taxes = [];
      })
      .addCase(addTax.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(addTax.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
      })
      .addCase(addTax.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      });
  },
});

export const { reset } = taxSlice.actions;
export default taxSlice.reducer;
