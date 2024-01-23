import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import suppliersService from "./suppliersService";

const initialState = {
  suppliers: [],
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: "",
};

//Get products

export const getSuppliers = createAsyncThunk(
  "api/get_suppliers",
  async (_, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.token;
      return await suppliersService.getSuppliers(token);
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

export const addSupplier = createAsyncThunk(
  "api/add_supplier",
  async (formData, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.token;
      return await suppliersService.addSupplier({ token, formData });
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

export const suppliersSlice = createSlice({
  name: "suppliers",
  initialState,
  reducers: {
    reset: (state) => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(getSuppliers.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getSuppliers.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.suppliers = action.payload;
      })
      .addCase(getSuppliers.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        state.suppliers = [];
      })
      .addCase(addSupplier.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(addSupplier.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
      })
      .addCase(addSupplier.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      });
  },
});

export const { reset } = suppliersSlice.actions;
export default suppliersSlice.reducer;
