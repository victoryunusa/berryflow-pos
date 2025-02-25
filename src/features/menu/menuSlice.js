import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import menuService from "./menuService";

const initialState = {
  menus: [],
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: "",
};

//Get products

export const getMenus = createAsyncThunk(
  "api/get_menus",
  async (_, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.token;
      return await menuService.getMenus(token);
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

export const addMenu = createAsyncThunk(
  "api/add_menu",
  async (formData, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.token;
      return await menuService.addMenu({ token, formData });
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

export const menuSlice = createSlice({
  name: "menus",
  initialState,
  reducers: {
    reset: () => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(getMenus.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getMenus.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.menus = action.payload;
      })
      .addCase(getMenus.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        state.menus = [];
      })
      .addCase(addMenu.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(addMenu.fulfilled, (state) => {
        state.isLoading = false;
        state.isSuccess = true;
      })
      .addCase(addMenu.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      });
  },
});

export const { reset } = menuSlice.actions;
export default menuSlice.reducer;
