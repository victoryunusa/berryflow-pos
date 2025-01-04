import { createSlice } from "@reduxjs/toolkit";

const items = localStorage.getItem("productIngredientItems");

const initialState = {
  productIngredientItems: items ? JSON.parse(items) : [],
  ingredientItemsTotalQunatity: 0,
  ingredientItemsTotalAmount: 0,
  ingredientItemsTotalSale: 0,
  ingredientItemsTotalPurchase: 0,
  ingredientItemsTotalDiscount: 0,
};
export const productIngredientSlice = createSlice({
  name: "product_ingredient_items",
  initialState,
  reducers: {
    addIngredientItem(state, action) {
      //state.cartItems.push(action.payload);
      const itemIndex = state.productIngredientItems.findIndex(
        (item) => item.slug === action.payload.slug
      );

      if (itemIndex >= 0) {
        state.productIngredientItems[itemIndex].cartQuantity++;
      } else {
        const tempProduct = {
          ...action.payload,
          cartQuantity: 1,
          cartSalePrice: action.payload.price_excluding_tax,
          cartPurchasePrice: action.payload.cost_excluding_tax,
          cartDiscountPrice: 0,
        };
        state.productIngredientItems.push(tempProduct);
      }
      //const pseudoId = new Date().getTime();
      localStorage.setItem(
        "productIngredientItems",
        JSON.stringify(state.productIngredientItems)
      );
    },
    removeOrderItem(state, action) {
      const nextCartItems = state.productIngredientItems.filter(
        (cartItem) => cartItem.slug !== action.payload.slug
      );

      state.productIngredientItems = nextCartItems;
      localStorage.setItem(
        "productIngredientItems",
        JSON.stringify(state.productIngredientItems)
      );
    },
    decreaseOrderItem(state, action) {
      const itemIndex = state.productIngredientItems.findIndex(
        (cartItem) => cartItem.slug === action.payload.slug
      );
      if (state.productIngredientItems[itemIndex].cartQuantity > 1) {
        state.productIngredientItems[itemIndex].cartQuantity -= 1;
      } else if (state.productIngredientItems[itemIndex].cartQuantity === 1) {
        const nextCartItems = state.productIngredientItems.filter(
          (cartItem) => cartItem.slug !== action.payload.slug
        );

        state.productIngredientItems = nextCartItems;
      }
      localStorage.setItem(
        "productIngredientItems",
        JSON.stringify(state.productIngredientItems)
      );
    },
    updateQuantity(state, action) {
      //state.cartItems.push(action.payload);
      const itemIndex = state.productIngredientItems.findIndex(
        (item) => item.slug === action.payload.slug
      );

      if (itemIndex >= 0) {
        state.productIngredientItems[itemIndex].cartQuantity =
          action.payload.new_quantity;
      } else {
        console.log("Item is not in cart");
      }
      //const pseudoId = new Date().getTime();
      localStorage.setItem(
        "productIngredientItems",
        JSON.stringify(state.productIngredientItems)
      );
    },
    updateUnitPrice(state, action) {
      //state.cartItems.push(action.payload);
      const itemIndex = state.productIngredientItems.findIndex(
        (item) => item.slug === action.payload.slug
      );

      if (itemIndex >= 0) {
        state.productIngredientItems[itemIndex].cartUnitPrice =
          action.payload.unit_price;
      } else {
        console.log("Item is not in cart");
      }
      //const pseudoId = new Date().getTime();
      localStorage.setItem(
        "productIngredientItems",
        JSON.stringify(state.productIngredientItems)
      );
    },
    updateDiscountPrice(state, action) {
      //state.cartItems.push(action.payload);
      const itemIndex = state.productIngredientItems.findIndex(
        (item) => item.slug === action.payload.slug
      );

      if (itemIndex >= 0) {
        state.productIngredientItems[itemIndex].cartDiscountPrice =
          action.payload.discount_price;
      } else {
        console.log("Item is not in cart");
      }
      //const pseudoId = new Date().getTime();
      localStorage.setItem(
        "productIngredientItems",
        JSON.stringify(state.productIngredientItems)
      );
    },

    updateMeasurementUnit(state, action) {
      //state.cartItems.push(action.payload);
      console.log(action.payload);
      const itemIndex = state.productIngredientItems.findIndex(
        (item) => item.slug === action.payload.slug
      );

      if (itemIndex >= 0) {
        state.productIngredientItems[itemIndex].unit_slug =
          action.payload.unit_slug;
      } else {
        console.log("Item is not in cart");
      }
      //const pseudoId = new Date().getTime();
      localStorage.setItem(
        "productIngredientItems",
        JSON.stringify(state.productIngredientItems)
      );
    },

    clearOrderItems(state) {
      state.productIngredientItems = [];
      localStorage.setItem(
        "productIngredientItems",
        JSON.stringify(state.productIngredientItems)
      );
    },
    getPurchaseIngredientItemTotals(state) {
      let { total, totalPurchase, totalSale, quantity, discount } =
        state.productIngredientItems.reduce(
          (cartTotal, cartItem) => {
            const {
              cartSalePrice,
              cartPurchasePrice,
              cartQuantity,
              cartDiscountPrice,
            } = cartItem;
            const itemTotal = cartSalePrice * cartQuantity;

            const itemTotalPurchase = cartPurchasePrice * cartQuantity;

            cartTotal.total += itemTotal;
            cartTotal.totalSale += itemTotal;
            cartTotal.totalPurchase += itemTotalPurchase;
            cartTotal.quantity += cartQuantity;
            cartTotal.discount += cartDiscountPrice;

            return cartTotal;
          },
          {
            total: 0,
            totalSale: 0,
            totalPurchase: 0,
            quantity: 0,
            discount: 0,
          }
        );

      state.ingredientItemsTotalQunatity = quantity;
      state.ingredientItemsTotalPurchase = totalPurchase;
      state.ingredientItemsTotalSale = totalSale;
      state.ingredientItemsTotalAmount = total;
      state.ingredientItemsTotalDiscount = discount;
    },
  },
  extraReducers: () => {},
});

//Get cart items
export const getProductIngredientItems = (state) =>
  state.product_ingredient_items.productIngredientItems;

export const {
  addIngredientItem,
  removeOrderItem,
  decreaseOrderItem,
  clearOrderItems,
  getPurchaseIngredientItemTotals,
  updateQuantity,
  updateUnitPrice,
  updateDiscountPrice,
  updateMeasurementUnit,
} = productIngredientSlice.actions;
export default productIngredientSlice.reducer;
