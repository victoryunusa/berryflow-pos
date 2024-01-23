import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import ingredientsService from "./ingredientsService";

const initialState = {
  ingredients: [],
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: "",
};

//Get products

export const getIngredients = createAsyncThunk(
  "api/get_ingredients",
  async (_, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.token;
      return await ingredientsService.getIngredients(token);
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

export const addIngredient = createAsyncThunk(
  "api/add_ingredient",
  async (formData, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.token;
      return await ingredientsService.addIngredient({ token, formData });
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

export const ingredientsSlice = createSlice({
  name: "ingredients",
  initialState,
  reducers: {
    reset: (state) => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(getIngredients.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getIngredients.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.ingredients = action.payload;
      })
      .addCase(getIngredients.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        state.ingredients = [];
      })
      .addCase(addIngredient.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(addIngredient.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
      })
      .addCase(addIngredient.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      });
  },
});

export const { reset } = ingredientsSlice.actions;
export default ingredientsSlice.reducer;
