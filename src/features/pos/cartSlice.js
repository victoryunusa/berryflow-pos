import { createSlice } from "@reduxjs/toolkit";

const items = localStorage.getItem("cartItems");

const initialState = {
  cartItems: items ? JSON.parse(items) : [],
  cartTotalQuantity: 0,
  cartTotalAmount: 0,
};

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addItemToCart(state, action) {
      const itemIndex = state.cartItems.findIndex(
        (item) => item.pseudoId === action.payload.pseudoId
      );

      const pseudoId = new Date().getTime();

      if (itemIndex >= 0) {
        state.cartItems[itemIndex].quantity++;
      } else {
        const tempProduct = {
          ...action.payload,
          pseudoId: pseudoId,
        };
        state.cartItems.push(tempProduct);
      }

      localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
    },
    removeFromCart(state, action) {
      const nextCartItems = state.cartItems.filter(
        (cartItem) => cartItem.pseudoId !== action.payload.pseudoId
      );

      state.cartItems = nextCartItems;
      localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
    },
    decrease(state, action) {
      const itemIndex = state.cartItems.findIndex(
        (cartItem) => cartItem.pseudoId === action.payload.pseudoId
      );
      if (state.cartItems[itemIndex].quantity > 1) {
        state.cartItems[itemIndex].quantity -= 1;
      } else if (state.cartItems[itemIndex].quantity === 1) {
        const nextCartItems = state.cartItems.filter(
          (cartItem) => cartItem.pseudoId !== action.payload.pseudoId
        );

        state.cartItems = nextCartItems;
      }
      localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
    },
    updateItemQuantity(state, action) {
      //state.cartItems.push(action.payload);

      const itemIndex = state.cartItems.findIndex(
        (item) => item.pseudoId === action.payload.pseudoId
      );

      if (itemIndex >= 0) {
        state.cartItems[itemIndex].quantity = action.payload.new_quantity;
      } else {
        console.log("Item is not in cart");
      }
      //const pseudoId = new Date().getTime();
      localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
    },
    clearCart(state) {
      state.cartItems = [];
      localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
    },
    getTotals(state) {
      let { total, quantity } = state.cartItems.reduce(
        (cartTotal, cartItem) => {
          const { price, item_variation_total, item_extra_total, quantity } =
            cartItem;

          const itemTotal =
            (price * 1 + item_variation_total + item_extra_total) * quantity;

          cartTotal.total += itemTotal;
          cartTotal.quantity += quantity;

          return cartTotal;
        },
        {
          total: 0,
          quantity: 0,
        }
      );

      state.cartTotalQuantity = quantity;
      state.cartTotalAmount = total;
    },
  },
  extraReducers: () => {},
});

// Get cart items
export const getCartItems = (state) => state.cart.cartItems;

export const {
  addItemToCart,
  removeFromCart,
  decrease,
  updateItemQuantity,
  clearCart,
  getTotals,
} = cartSlice.actions;

export default cartSlice.reducer;
