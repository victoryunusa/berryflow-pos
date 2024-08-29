import { createSlice } from "@reduxjs/toolkit";

const items = localStorage.getItem("invoiceItems");

const initialState = {
  invoiceItems: items ? JSON.parse(items) : [],
  invoiceItemsTotalQunatity: 0,
  invoiceItemsTotalAmount: 0,
  invoiceItemsTotalDiscount: 0,
};
export const invoiceCartSlice = createSlice({
  name: "invoice_items",
  initialState,
  reducers: {
    addItem(state, action) {
      //state.cartItems.push(action.payload);
      const itemIndex = state.invoiceItems.findIndex(
        (item) => item.slug === action.payload.slug
      );

      if (itemIndex >= 0) {
        state.invoiceItems[itemIndex].cartQuantity++;
      } else {
        const tempProduct = {
          ...action.payload,
          cartQuantity: 1,
          cartUnitPrice: action.payload.cost_excluding_tax,
          cartDiscountPrice: 0,
        };
        state.invoiceItems.push(tempProduct);
      }
      //const pseudoId = new Date().getTime();
      localStorage.setItem("invoiceItems", JSON.stringify(state.invoiceItems));
    },
    removeInvoiceItem(state, action) {
      const nextCartItems = state.invoiceItems.filter(
        (cartItem) => cartItem.slug !== action.payload.slug
      );

      state.invoiceItems = nextCartItems;
      localStorage.setItem("invoiceItems", JSON.stringify(state.invoiceItems));
    },
    decreaseInvoiceItem(state, action) {
      const itemIndex = state.invoiceItems.findIndex(
        (cartItem) => cartItem.slug === action.payload.slug
      );
      if (state.invoiceItems[itemIndex].cartQuantity > 1) {
        state.invoiceItems[itemIndex].cartQuantity -= 1;
      } else if (state.invoiceItems[itemIndex].cartQuantity === 1) {
        const nextCartItems = state.invoiceItems.filter(
          (cartItem) => cartItem.slug !== action.payload.slug
        );

        state.invoiceItems = nextCartItems;
      }
      localStorage.setItem("invoiceItems", JSON.stringify(state.invoiceItems));
    },
    updateQuantity(state, action) {
      //state.cartItems.push(action.payload);
      const itemIndex = state.invoiceItems.findIndex(
        (item) => item.slug === action.payload.slug
      );

      if (itemIndex >= 0) {
        state.invoiceItems[itemIndex].cartQuantity =
          action.payload.new_quantity;
      } else {
        console.log("Item is not in cart");
      }
      //const pseudoId = new Date().getTime();
      localStorage.setItem("invoiceItems", JSON.stringify(state.invoiceItems));
    },
    updateUnitPrice(state, action) {
      //state.cartItems.push(action.payload);
      const itemIndex = state.invoiceItems.findIndex(
        (item) => item.slug === action.payload.slug
      );

      if (itemIndex >= 0) {
        state.invoiceItems[itemIndex].cartUnitPrice = action.payload.unit_price;
      } else {
        console.log("Item is not in cart");
      }
      //const pseudoId = new Date().getTime();
      localStorage.setItem("invoiceItems", JSON.stringify(state.invoiceItems));
    },
    updateDiscountPrice(state, action) {
      //state.cartItems.push(action.payload);
      const itemIndex = state.invoiceItems.findIndex(
        (item) => item.slug === action.payload.slug
      );

      if (itemIndex >= 0) {
        state.invoiceItems[itemIndex].cartDiscountPrice =
          action.payload.discount_price;
      } else {
        console.log("Item is not in cart");
      }
      //const pseudoId = new Date().getTime();
      localStorage.setItem("invoiceItems", JSON.stringify(state.invoiceItems));
    },
    clearInvoiceItems(state) {
      state.invoiceItems = [];
      localStorage.setItem("invoiceItems", JSON.stringify(state.invoiceItems));
    },
    getInvoiceItemTotals(state) {
      let { total, quantity, discount } = state.invoiceItems.reduce(
        (cartTotal, cartItem) => {
          const { cartUnitPrice, cartQuantity, cartDiscountPrice } = cartItem;
          const itemTotal =
            cartUnitPrice * cartQuantity -
            (cartDiscountPrice * cartUnitPrice * cartQuantity) / 100;

          cartTotal.total += itemTotal;
          cartTotal.quantity += cartQuantity;
          cartTotal.discount += cartDiscountPrice;

          return cartTotal;
        },
        {
          total: 0,
          quantity: 0,
          discount: 0,
        }
      );

      state.invoiceItemsTotalQunatity = quantity;
      state.invoiceItemsTotalAmount = total;
      state.invoiceItemsTotalDiscount = discount;
    },
  },
  extraReducers: () => {},
});

//Get cart items
export const getInvoiceItems = (state) => state.invoice_items.invoiceItems;

export const {
  addItem,
  removeInvoiceItem,
  decreaseInvoiceItem,
  clearInvoiceItems,
  getInvoiceItemTotals,
  updateQuantity,
  updateUnitPrice,
  updateDiscountPrice,
} = invoiceCartSlice.actions;
export default invoiceCartSlice.reducer;
