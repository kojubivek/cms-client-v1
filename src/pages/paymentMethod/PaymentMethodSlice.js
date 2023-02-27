import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  payments: [],
};

const paymentMethodSlice = createSlice({
  name: "paymentMethods",
  initialState,
  reducers: {
    setPayments: (state, { payload = {} }) => {
      state.payments = payload;
    },
  },
});

const { reducer, actions } = paymentMethodSlice;

export const { setPayments } = actions;

export default reducer;
