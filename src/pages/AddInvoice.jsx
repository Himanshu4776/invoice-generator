import { useNavigate } from "react-router-dom";
import InvoiceForm from "../components/InvoiceForm";
import { BiArrowBack } from "react-icons/bi";
import Container from "react-bootstrap/Container";
import { useSelector } from "react-redux";
import {selectInvoices} from  "../store/invoiceSlice";

export function AddInvoice() {
  const navigate = useNavigate();
  const data = useSelector(selectInvoices);

  const newInvoiceNumberValue = (parseInt(data[data.length - 1]?.info?.invoiceNumber) + 1).toString();
  console.log('invoiceNumber', newInvoiceNumberValue);

  return (
    <div>
      <Container>
        <div className="d-flex">
          <BiArrowBack
            onClick={() => navigate("/")}
            style={{ height: "33px", width: "33px", padding: "7.5px" }}
            className="text-white btn btn-secondary"
          />
          <h1>Add Invoice</h1>
        </div>
        <InvoiceForm isEditable={false} invoiceNumberValue={newInvoiceNumberValue} />
      </Container>
    </div>
  );
}
