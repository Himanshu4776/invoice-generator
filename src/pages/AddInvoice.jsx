import { useNavigate } from "react-router-dom";
import InvoiceForm from "../components/InvoiceForm";
import { BiArrowBack } from "react-icons/bi";
import Container from "react-bootstrap/Container";

export function AddInvoice() {
  const navigate = useNavigate();
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
        <InvoiceForm isEditable={false} />
      </Container>
    </div>
  );
}
