import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  data: {
    success: null,
    message: "",
    result: {
      email: "",
      password: "",
      first_name: "",
      last_name: "",
      age: 0,
      gender: "",
      country: "",
      city: "",
      street_address: "",
      postal_code: "",
      phone_number: "",
      birthdate: "",
      profile_picture_address: "",
    },
  },
};

export const accountSlice = createSlice({
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
export const { getAccountData, updateAccountData } = accountSlice.actions;

export default accountSlice.reducer;
