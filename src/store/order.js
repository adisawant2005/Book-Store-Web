import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  orderedItems: [
    // {
    //   order_id: "",
    //   customer_id: "",
    //   product_id: "",
    //   order_date: "",
    //   transaction_id: "",
    //   quantity: 0,
    //   unit_price: 0,
    //   shipping_address: "",
    //   shipping_city: "",
    //   shipping_state: "",
    //   shipping_zip_code: "",
    //   shipping_country: "",
    //   shipping_method: "",
    //   order_status: "",
    //   estimated_delivery_date: "",
    //   actual_delivery_date: "",
    // },
  ],
};

export const orderSlice = createSlice({
  name: "orders",
  initialState,
  reducers: {
    updateOrders: (state, action) => {
      state.orderedItems = action.payload;
    },
    deleteOrder: (state, action) => {
      state.orderedItems = state.orderedItems.filter(
        (item) => item.order_id !== action.payload
      );
    },
  },
});

export const { updateOrders, deleteOrder } = orderSlice.actions;

export default orderSlice.reducer;
