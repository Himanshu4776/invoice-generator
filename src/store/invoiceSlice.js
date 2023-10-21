import { createSlice } from "@reduxjs/toolkit";
import { createSelector } from "reselect";
import { DUMMY_DATA } from "../shared/dummyData";

const initialState = {
  value: [DUMMY_DATA],
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
      // remove the matching the record form store
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

const getDataArray = (state) => state.invoices.value;

export const selectInvoices = createSelector(
  (state) => state.invoices,
  (invoices) => invoices.value
);

// Fetch the particular record form store for view and edit states.
export const fetchInvoicesWithCode = (codeToFilter) =>
  createSelector([getDataArray], (dataArray) => {
    return dataArray.filter((item) => item.info.invoiceNumber === codeToFilter);
  });

export const { add, update, remove, getInvoiceData } = invoiceSlice.actions;
export default invoiceSlice.reducer;
