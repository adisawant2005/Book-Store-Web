import { configureStore } from "@reduxjs/toolkit";
// import authReducer from "./authSlice";
import accountReducer from "./account";
import itemsReducer from "./items";
import cartReducer from "./cart";

export const store = configureStore({
  reducer: {
    account: accountReducer,
    items: itemsReducer,
    cart: cartReducer,
  },
});

export default store;
