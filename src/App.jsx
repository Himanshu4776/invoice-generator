import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import Container from 'react-bootstrap/Container';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import InvoiceForm from './components/InvoiceForm';
import {ListInvoice} from './pages/ListInvoice'
import {EditInvoice} from './pages/EditInvoice'
import {AddInvoice} from './pages/AddInvoice'


function App() {
  return (
    <div className="App d-flex flex-column align-items-center justify-content-center w-100">
      <Container>
        {/* <InvoiceForm/> */}
        <BrowserRouter>
            <Routes>
              <Route path="/" element={<ListInvoice />} />
                <Route path='add-invoice' element={<AddInvoice />} />
                <Route path='edit-invoice' element={<EditInvoice />} />
            </Routes>
          </BrowserRouter>
      </Container>
    </div>
  )
}

export default App
