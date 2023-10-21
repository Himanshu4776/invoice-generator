import { useNavigate, useLocation } from "react-router-dom";
import InvoiceForm from "../components/InvoiceForm";
import { BiArrowBack } from "react-icons/bi";
import { useSelector } from "react-redux";
import {selectInvoices} from  "../store/invoiceSlice";

export function EditInvoice() {
  const navigate = useNavigate();
  const rowInvoiceNumber = useLocation().state;
  console.log('data', rowInvoiceNumber);

  // import { getInvoiceData } from "../redux/invoiceSlice";
  // const data = useSelector((state) => getInvoiceData(state, props));
  // const formData = data?.payload?.invoices?.value[0];

  const data = useSelector(selectInvoices(rowInvoiceNumber));
  const formData = data[0];
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
      <InvoiceForm isEditable={true} editData={formData} />
    </div>
  );
}
