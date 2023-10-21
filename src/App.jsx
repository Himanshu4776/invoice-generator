import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ListInvoice } from "./pages/ListInvoice";
import { EditInvoice } from "./pages/EditInvoice";
import { AddInvoice } from "./pages/AddInvoice";
import { ViewInvoice } from "./pages/ViewInvoice";

function App() {
  return (
    <div className="App d-flex flex-column align-items-center justify-content-center w-100">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<ListInvoice />} />
          <Route path="add-invoice" element={<AddInvoice />} />
          <Route path="edit-invoice" element={<EditInvoice />} />
          <Route path="view-invoice" element={<ViewInvoice />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
