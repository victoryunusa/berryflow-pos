import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import masterActionsService from "./masterActionsService";

//Get user from local storage
const transaction_types = JSON.parse(localStorage.getItem("transaction_types"));

const initialState = {
  transaction_types: transaction_types ? transaction_types : [],
  isError: false,
  isSuccess: true,
  isLoading: false,
  message: "",
};

//Register User
export const getTransactionTypes = createAsyncThunk(
  "transaction_types/list",
  async (_, thunkAPI) => {
    try {
      return await masterActionsService.getTransactionTypes();
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

export const transactionTypeSlice = createSlice({
  name: "transaction_types",
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
      .addCase(getTransactionTypes.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getTransactionTypes.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.transaction_types = action.payload;
      })
      .addCase(getTransactionTypes.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        state.transaction_types = null;
      });
  },
});

export const { reset } = transactionTypeSlice.actions;
export default transactionTypeSlice.reducer;
