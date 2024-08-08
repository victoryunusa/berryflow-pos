import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import masterActionsService from "./masterActionsService";

//Get user from local storage
const order_types = JSON.parse(localStorage.getItem("order_types"));

const initialState = {
  order_types: order_types ? order_types : [],
  isError: false,
  isSuccess: true,
  isLoading: false,
  message: "",
};

//Register User
export const getOrderTypes = createAsyncThunk(
  "order_types/list",
  async (_, thunkAPI) => {
    try {
      return await masterActionsService.getOrderTypes();
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

export const orderTypeSlice = createSlice({
  name: "order_types",
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
      .addCase(getOrderTypes.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getOrderTypes.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.order_types = action.payload;
      })
      .addCase(getOrderTypes.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        state.order_types = null;
      });
  },
});

export const { reset } = orderTypeSlice.actions;
export default orderTypeSlice.reducer;
