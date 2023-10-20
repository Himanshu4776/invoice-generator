import InvoiceForm from "../components/InvoiceForm";

export function EditInvoice() {
    return (
        <>
            <h1>Edit Invoice</h1>
            <InvoiceForm isEditable={true} />
        </>
    );
}