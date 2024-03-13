import { configureStore } from "@reduxjs/toolkit";
// import authReducer from "./authSlice";
import accountReducer from "./account";

export const store = configureStore({
  reducer: {
    account: accountReducer,
  },
});

export default store;
