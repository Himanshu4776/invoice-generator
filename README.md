# Invoice Generator - React Redux App
![React](https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB) ![](https://img.shields.io/badge/bootstrap-%23563D7C.svg?style=for-the-badge&logo=bootstrap&logoColor=white)

An Invoice creator project built with React. Add itemized items, configure quantity, prices, tax rates and discounts. Download Invoice as PDFs to your device. Uses [jspdf-react](https://www.npmjs.com/package/jspdf-react) to capture the data from the modal and covert it from canvas -> pdf.

### Live Demo
- Deployed link: https://invoice-generator-iota-tawny.vercel.app/
- Youtube demo: https://youtu.be/KJxF6FzaF4I

### Installation

```
git clone https://github.com/Himanshu4776/invoice-generator

npm install

npm run dev
```

### New features Implemented:
- Added redux toolkit and managed state with redux toolkit.
- Performed CRUD Operations on invoices.
- Fixed Bugs.
- Improved UI
- Moved the Class Components and depreciated libraries to newer Functional components and updated libraries.

### Code Documentation:
App.jsx renders the routes from BrowserROuter and route form react-router-dom to render the navigated route components.
```
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<ListInvoice />} />
      <Route path="add-invoice" element={<AddInvoice />} />
      <Route path="edit-invoice" element={<EditInvoice />} />
      <Route path="view-invoice" element={<ViewInvoice />} />
    </Routes>
  </BrowserRouter>
```

Here the base route is for "/" which renders the ListInvoice component which displays the list of invoices having actions to view, edit and delete invoices.
- App redierects the app to "add-invoice" to naviagte to <AddInvoice /> .
- App redierects the app to "edit-invoice" to naviagte to <EditInvoice /> .
- App redierects the app to "view-invoice" to naviagte to <ViewInvoice /> .

ListInvoice component uses const useNavigate() from react-router-dom to navigate user to following pages to perform CRUD operations with the help of handler functions.
```
const navigate = useNavigate();

function handleEditClick(code) {
    navigate(NAVIGATE.EDIT, { state: code });
  }
```

The component gets data from Redux store by using useSelector() hook and then list is displayed by rendering the invoices in the store data.

#### components
All the base components are used as reusable components and stored in src/components folder which are used by Pages components.
- InvoiceModal: Invoice Modal displays a Modal having information related the invoice with actions to download invoice and close modal. To generate invoice GenerateInvoice() is used as displayed below.
```
const GenerateInvoice = () => {
  html2canvas(document.querySelector("#invoiceCapture")).then((canvas) => {
    const imgData = canvas.toDataURL("image/png", 1.0);
    const pdf = new jsPDF({
      orientation: "portrait",
      unit: "pt",
      format: [612, 792],
    });
    pdf.internal.scaleFactor = 1;
    const imgProps = pdf.getImageProperties(imgData);
    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
    pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);
    pdf.save("invoice-001.pdf");
  });
};
```
- InvoiceForm: This is a React component that provides a form for creating or editing an invoice. It uses several hooks for managing state and effects, and it dispatches actions to the Redux store for adding or updating invoices.

This form uses useDispatch() function on submiiting the form to store the data in the redux store and navigate user back to List screen.
```
dispatch(add(data)); // while in case of add-invoice
dispatch(update(data)); // while in case of edit-invoice
```
Invoice Form uses InvoiceItem component to show users the Items of invoices present.
```
<InvoiceItem
  onItemizedItemEdit={onItemizedItemEdit}
  onRowAdd={handleAddEvent}
  onRowDel={handleRowDel}
  currency={currency}
  items={items}
/>
```
- InvoiceItem: this component handles the changes in the invoiceItem list and the perform of CRUD operations on items by using callbacks.

#### Redux store:
Redux store is a store created using configureStore() form redux toolkit having reducer InvoiceSlice as invoices.  

InvoiceSlice:
It is a Redux slice for managing invoices in the application. It uses the Redux Toolkit's createSlice function to generate action creators and action types that correspond to updating, adding, and removing invoices.

Reducers
***
The invoiceSlice object contains several reducer functions:
- add: This reducer adds a new invoice to the state. It takes an action with a payload of the invoice to be added.
```
add: (state, action) => {
  state.value.push(action.payload);
},
```
- update: This reducer updates an existing invoice in the state. It first removes the old invoice, then adds the updated invoice. The action's payload should be the updated invoice.
```
update: (state, action) => {
  state.value = state.value.filter(
    (item) =>
      item.info.invoiceNumber !== action.payload?.info?.invoiceNumber
  );
  state.value.push(action.payload);
},
```
- remove: This reducer removes an invoice from the state. The action's payload should be the invoice number of the invoice to be removed.
```
remove: (state, action) => {
  state.value = state.value.filter(
    (item) => item.info.invoiceNumber !== action.payload
  );
},
```

Selectors
***
- selectInvoices: This selector returns the current state of the invoices.
```
export const selectInvoices = createSelector(
  (state) => state.invoices,
  (invoices) => invoices.value
);
```
- fetchInvoicesWithCode: This selector returns a specific invoice based on its invoice number. The codeToFilter parameter should be the invoice number of the invoice to be retrieved.
```
export const fetchInvoicesWithCode = (codeToFilter) =>
  createSelector([getDataArray], (dataArray) => {
    return dataArray.filter((item) => item.info.invoiceNumber === codeToFilter);
  });
```
