import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import authService from "./authService";
//import { history } from "../../utils/helpers";

//Get user from local storage
const token = JSON.parse(localStorage.getItem("token"));

const initialState = {
  token: token ? token : null,
  isError: false,
  isSuccess: true,
  isLoading: false,
  message: "",
};

//Register User
export const register = createAsyncThunk(
  "auth/register",
  async (user, thunkAPI) => {
    try {
      return await authService.register(user);
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

export const registerBusiness = createAsyncThunk(
  "auth/registerBusiness",
  async (business, thunkAPI) => {
    try {
      return await authService.registerBusiness(business);
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

export const selectBranch = createAsyncThunk(
  "user/selectBranch",
  async (formData, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.token;
      return await authService.selectBranch({ token, formData });
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

export const verify = createAsyncThunk(
  "auth/verify",
  async (user, thunkAPI) => {
    try {
      return await authService.verify(user);
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

export const accountActivate = createAsyncThunk(
  "auth/activate",
  async (user, thunkAPI) => {
    try {
      return await authService.accountActivate(user);
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

//Login user
export const login = createAsyncThunk("auth/login", async (user, thunkAPI) => {
  try {
    return await authService.login(user);
  } catch (error) {
    const message =
      (error.response && error.response.data && error.response.data.message) ||
      error.message ||
      error.toString();
    return thunkAPI.rejectWithValue(message);
  }
});

//Logout user
export const logout = createAsyncThunk("auth/logout", async (_, thunkAPI) => {
  try {
    const token = thunkAPI.getState().auth.token;
    return await authService.logout({ token });
  } catch (error) {
    const message =
      (error.response && error.response.data && error.response.data.message) ||
      error.message ||
      error.toString();
    return thunkAPI.rejectWithValue(message);
  }
});

export const authSlice = createSlice({
  name: "auth",
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
      .addCase(register.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(register.fulfilled, (state) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.token = null;
      })
      .addCase(register.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        state.token = null;
      })
      .addCase(registerBusiness.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(registerBusiness.fulfilled, (state) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.token = null;
      })
      .addCase(registerBusiness.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        state.token = null;
      })
      .addCase(login.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.token = action.payload;
      })
      .addCase(login.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        state.token = null;
      })
      .addCase(verify.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(verify.fulfilled, (state) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.token = null;
      })
      .addCase(verify.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        state.token = null;
      })
      .addCase(accountActivate.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(accountActivate.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.token = action.payload;
      })
      .addCase(accountActivate.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        state.token = null;
      })
      .addCase(selectBranch.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(selectBranch.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.token = action.payload;
      })
      .addCase(selectBranch.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        state.token = null;
      })
      .addCase(logout.fulfilled, (state) => {
        state.token = null;
      });
  },
});

export const { reset } = authSlice.actions;
export default authSlice.reducer;
