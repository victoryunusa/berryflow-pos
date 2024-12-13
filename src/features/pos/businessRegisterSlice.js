import { createSlice } from "@reduxjs/toolkit";

const activeRegister = localStorage.getItem("activeRegister");

const initialState = {
  activeRegister: activeRegister ? JSON.parse(activeRegister) : null,
};

const businessRegisterSlice = createSlice({
  name: "active_register",
  initialState,
  reducers: {
    setActiveRegister(state, action) {
      state.activeRegister = action.payload;
      localStorage.setItem("activeRegister", JSON.stringify(action.payload));
    },
    clearActiveRegister(state) {
      state.activeRegister = null;
      localStorage.removeItem("activeRegister");
    },
  },
});

export const { setActiveRegister, clearActiveRegister } =
  businessRegisterSlice.actions;

export default businessRegisterSlice.reducer;
