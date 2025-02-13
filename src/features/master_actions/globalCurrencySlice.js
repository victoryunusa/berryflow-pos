import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import masterActionsService from "./masterActionsService";

//Get user from local storage
const global_currencies = JSON.parse(localStorage.getItem("global_currencies"));

const initialState = {
  global_currencies: global_currencies ? global_currencies : [],
  isError: false,
  isSuccess: true,
  isLoading: false,
  message: "",
};

//Get modlues
export const getGlobalCurrencies = createAsyncThunk(
  "global_currencies/list",
  async (_, thunkAPI) => {
    try {
      return await masterActionsService.getGlobalCurrencies();
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

export const globalCurrencySlice = createSlice({
  name: "get_global_currencies",
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
      .addCase(getGlobalCurrencies.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getGlobalCurrencies.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.global_currencies = action.payload;
      })
      .addCase(getGlobalCurrencies.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        state.global_currencies = null;
      });
  },
});

export const { reset } = globalCurrencySlice.actions;
export default globalCurrencySlice.reducer;
