import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import countriesService from "./countriesService";
//import { history } from "../../utils/helpers";

//Get user from local storage
const countries = JSON.parse(localStorage.getItem("countries"));

const initialState = {
  countries: countries ? countries : null,
  isError: false,
  isSuccess: true,
  isLoading: false,
  message: "",
};

//Register User
export const getCountries = createAsyncThunk(
  "countries/list",
  async (_, thunkAPI) => {
    try {
      return await countriesService.getCountries();
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

export const countriesSlice = createSlice({
  name: "countries",
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
      .addCase(getCountries.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getCountries.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.countries = action.payload;
      })
      .addCase(getCountries.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        state.countries = null;
      });
  },
});

export const { reset } = countriesSlice.actions;
export default countriesSlice.reducer;
