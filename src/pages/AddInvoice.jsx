import { useNavigate } from "react-router-dom";
import InvoiceForm from "../components/InvoiceForm";
import { BiArrowBack } from "react-icons/bi";
import Container from "react-bootstrap/Container";
import { useSelector } from "react-redux";
import { selectInvoices } from "../store/invoiceSlice";
import { NAVIGATE } from "../shared/constants";

export function AddInvoice() {
  const navigate = useNavigate();
  const data = useSelector(selectInvoices);

  // set the newInvoiceNumber to manage the records form redux store
  let newInvoiceNumberValue = (
    parseInt(data[data.length - 1]?.info?.invoiceNumber) + 1
  ).toString();

  if (!data.length) {
    newInvoiceNumberValue = "1";
  }

  return (
    <div>
      <Container>
        <div className="d-flex align-items-center">
          <BiArrowBack
            onClick={() => navigate(NAVIGATE.DEFAULT)}
            style={{ height: "33px", width: "33px", padding: "7.5px" }}
            className="text-dark btn btn-outline-secondary"
          />
          <h1 className="ms-3">Add Invoice</h1>
        </div>
        <InvoiceForm
          isEditable={false}
          invoiceNumberValue={newInvoiceNumberValue}
        />
      </Container>
    </div>
  );
}
