import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import businessRegisterService from "./businessRegisterService";

const initialState = {
  billing_counter_stats: [],
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: "",
};

//Get products

export const getBillingCounterStats = createAsyncThunk(
  "api/get_billing_counter_stats",
  async (_, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.token;
      return await businessRegisterService.getBillingCounterStats(token);
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

export const openBusinessRegister = createAsyncThunk(
  "api/open_business_register",
  async (formData, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.token;
      return await businessRegisterService.openBusinessRegister({
        token,
        formData,
      });
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

export const billingCounterStatSlice = createSlice({
  name: "billing_counter_stats",
  initialState,
  reducers: {
    reset: () => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(getBillingCounterStats.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getBillingCounterStats.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.billing_counter_stats = action.payload;
      })
      .addCase(getBillingCounterStats.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        state.billing_counter_stats = [];
      })
      .addCase(openBusinessRegister.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(openBusinessRegister.fulfilled, (state) => {
        state.isLoading = false;
        state.isSuccess = true;
      })
      .addCase(openBusinessRegister.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      });
  },
});

export const { reset } = billingCounterStatSlice.actions;
export default billingCounterStatSlice.reducer;
