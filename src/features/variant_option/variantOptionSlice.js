import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import variantOptionService from "./variantOptionService";

const initialState = {
  variant_options: [],
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: "",
};

//Get products

export const getVariantOptions = createAsyncThunk(
  "api/get_variant_options",
  async (formData, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.token;
      return await variantOptionService.getVariantOptions({ token, formData });
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

export const addVariantOption = createAsyncThunk(
  "api/add_variant_option",
  async (formData, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.token;
      return await variantOptionService.addVariantOption({ token, formData });
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

export const variantOptionSlice = createSlice({
  name: "variant_options",
  initialState,
  reducers: {
    reset: () => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(getVariantOptions.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getVariantOptions.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.variant_options = action.payload;
      })
      .addCase(getVariantOptions.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        state.variant_options = [];
      })
      .addCase(addVariantOption.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(addVariantOption.fulfilled, (state) => {
        state.isLoading = false;
        state.isSuccess = true;
      })
      .addCase(addVariantOption.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      });
  },
});

export const { reset } = variantOptionSlice.actions;
export default variantOptionSlice.reducer;
