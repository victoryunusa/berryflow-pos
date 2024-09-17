import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import subscriptionPlanService from "./subscriptionPlanService";

const initialState = {
  subscription_plans: [],
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: "",
};

//Get PaymentMethods

export const getSubscriptionPlans = createAsyncThunk(
  "api/get_subscription_plans",
  async (_, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.token;
      return await subscriptionPlanService.getSubscriptionPlans(token);
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

export const subscriptionPlanSlice = createSlice({
  name: "subscription_plans",
  initialState,
  reducers: {
    reset: () => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(getSubscriptionPlans.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getSubscriptionPlans.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.subscription_plans = action.payload;
      })
      .addCase(getSubscriptionPlans.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        state.subscription_plans = [];
      });
  },
});

export const { reset } = subscriptionPlanSlice.actions;
export default subscriptionPlanSlice.reducer;
