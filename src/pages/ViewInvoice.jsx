import InvoiceModal from "../components/InvoiceModal";
import { useSelector } from "react-redux";
import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { fetchInvoicesWithCode } from "../store/invoiceSlice";
import { NAVIGATE } from "../shared/constants";

export function ViewInvoice() {
  const navigate = useNavigate();

  // get the invoice number of selected row from listView
  const rowInvoiceNumber = useLocation().state;

  // fetch the data for selected row from redux store
  const data = useSelector(fetchInvoicesWithCode(rowInvoiceNumber));
  const formData = data[0];

  const [isOpenModal, setIsOpenModal] = useState(true);

  function handleCloseModal() {
    setIsOpenModal(false);
    navigate(NAVIGATE.DEFAULT);
  }

  return (
    <InvoiceModal
      showModal={isOpenModal}
      closeModal={handleCloseModal}
      info={{
        currency: formData.info?.currency,
        invoiceNumber: formData.info?.invoiceNumber,
        dateOfIssue: formData.info?.dateOfIssue,
        billTo: formData.info?.billTo,
        billToEmail: formData.info?.billToEmail,
        billToAddress: formData.info?.billToAddress,
        billFrom: formData.info?.billFrom,
        billFromEmail: formData.info?.billFromEmail,
        billFromAddress: formData.info?.billFromAddress,
        notes: formData.info?.notes,
        total: formData.info?.total,
        subTotal: formData.info?.subTotal,
        taxRate: formData.info?.taxRate,
        taxAmount: formData.info?.taxAmount,
        discountRate: formData.info?.discountRate,
        discountAmount: formData.info?.discountAmount,
      }}
      items={formData.items}
      currency={formData.currency}
      subTotal={formData.subTotal}
      taxAmount={formData.taxAmount}
      discountAmount={formData.discountAmount}
    />
  );
}
