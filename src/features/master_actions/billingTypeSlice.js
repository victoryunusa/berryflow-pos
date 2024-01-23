import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import masterActionsService from "./masterActionsService";

//Get user from local storage
const billing_types = JSON.parse(localStorage.getItem("billing_types"));

const initialState = {
  billing_types: billing_types ? billing_types : [],
  isError: false,
  isSuccess: true,
  isLoading: false,
  message: "",
};

//Register User
export const getBillingTypes = createAsyncThunk(
  "billing_types/list",
  async (_, thunkAPI) => {
    try {
      return await masterActionsService.getBillingTypes();
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

export const billingTypeSlice = createSlice({
  name: "billing_types",
  initialState,
  reducers: {
    reset: (state) => {
      state.isLoading = false;
      state.isError = false;
      state.isSuccess = false;
      state.message = "";
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getBillingTypes.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getBillingTypes.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.billing_types = action.payload;
      })
      .addCase(getBillingTypes.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        state.billing_types = null;
      });
  },
});

export const { reset } = billingTypeSlice.actions;
export default billingTypeSlice.reducer;
