import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import areaService from "./areaService";

const initialState = {
  areas: [],
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: "",
};

//Get products

export const getAreas = createAsyncThunk(
  "api/get_areas",
  async (_, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.token;
      return await areaService.getAreas(token);
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

export const addArea = createAsyncThunk(
  "api/add_area",
  async (formData, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.token;
      return await areaService.addArea({ token, formData });
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

export const areaSlice = createSlice({
  name: "areas",
  initialState,
  reducers: {
    reset: (state) => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(getAreas.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getAreas.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.areas = action.payload;
      })
      .addCase(getAreas.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        state.areas = [];
      })
      .addCase(addArea.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(addArea.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
      })
      .addCase(addArea.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      });
  },
});

export const { reset } = areaSlice.actions;
export default areaSlice.reducer;
