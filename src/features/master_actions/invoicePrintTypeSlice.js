import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import masterActionsService from "./masterActionsService";

//Get user from local storage
const invoice_print_types = JSON.parse(
  localStorage.getItem("invoice_print_types")
);

const initialState = {
  invoice_print_types: invoice_print_types ? invoice_print_types : [],
  isError: false,
  isSuccess: true,
  isLoading: false,
  message: "",
};

//Register User
export const getInvoicePrintTypes = createAsyncThunk(
  "invoice_print_types/list",
  async (_, thunkAPI) => {
    try {
      return await masterActionsService.getInvoicePrintTypes();
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

export const invoicePrintTypeSlice = createSlice({
  name: "invoice_print_types",
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
      .addCase(getInvoicePrintTypes.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getInvoicePrintTypes.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.invoice_print_types = action.payload;
      })
      .addCase(getInvoicePrintTypes.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        state.invoice_print_types = null;
      });
  },
});

export const { reset } = invoicePrintTypeSlice.actions;
export default invoicePrintTypeSlice.reducer;
