import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import businessRegisterService from "./businessRegisterService";

const initialState = {
  business_registers: [],
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: "",
};

//Get products

export const getBusinessRegisters = createAsyncThunk(
  "api/get_business_registers",
  async (_, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.token;
      return await businessRegisterService.getBusinessRegisters(token);
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

export const openBusinessRegister = createAsyncThunk(
  "api/open_business_register",
  async (formData, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.token;
      return await businessRegisterService.openBusinessRegister({
        token,
        formData,
      });
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

export const businessRegisterSlice = createSlice({
  name: "business_registers",
  initialState,
  reducers: {
    reset: () => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(getBusinessRegisters.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getBusinessRegisters.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.business_registers = action.payload;
      })
      .addCase(getBusinessRegisters.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        state.business_registers = [];
      })
      .addCase(openBusinessRegister.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(openBusinessRegister.fulfilled, (state) => {
        state.isLoading = false;
        state.isSuccess = true;
      })
      .addCase(openBusinessRegister.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      });
  },
});

export const { reset } = businessRegisterSlice.actions;
export default businessRegisterSlice.reducer;
