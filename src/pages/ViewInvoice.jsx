import InvoiceModal from "../components/InvoiceModal";

export function ViewInvoice(props) {
    return (
        <InvoiceModal
            showModal={props.isOpen}
            closeModal={props.closeModal}
            info={{
            currency,
            invoiceNumber,
            dateOfIssue,
            billTo,
            billToEmail,
            billToAddress,
            billFrom,
            billFromEmail,
            billFromAddress,
            notes,
            total,
            subTotal,
            taxRate,
            taxAmount,
            discountRate,
            discountAmount,
            }}
            items={props.items}
            currency={props.currency}
            subTotal={props.subTotal}
            taxAmount={props.taxAmount}
            discountAmount={props.discountAmount}
        />
    );
}