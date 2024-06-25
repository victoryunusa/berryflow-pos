import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import masterActionsService from "./masterActionsService";

//Get user from local storage
const modules = JSON.parse(localStorage.getItem("modules"));

const initialState = {
  modules: modules ? modules : [],
  isError: false,
  isSuccess: true,
  isLoading: false,
  message: "",
};

//Get modlues
export const getModules = createAsyncThunk(
  "modules/list",
  async (_, thunkAPI) => {
    try {
      return await masterActionsService.getModules();
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

export const modulesSlice = createSlice({
  name: "get_modules",
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
      .addCase(getModules.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getModules.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.modules = action.payload;
      })
      .addCase(getModules.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        state.modules = null;
      });
  },
});

export const { reset } = modulesSlice.actions;
export default modulesSlice.reducer;
