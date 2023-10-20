import InvoiceForm from '../components/InvoiceForm'

export function AddInvoice() {
    return (
        <>
            <h1>Add Invoice</h1>
            <InvoiceForm isEditable={false} />
        </>
    );
}