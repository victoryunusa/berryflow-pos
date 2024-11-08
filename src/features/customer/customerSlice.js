import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import customerService from "./customerService";

const initialState = {
  customers: [],
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: "",
};

//Get products

export const getCustomers = createAsyncThunk(
  "api/get_customers",
  async (formData, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.token;
      return await customerService.getCustomers({ token, formData });
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

export const addCustomer = createAsyncThunk(
  "api/add_customer",
  async (formData, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.token;
      return await customerService.addCustomer({ token, formData });
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

export const updateCustomer = createAsyncThunk(
  "api/edit_customer",
  async (formData, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.token;
      return await customerService.updateCustomer({ token, formData });
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

export const customerSlice = createSlice({
  name: "customers",
  initialState,
  reducers: {
    reset: () => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(getCustomers.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getCustomers.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.customers = action.payload;
      })
      .addCase(getCustomers.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        state.customers = [];
      })
      .addCase(addCustomer.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(addCustomer.fulfilled, (state) => {
        state.isLoading = false;
        state.isSuccess = true;
      })
      .addCase(addCustomer.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(updateCustomer.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateCustomer.fulfilled, (state) => {
        state.isLoading = false;
        state.isSuccess = true;
      })
      .addCase(updateCustomer.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      });
  },
});

export const { reset } = customerSlice.actions;
export default customerSlice.reducer;
