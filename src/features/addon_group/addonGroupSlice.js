import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import addonGroupService from "./addonGroupService";

const initialState = {
  addon_groups: [],
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: "",
};

//Get Addon Groups
export const getAddonGroups = createAsyncThunk(
  "api/get_addon_group",
  async (formData, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.token;
      return await addonGroupService.getAddonGroups({ token, formData });
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

export const addAddonGroup = createAsyncThunk(
  "api/add_addon_group",
  async (formData, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.token;
      return await addonGroupService.addAddonGroup({ token, formData });
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

export const addonGroupSlice = createSlice({
  name: "addon_groups",
  initialState,
  reducers: {
    reset: () => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(getAddonGroups.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getAddonGroups.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.addon_groups = action.payload;
      })
      .addCase(getAddonGroups.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        state.addon_groups = [];
      })
      .addCase(addAddonGroup.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(addAddonGroup.fulfilled, (state) => {
        state.isLoading = false;
        state.isSuccess = true;
      })
      .addCase(addAddonGroup.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      });
  },
});

export const { reset } = addonGroupSlice.actions;
export default addonGroupSlice.reducer;
