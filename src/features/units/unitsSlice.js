import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import unitsService from "./unitsService";

const initialState = {
  units: [],
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: "",
};

//Get products

export const getMeasurementUnits = createAsyncThunk(
  "api/get_measurement_units",
  async (_, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.token;
      return await unitsService.getMeasurementUnits(token);
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

export const addMeasurementUnit = createAsyncThunk(
  "api/add_meaurement_unit",
  async (formData, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.token;
      return await unitsService.addMeasurementUnit({ token, formData });
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

export const unitsSlice = createSlice({
  name: "units",
  initialState,
  reducers: {
    reset: (state) => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(getMeasurementUnits.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getMeasurementUnits.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.units = action.payload;
      })
      .addCase(getMeasurementUnits.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        state.units = [];
      })
      .addCase(addMeasurementUnit.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(addMeasurementUnit.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
      })
      .addCase(addMeasurementUnit.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      });
  },
});

export const { reset } = unitsSlice.actions;
export default unitsSlice.reducer;
