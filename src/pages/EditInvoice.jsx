import { useNavigate, useLocation } from "react-router-dom";
import InvoiceForm from "../components/InvoiceForm";
import { BiArrowBack } from "react-icons/bi";
import { useSelector } from "react-redux";
import { fetchInvoicesWithCode } from "../store/invoiceSlice";
import { NAVIGATE } from "../shared/constants";

export function EditInvoice() {
  const navigate = useNavigate();

  // fetch the data from redux store
  const rowInvoiceNumber = useLocation().state;

  // fetch the data for selected row from redux store
  const data = useSelector(fetchInvoicesWithCode(rowInvoiceNumber));
  const formData = data[0];

  return (
    <div>
      <div className="d-flex align-items-center">
        <BiArrowBack
          onClick={() => navigate(NAVIGATE.DEFAULT)}
          style={{ height: "33px", width: "33px", padding: "7.5px" }}
          className="text-dark btn btn-outline-secondary"
        />
        <h1 className="ms-3">Edit Invoice</h1>
      </div>
      <InvoiceForm isEditable={true} editData={formData} />
    </div>
  );
}
