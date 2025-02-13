import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import orderService from "./orderService";

const initialState = {
  register_order_total: null,
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: "",
};

//Get one product

export const getRegisterOrderAmount = createAsyncThunk(
  "api/get_register_order_amount",
  async (formData, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.token;
      return await orderService.getRegisterOrderAmount({ token, formData });
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

export const registerOrderAmountSlice = createSlice({
  name: "order",
  initialState,
  reducers: {
    reset: () => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(getRegisterOrderAmount.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getRegisterOrderAmount.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.register_order_total = action.payload;
      })
      .addCase(getRegisterOrderAmount.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        state.register_order_total = null;
      });
  },
});

export const { reset } = registerOrderAmountSlice.actions;
export default registerOrderAmountSlice.reducer;
