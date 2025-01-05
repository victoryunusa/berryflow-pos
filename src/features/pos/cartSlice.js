import { createSlice } from "@reduxjs/toolkit";

const items = localStorage.getItem("cartItems");

const initialState = {
  cartItems: items ? JSON.parse(items) : [],
  cartTotalQuantity: 0,
  cartTotalAmount: 0,
  cartTotalDiscount: 0,
  cartTotalTax: 0,
};

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addItemToCart(state, action) {
      const itemIndex = state.cartItems.findIndex(
        (item) => item.product_slug === action.payload.product_slug
      );

      //const pseudoId = new Date().getTime();

      if (itemIndex >= 0) {
        state.cartItems[itemIndex].cart_quantity++;
      } else {
        const tempProduct = {
          ...action.payload,
          cart_quantity: 1,
        };
        state.cartItems.push(tempProduct);
      }

      localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
    },
    removeFromCart(state, action) {
      const nextCartItems = state.cartItems.filter(
        (cartItem) => cartItem.product_slug !== action.payload.product_slug
      );

      state.cartItems = nextCartItems;
      localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
    },
    decrease(state, action) {
      const itemIndex = state.cartItems.findIndex(
        (cartItem) => cartItem.product_slug === action.payload.product_slug
      );
      if (state.cartItems[itemIndex].cart_quantity > 1) {
        state.cartItems[itemIndex].cart_quantity -= 1;
      } else if (state.cartItems[itemIndex].cart_quantity === 1) {
        const nextCartItems = state.cartItems.filter(
          (cartItem) => cartItem.product_slug !== action.payload.product_slug
        );

        state.cartItems = nextCartItems;
      }
      localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
    },
    updateItemQuantity(state, action) {
      //state.cartItems.push(action.payload);

      const itemIndex = state.cartItems.findIndex(
        (item) => item.product_slug === action.payload.product_slug
      );

      if (itemIndex >= 0) {
        state.cartItems[itemIndex].cart_quantity = parseInt(
          action.payload.new_quantity
        );
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
      let { total, cart_quantity, total_discount, total_tax } =
        state.cartItems.reduce(
          (cartTotal, cartItem) => {
            const {
              price,
              cart_quantity,
              tax_percentage,
              discount_percentage,
            } = cartItem;

            const itemTotal = parseFloat(price) * parseFloat(cart_quantity);

            const discountTotal = parseFloat(
              price * cart_quantity * (discount_percentage / 100)
            );

            const taxTotal = parseFloat(
              price * cart_quantity * (tax_percentage / 100)
            );

            cartTotal.total += itemTotal;
            cartTotal.cart_quantity += cart_quantity;
            cartTotal.total_discount += discountTotal;
            cartTotal.total_tax += taxTotal;

            return cartTotal;
          },
          {
            total: 0,
            cart_quantity: 0,
            total_discount: 0,
            total_tax: 0,
          }
        );

      state.cartTotalQuantity = cart_quantity;
      state.cartTotalAmount = total;
      state.cartTotalDiscount = total_discount;
      state.cartTotalTax = total_tax;
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
