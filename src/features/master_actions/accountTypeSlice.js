import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import masterActionsService from "./masterActionsService";

//Get user from local storage
const account_types = JSON.parse(localStorage.getItem("account_types"));

const initialState = {
  account_types: account_types ? account_types : [],
  isError: false,
  isSuccess: true,
  isLoading: false,
  message: "",
};

//Register User
export const getAccountTypes = createAsyncThunk(
  "account_types/list",
  async (_, thunkAPI) => {
    try {
      return await masterActionsService.getAccountTypes();
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

export const accountTypeSlice = createSlice({
  name: "account_types",
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
      .addCase(getAccountTypes.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getAccountTypes.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.account_types = action.payload;
      })
      .addCase(getAccountTypes.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        state.account_types = null;
      });
  },
});

export const { reset } = accountTypeSlice.actions;
export default accountTypeSlice.reducer;
