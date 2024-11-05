import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import transactionService from "./transactionService";

const initialState = {
  transactions: [],
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: "",
};

//Get Accounts
export const getTransactions = createAsyncThunk(
  "api/get_transactions",
  async (formData, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.token;
      return await transactionService.getTransactions({ token, formData });
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

export const addTransaction = createAsyncThunk(
  "api/add_transactions",
  async (formData, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.token;
      return await transactionService.addTransaction({ token, formData });
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

export const editTransaction = createAsyncThunk(
  "api/edit_transactions",
  async (formData, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.token;
      return await transactionService.editTransaction({ token, formData });
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

export const transactionSlice = createSlice({
  name: "transactions",
  initialState,
  reducers: {
    reset: () => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(getTransactions.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getTransactions.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.transactions = action.payload;
      })
      .addCase(getTransactions.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        state.transactions = [];
      })
      .addCase(addTransaction.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(addTransaction.fulfilled, (state) => {
        state.isLoading = false;
        state.isSuccess = true;
      })
      .addCase(addTransaction.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(editTransaction.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(editTransaction.fulfilled, (state) => {
        state.isLoading = false;
        state.isSuccess = true;
      })
      .addCase(editTransaction.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      });
  },
});

export const { reset } = transactionSlice.actions;
export default transactionSlice.reducer;
