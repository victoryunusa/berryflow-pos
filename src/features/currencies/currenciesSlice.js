import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import CurrenciesService from "./currenciesService";
//import { history } from "../../utils/helpers";

//Get user from local storage
const currencies = JSON.parse(localStorage.getItem("currencies"));

const initialState = {
  currencies: currencies ? currencies : null,
  isError: false,
  isSuccess: true,
  isLoading: false,
  message: "",
};

//Register User
export const getCurrencies = createAsyncThunk(
  "currencies/list",
  async (_, thunkAPI) => {
    try {
      return await CurrenciesService.getCurrencies();
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

export const currenciesSlice = createSlice({
  name: "currencies",
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
      .addCase(getCurrencies.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getCurrencies.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.currencies = action.payload;
      })
      .addCase(getCurrencies.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        state.currencies = null;
      });
  },
});

export const { reset } = currenciesSlice.actions;
export default currenciesSlice.reducer;
