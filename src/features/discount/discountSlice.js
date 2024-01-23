import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import discountService from "./discountService";

const initialState = {
  discounts: [],
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: "",
};

//Get products

export const getDiscountCodes = createAsyncThunk(
  "api/get_discounts",
  async (_, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.token;
      return await discountService.getDiscountCodes(token);
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

export const addDiscountCode = createAsyncThunk(
  "api/add_discount",
  async (formData, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.token;
      return await discountService.addDiscountCode({ token, formData });
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

export const discountSlice = createSlice({
  name: "discounts",
  initialState,
  reducers: {
    reset: (state) => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(getDiscountCodes.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getDiscountCodes.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.discounts = action.payload;
      })
      .addCase(getDiscountCodes.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        state.discounts = [];
      })
      .addCase(addDiscountCode.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(addDiscountCode.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
      })
      .addCase(addDiscountCode.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      });
  },
});

export const { reset } = discountSlice.actions;
export default discountSlice.reducer;
