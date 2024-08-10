import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  items: [
    // {
    //   item_id: "",
    //   item_name: "",
    //   item_description: "",
    //   item_price: 0,
    //   item_category: "",
    //   item_rating: 0,
    //   item_reviews: 0,
    //   item_image_url: "",
    //   item_seller_id: "",
    //   item_quantity: "",
    // },
  ],
  itemsOnSale: [
    // {
    //   item_id: "",
    //   item_name: "",
    //   item_description: "",
    //   item_price: 0,
    //   item_category: "",
    //   item_rating: 0,
    //   item_reviews: 0,
    //   item_image_url: "",
    //   item_seller_id: "",
    //   item_quantity: "",
    // },
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
    item_quantity: "",
  },
  dummyObjForUpdating: {
    item_id: "",
    item_name: "",
    item_description: "",
    item_price: "",
    item_category: "",
    // item_rating: "",
    // item_reviews: "",
    item_image_url: "",
    // item_seller_id: "",
    item_quantity: "",
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
    updateItemsOnSale: (state, action) => {
      state.itemsOnSale = action.payload;
    },
    addItemOnSale: (state, action) => {
      state.itemsOnSale.push(action.payload);
    },
    updateItemOnSale: (state, action) => {
      state.itemsOnSale = state.itemsOnSale.filter(
        (item) => item.item_id !== action.payload.item_id
      );
      state.itemsOnSale.push(action.payload);
    },
    deleteItemOnSale: (state, action) => {
      state.itemsOnSale = state.itemsOnSale.filter(
        (item) => item.item_id !== action.payload.item_id
      );
    },
    setItemOnSaleForUpdate: (state, action) => {
      state.dummyObjForUpdating = action.payload;
    },
    updateItemKeyOnSale: (state, action) => {
      state.dummyObjForUpdating = {
        ...state.dummyObjForUpdating,
        [action.key]: action.value,
      };
    },
  },
});

export const {
  selectedItem,
  updateItems,
  updateItemsOnSale,
  addItemOnSale,
  updateItemOnSale,
  deleteItemOnSale,
  setItemOnSaleForUpdate,
  updateItemKeyOnSale,
} = itemsSlice.actions;

export default itemsSlice.reducer;
