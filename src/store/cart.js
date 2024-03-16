import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  cart_items: [],
};

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    pushOrUpdateItemInCart: (state, action) => {
      const existingItemIndex = state.cart_items.findIndex(
        (item) =>
          item.email === action.payload.email &&
          item.product_id === action.payload.product_id
      );
      if (existingItemIndex !== -1) {
        state.cart_items[existingItemIndex].quantity = action.payload.quantity;
      } else {
        state.cart_items.push({
          customer_email: action.payload.customer_email,
          product_id: action.payload.product_id,
          quantity: action.payload.quantity,
        });
      }
    },
    updateCartItems: (state, action) => {
      state.cart_items = action.payload;
    },
    deleteCartItem: (state, action) => {
      state.cart_items = state.cart_items.filter(
        (item) => item.product_id !== action.payload.product_id
      );
    },
    deleteCartItems: (state) => {
      state.cart_items = [];
    },
  },
});

export const {
  pushOrUpdateItemInCart,
  updateCartItems,
  deleteCartItem,
  deleteCartItems,
} = cartSlice.actions;

export default cartSlice.reducer;
