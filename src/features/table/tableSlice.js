import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import tableService from "./tableService";

const initialState = {
  tables: [],
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: "",
};

//Get products

export const getTables = createAsyncThunk(
  "api/get_tables",
  async (_, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.token;
      return await tableService.getTables(token);
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

export const addTable = createAsyncThunk(
  "api/add_table",
  async (formData, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.token;
      return await tableService.addTable({ token, formData });
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

export const tableSlice = createSlice({
  name: "tables",
  initialState,
  reducers: {
    reset: (state) => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(getTables.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getTables.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.tables = action.payload;
      })
      .addCase(getTables.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        state.tables = [];
      })
      .addCase(addTable.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(addTable.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
      })
      .addCase(addTable.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      });
  },
});

export const { reset } = tableSlice.actions;
export default tableSlice.reducer;
