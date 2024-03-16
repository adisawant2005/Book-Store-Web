import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  items: [
    {
      item_id: "",
      item_name: "",
      item_description: "",
      item_price: 0,
      item_category: "",
      item_rating: 0,
      item_reviews: 0,
      item_image_url: "",
      item_seller_id: "",
    },
  ],
  selectedItem: {
    item_id: "",
    item_name: "",
    item_description: "",
    item_price: 0,
    item_category: "",
    item_rating: 0,
    item_reviews: 0,
    item_image_url: "",
    item_seller_id: "",
  },
};

export const itemsSlice = createSlice({
  name: "items",
  initialState,
  reducers: {
    selectedItem: (state, action) => {
      state.selectedItem = action.payload;
    },
    updateItems: (state, action) => {
      state.items = action.payload;
    },
  },
});

export const { selectedItem, updateItems } = itemsSlice.actions;

export default itemsSlice.reducer;
