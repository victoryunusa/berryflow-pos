import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import accountService from "./accountService";

const initialState = {
  accounts: [],
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: "",
};

//Get Accounts
export const getAccounts = createAsyncThunk(
  "api/get_accounts",
  async (formData, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.token;
      return await accountService.getAccounts({ token, formData });
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

export const addAccount = createAsyncThunk(
  "api/add_account",
  async (formData, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.token;
      return await accountService.addAccount({ token, formData });
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

export const accountSlice = createSlice({
  name: "accounts",
  initialState,
  reducers: {
    reset: (state) => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(getAccounts.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getAccounts.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.accounts = action.payload;
      })
      .addCase(getAccounts.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        state.accounts = [];
      })
      .addCase(addAccount.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(addAccount.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
      })
      .addCase(addAccount.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      });
  },
});

export const { reset } = accountSlice.actions;
export default accountSlice.reducer;
