import { createSlice } from "@reduxjs/toolkit";

const items = localStorage.getItem("purchaseOrderItems");

const initialState = {
  purchaseOrderItems: items ? JSON.parse(items) : [],
  orderItemsTotalQunatity: 0,
  orderItemsTotalAmount: 0,
};
export const purchaseCartSlice = createSlice({
  name: "purchase_order_items",
  initialState,
  reducers: {
    addItem(state, action) {
      //state.cartItems.push(action.payload);
      const itemIndex = state.purchaseOrderItems.findIndex(
        (item) => item.id === action.payload.id
      );

      if (itemIndex >= 0) {
        state.purchaseOrderItems[itemIndex].cartQuantity += 1;
      } else {
        const tempProduct = {
          ...action.payload,
          cartQuantity: 1,
          cartUnitPrice: action.payload.price,
        };
        state.purchaseOrderItems.push(tempProduct);
      }
      //const pseudoId = new Date().getTime();
      localStorage.setItem(
        "purchaseOrderItems",
        JSON.stringify(state.purchaseOrderItems)
      );
    },
    removeOrderItem(state, action) {
      const nextCartItems = state.purchaseOrderItems.filter(
        (cartItem) => cartItem.id !== action.payload.id
      );

      state.purchaseOrderItems = nextCartItems;
      localStorage.setItem(
        "purchaseOrderItems",
        JSON.stringify(state.purchaseOrderItems)
      );
    },
    decreaseOrderItem(state, action) {
      const itemIndex = state.purchaseOrderItems.findIndex(
        (cartItem) => cartItem.id === action.payload.id
      );
      if (state.purchaseOrderItems[itemIndex].cartQuantity > 1) {
        state.purchaseOrderItems[itemIndex].cartQuantity -= 1;
      } else if (state.purchaseOrderItems[itemIndex].cartQuantity === 1) {
        const nextCartItems = state.purchaseOrderItems.filter(
          (cartItem) => cartItem.id !== action.payload.id
        );

        state.purchaseOrderItems = nextCartItems;
      }
      localStorage.setItem(
        "purchaseOrderItems",
        JSON.stringify(state.purchaseOrderItems)
      );
    },
    clearOrderItems(state) {
      state.purchaseOrderItems = [];
      localStorage.setItem(
        "purchaseOrderItems",
        JSON.stringify(state.purchaseOrderItems)
      );
    },
    getOrderItemTotals(state) {
      let { total, quantity } = state.purchaseOrderItems.reduce(
        (cartTotal, cartItem) => {
          const { price, cartQuantity } = cartItem;
          const itemTotal = price * cartQuantity;

          cartTotal.total += itemTotal;
          cartTotal.quantity += cartQuantity;

          return cartTotal;
        },
        {
          total: 0,
          quantity: 0,
        }
      );

      state.orderItemsTotalQunatity = quantity;
      state.orderItemsTotalAmount = total;
    },
  },
  extraReducers: () => {},
});

//Get cart items
export const getOrderItems = (state) =>
  state.purchase_order_items.purchaseOrderItems;

export const {
  addItem,
  removeOrderItem,
  decreaseOrderItem,
  clearOrderItems,
  getOrderItemTotals,
} = purchaseCartSlice.actions;
export default purchaseCartSlice.reducer;
