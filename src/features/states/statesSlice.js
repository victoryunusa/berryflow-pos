import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import statesService from "./statesServices";
//import { history } from "../../utils/helpers";

//Get user from local storage
const states = JSON.parse(localStorage.getItem("states"));

const initialState = {
  states: states ? states : null,
  isError: false,
  isSuccess: true,
  isLoading: false,
  message: "",
};

//Register User
export const getStates = createAsyncThunk(
  "states/list",
  async (_, thunkAPI) => {
    try {
      return await statesService.getStates();
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

export const statesSlice = createSlice({
  name: "states",
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
      .addCase(getStates.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getStates.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.states = action.payload;
      })
      .addCase(getStates.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        state.states = null;
      });
  },
});

export const { reset } = statesSlice.actions;
export default statesSlice.reducer;
