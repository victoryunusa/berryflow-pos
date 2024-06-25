import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import permissionsService from "./permissionsService";

const initialState = {
  permissionsList: [],
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: "",
};

//Get products

export const getPermissions = createAsyncThunk(
  "api/get_permissions",
  async (_, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.token;
      return await permissionsService.getPermissions(token);
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

export const addPermissions = createAsyncThunk(
  "api/add_permissions",
  async (formData, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.token;
      return await permissionsService.addPermissions({ token, formData });
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

export const permissionsSlice = createSlice({
  name: "permissionsList",
  initialState,
  reducers: {
    reset: () => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(getPermissions.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getPermissions.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.permissionsList = action.payload;
      })
      .addCase(getPermissions.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        state.permissionsList = [];
      })
      .addCase(addPermissions.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(addPermissions.fulfilled, (state) => {
        state.isLoading = false;
        state.isSuccess = true;
      })
      .addCase(addPermissions.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      });
  },
});

export const { reset } = permissionsSlice.actions;
export default permissionsSlice.reducer;
