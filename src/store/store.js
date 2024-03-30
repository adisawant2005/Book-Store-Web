import { configureStore } from "@reduxjs/toolkit";
// import authReducer from "./authSlice";
import accountReducer from "./account";
import itemsReducer from "./items";
import cartReducer from "./cart";
import ordersReducer from "./order";

export const store = configureStore({
  reducer: {
    account: accountReducer,
    items: itemsReducer,
    cart: cartReducer,
    orders: ordersReducer,
  },
});

export default store;
