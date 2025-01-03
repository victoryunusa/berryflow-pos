import { createSlice } from "@reduxjs/toolkit";

const items = localStorage.getItem("variantItems");

const initialState = {
  variantItems: items ? JSON.parse(items) : [],
};
export const productVariantSlice = createSlice({
  name: "variant_items",
  initialState,
  reducers: {
    addItem(state, action) {
      //state.cartItems.push(action.payload);
      const itemIndex = state.variantItems.findIndex(
        (item) => item.slug === action.payload.slug
      );

      if (itemIndex >= 0) {
        return;
      } else {
        const tempProduct = {
          ...action.payload,
        };
        state.variantItems.push(tempProduct);
      }
      //const pseudoId = new Date().getTime();
      localStorage.setItem("variantItems", JSON.stringify(state.variantItems));
    },
    removeVariantItem(state, action) {
      const nextCartItems = state.variantItems.filter(
        (cartItem) => cartItem.slug !== action.payload.slug
      );

      state.variantItems = nextCartItems;
      localStorage.setItem("variantItems", JSON.stringify(state.variantItems));
    },

    updateVariantOption(state, action) {
      //state.cartItems.push(action.payload);
      console.log(action.payload);
      const itemIndex = state.variantItems.findIndex(
        (item) => item.slug === action.payload.slug
      );

      if (itemIndex >= 0) {
        state.variantItems[itemIndex].variant_option =
          action.payload.variant_option;
      } else {
        console.log("Item is not in cart");
      }
      //const pseudoId = new Date().getTime();
      localStorage.setItem("variantItems", JSON.stringify(state.variantItems));
    },

    clearItems(state) {
      state.variantItems = [];
      localStorage.setItem("variantItems", JSON.stringify(state.variantItems));
    },
  },
  extraReducers: () => {},
});

//Get cart items
export const getVariantOptions = (state) => state.variant_items.variantItems;

export const { addItem, removeVariantItem, updateVariantOption } =
  productVariantSlice.actions;
export default productVariantSlice.reducer;
