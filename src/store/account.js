import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  data: {
    success: null,
    message: "",
    result: {},
  },
};

export const counterSlice = createSlice({
  name: "account",
  initialState,
  reducers: {
    getAccountData: (state, action) => {
      state.data = action.payload;
    },
    updateAccountData: (state, action) => {
      state.data = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { getAccountData, updateAccountData } = counterSlice.actions;

export default counterSlice.reducer;
