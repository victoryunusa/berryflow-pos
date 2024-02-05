import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import purchaseOrderService from "./purchaseOrderService";

const initialState = {
  purchase_orders: [],
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: "",
};

//Get products

export const getPurchaseOrders = createAsyncThunk(
  "api/get_purchase_orders",
  async (_, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.token;
      return await purchaseOrderService.getPurchaseOrders(token);
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

export const addPurchaseOrder = createAsyncThunk(
  "api/add_purchase_orders",
  async (formData, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.token;
      return await purchaseOrderService.addPurchaseOrder({ token, formData });
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

export const purchaseOrderSlice = createSlice({
  name: "purchase_order",
  initialState,
  reducers: {
    reset: (state) => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(getPurchaseOrders.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getPurchaseOrders.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.purchase_orders = action.payload;
      })
      .addCase(getPurchaseOrders.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        state.purchase_orders = [];
      })
      .addCase(addPurchaseOrder.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(addPurchaseOrder.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
      })
      .addCase(addPurchaseOrder.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      });
  },
});

export const { reset } = purchaseOrderSlice.actions;
export default purchaseOrderSlice.reducer;
