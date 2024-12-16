import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import businessRegisterService from "./businessRegisterService";

const activeRegister = localStorage.getItem("activeRegister");

const initialState = {
  activeRegister: activeRegister ? activeRegister : null,
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: "",
};

//Get products

export const getRegister = createAsyncThunk(
  "api/get_register",
  async (_, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.token;
      return await businessRegisterService.getRegister(token);
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

export const openRegister = createAsyncThunk(
  "api/open_register",
  async (formData, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.token;
      return await businessRegisterService.openRegister({ token, formData });
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

export const closeRegister = createAsyncThunk(
  "api/close_register",
  async (formData, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.token;
      return await businessRegisterService.closeRegister({ token, formData });
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

const businessRegisterSlice = createSlice({
  name: "active_register",
  initialState,
  reducers: {
    reset: () => initialState,
    setActiveRegister(state, action) {
      state.activeRegister = action.payload;
      localStorage.setItem("activeRegister", JSON.stringify(action.payload));
    },
    clearActiveRegister(state) {
      state.activeRegister = null;
      localStorage.removeItem("activeRegister");
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getRegister.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getRegister.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.activeRegister = action.payload;
      })
      .addCase(getRegister.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        state.activeRegister = null;
      })
      .addCase(openRegister.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(openRegister.fulfilled, (action, state) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.activeRegister = action.payload;
      })
      .addCase(openRegister.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(closeRegister.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(closeRegister.fulfilled, (state) => {
        state.isLoading = false;
        state.isSuccess = true;
      })
      .addCase(closeRegister.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      });
  },
});

export const { reset, setActiveRegister, clearActiveRegister } =
  businessRegisterSlice.actions;

export default businessRegisterSlice.reducer;
