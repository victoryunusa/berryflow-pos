import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import vendorService from "./vendorService";

//const banks = JSON.parse(localStorage.getItem("banks"));

const initialState = {
  vendor: [],
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: "",
};

export const saveBusiness = createAsyncThunk(
  "api/save_business",
  async (formData, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.token;
      return await vendorService.saveBusiness({ token, formData });
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

export const vendorSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    reset: (state) => initialState,
  },
  extraReducers: (builder) => {
    builder

      .addCase(saveBusiness.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(saveBusiness.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.vendor = action.payload;
      })
      .addCase(saveBusiness.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      });
  },
});

export const { reset } = vendorSlice.actions;
export default vendorSlice.reducer;
