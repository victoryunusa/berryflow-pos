import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import paymentMethodService from "./paymentMethodService";

const initialState = {
  payment_methods: [],
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: "",
};

//Get PaymentMethods

export const getPaymentMethods = createAsyncThunk(
  "api/get_payment_methods",
  async (_, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.token;
      return await paymentMethodService.getPaymentMethods(token);
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

export const updatePaymentMethods = createAsyncThunk(
  "api/update_payment_methods",
  async (formData, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.token;
      return await paymentMethodService.updatePaymentMethod({
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

export const PaymentMethodSlice = createSlice({
  name: "payment_methods",
  initialState,
  reducers: {
    reset: () => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(getPaymentMethods.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getPaymentMethods.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.payment_methods = action.payload;
      })
      .addCase(getPaymentMethods.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        state.payment_methods = [];
      })
      .addCase(updatePaymentMethods.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updatePaymentMethods.fulfilled, (state) => {
        state.isLoading = false;
        state.isSuccess = true;
      })
      .addCase(updatePaymentMethods.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      });
  },
});

export const { reset } = PaymentMethodSlice.actions;
export default PaymentMethodSlice.reducer;
