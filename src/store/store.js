import { configureStore } from "@reduxjs/toolkit";
import invoiceSlice from "./invoiceSlice";

// store created using configure store form redux toolkit to store data within application.
export const store = configureStore({
  reducer: {
    invoices: invoiceSlice,
  },
});
