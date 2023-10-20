import { useNavigate } from "react-router-dom";
import InvoiceForm from "../components/InvoiceForm";
import { BiArrowBack } from "react-icons/bi";

export function EditInvoice() {
  const navigate = useNavigate();
  return (
    <div>
      <div className="d-flex">
        <BiArrowBack
          onClick={() => navigate("/")}
          style={{ height: "33px", width: "33px", padding: "7.5px" }}
          className="text-white btn btn-secondary"
        />
        <h1>Edit Invoice</h1>
      </div>
      <InvoiceForm isEditable={true} />
    </div>
  );
}
