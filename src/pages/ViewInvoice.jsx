import InvoiceModal from "../components/InvoiceModal";
import { useSelector } from "react-redux";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { selectInvoices } from "../store/invoiceSlice";

export function ViewInvoice() {
  const navigate = useNavigate();
  const data = useSelector(selectInvoices);
  const formData = data[0];

  // import { getInvoiceData } from "../redux/invoiceSlice";
  // const data = useSelector((state) => getInvoiceData(state, props));
  // const formData = data?.payload?.invoices?.value[0];

  console.log('formData', formData);

  const [isOpenModal, setIsOpenModal] = useState(true);

  function handleCloseModal() {
    setIsOpenModal(false);
    navigate("/");
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
