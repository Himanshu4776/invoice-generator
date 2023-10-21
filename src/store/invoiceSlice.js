import { createSlice } from "@reduxjs/toolkit";
import { createSelector } from 'reselect';

const initialState = {
  value: [
    {
      info: {
        currency: "$",
        invoiceNumber: 1,
        dateOfIssue: "2023-10-21",
        billTo: "dqwd@.com",
        billToEmail: "dqwd@we.com",
        billToAddress: "dqwd@.com",
        billFrom: "dqwd@.com",
        billFromEmail: "dqwd@dqw.com",
        billFromAddress: "dqwd@.com",
        notes: "",
        total: "1.00",
        subTotal: "1.00",
        taxRate: "",
        taxAmount: "0.00",
        discountRate: "",
        discountAmount: "0.00",
      },
      items: [
        {
          id: "lnyz1pxg",
          name: "dqwd@.com",
          price: "1.00",
          description: "dqwd@.com",
          quantity: 1,
        },
      ],
      currency: "$",
      subTotal: "1.00",
      taxAmount: "0.00",
      discountAmount: "0.00",
    },
  ],
};

export const invoiceSlice = createSlice({
  name: "invoices",
  initialState,
  reducers: {
    add: (state, action) => {
      state.value.push(action.payload);
    },
    update: (state, action) => {
      // remove the previous value object
      state.value = state.value.filter(
        (item) =>
          item.info.invoiceNumber !== action.payload?.info?.invoiceNumber
      );
      // add the newer value object
      state.value.push(action.payload);
    },
    remove: (state, action) => {
      state.value = state.value.filter(
        (item) => item.info.invoiceNumber !== action.payload
      );
    },
    getInvoiceData: (state, action) => {
      const val = state.value?.filter(
        (item) => item?.info?.invoiceNumber === action.payload
      );
    },
  },
});

export const selectInvoices = createSelector(
  state => state.invoices,
  invoices => invoices.value
);

export const { add, update, remove, getInvoiceData } = invoiceSlice.actions;
export default invoiceSlice.reducer;
