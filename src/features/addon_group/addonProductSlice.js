import { createSlice } from "@reduxjs/toolkit";

const items = localStorage.getItem("addonItems");

const initialState = {
  addonItems: items ? JSON.parse(items) : [],
};
export const addonProductSlice = createSlice({
  name: "addon_items",
  initialState,
  reducers: {
    addItem(state, action) {
      //state.cartItems.push(action.payload);
      const itemIndex = state.addonItems.findIndex(
        (item) => item.slug === action.payload.slug
      );

      if (itemIndex >= 0) {
        return;
      } else {
        const tempProduct = {
          ...action.payload,
        };
        state.addonItems.push(tempProduct);
      }
      //const pseudoId = new Date().getTime();
      localStorage.setItem("addonItems", JSON.stringify(state.addonItems));
    },
    removeAddonItem(state, action) {
      const nextCartItems = state.addonItems.filter(
        (cartItem) => cartItem.slug !== action.payload.slug
      );

      state.addonItems = nextCartItems;
      localStorage.setItem("addonItems", JSON.stringify(state.addonItems));
    },

    clearItems(state) {
      state.addonItems = [];
      localStorage.setItem("addonItems", JSON.stringify(state.addonItems));
    },
  },
  extraReducers: () => {},
});

//Get cart items
export const getAddonItems = (state) => state.addon_items.addonItems;

export const { addItem, removeAddonItem, clearItems } =
  addonProductSlice.actions;
export default addonProductSlice.reducer;
