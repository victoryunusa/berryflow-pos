import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import billCounterService from "./billCounterService";

const initialState = {
  bill_counters: [],
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: "",
};

//Get products

export const getBillCounters = createAsyncThunk(
  "api/get_bill_counters",
  async (_, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.token;
      return await billCounterService.getBillCounters(token);
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

export const addBillCounter = createAsyncThunk(
  "api/add_bill_counters",
  async (formData, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.token;
      return await billCounterService.addBillCounter({ token, formData });
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

export const billCounterSlice = createSlice({
  name: "bill_counters",
  initialState,
  reducers: {
    reset: () => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(getBillCounters.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getBillCounters.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.bill_counters = action.payload;
      })
      .addCase(getBillCounters.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        state.bill_counters = [];
      })
      .addCase(addBillCounter.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(addBillCounter.fulfilled, (state) => {
        state.isLoading = false;
        state.isSuccess = true;
      })
      .addCase(addBillCounter.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      });
  },
});

export const { reset } = billCounterSlice.actions;
export default billCounterSlice.reducer;
