import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import paymentGatewayService from "./paymentGatewayService";

const initialState = {
  gateways: [],
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: "",
};

//Get PaymentMethods

export const getPaymentGateways = createAsyncThunk(
  "api/get_gateways",
  async (_, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.token;
      return await paymentGatewayService.getPaymentGateways(token);
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

export const PaymentGatewaySlice = createSlice({
  name: "gateways",
  initialState,
  reducers: {
    reset: () => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(getPaymentGateways.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getPaymentGateways.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.gateways = action.payload;
      })
      .addCase(getPaymentGateways.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        state.gateways = [];
      });
  },
});

export const { reset } = PaymentGatewaySlice.actions;
export default PaymentGatewaySlice.reducer;
