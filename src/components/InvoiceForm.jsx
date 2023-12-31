import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Card from "react-bootstrap/Card";
import InvoiceItem from "./InvoiceItem";
import InvoiceModal from "./InvoiceModal";
import InputGroup from "react-bootstrap/InputGroup";
import { useDispatch } from "react-redux";
import { add, update } from "../store/invoiceSlice";

const InvoiceForm = (props) => {
  const [isOpen, setIsOpen] = useState(false);
  const [currency, setCurrency] = useState("$");
  const [currentDate] = useState(new Date().toLocaleDateString());
  const [invoiceNumber, setInvoiceNumber] = useState(props.invoiceNumberValue);
  const [dateOfIssue, setDateOfIssue] = useState("");
  const [billTo, setBillTo] = useState("");
  const [billToEmail, setBillToEmail] = useState("");
  const [billToAddress, setBillToAddress] = useState("");
  const [billFrom, setBillFrom] = useState("");
  const [billFromEmail, setBillFromEmail] = useState("");
  const [billFromAddress, setBillFromAddress] = useState("");
  const [notes, setNotes] = useState("");
  const [total, setTotal] = useState("0.00");
  const [subTotal, setSubTotal] = useState("0.00");
  const [taxRate, setTaxRate] = useState("");
  const [taxAmount, setTaxAmount] = useState("0.00");
  const [discountRate, setDiscountRate] = useState("");
  const [discountAmount, setDiscountAmount] = useState("0.00");
  const [isFirstApiCall, setIsFirstApiCall] = useState(true);

  useEffect(() => {
    if (props.isEditable) {
      setCurrency(props.editData.currency);
      setBillTo(props.editData.info.billTo);
      setInvoiceNumber(props.editData.info.invoiceNumber);
      setDateOfIssue(props.editData.info.dateOfIssue);
      setBillToEmail(props.editData.info.billToEmail);
      setBillToAddress(props.editData.info.billToAddress);
      setBillFrom(props.editData.info.billFrom);
      setBillFromEmail(props.editData.info.billFromEmail);
      setBillFromAddress(props.editData.info.billFromAddress);
      setNotes(props.editData.info.notes);
      setSubTotal(props.editData.subTotal);
      setTotal(props.editData);
      setTaxRate(props.editData.info.taxRate);
      setTaxAmount(props.editData.taxAmount);
      setDiscountRate(props.editData.info.discountRate);
      setDiscountAmount(props.editData.discountAmount);
      setItems(props.editData.items);
    }
    setIsFirstApiCall(false);
  }, [isFirstApiCall]);

  const [items, setItems] = useState([
    {
      id: "1",
      name: "",
      description: "",
      price: "1.00",
      quantity: 1,
    },
  ]);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    handleCalculateTotal();
  }, [dateOfIssue]);

  const handleRowDel = (deletedItem) => {
    const updatedItems = items.filter((item) => item !== deletedItem);
    setItems(updatedItems);
  };

  const handleAddEvent = () => {
    const newItem = {
      id: (+new Date() + Math.floor(Math.random() * 999999)).toString(36),
      name: "",
      price: "1.00",
      description: "",
      quantity: 1,
    };
    setItems([...items, newItem]);
  };

  useEffect(() => {
    handleCalculateTotal();
  }, [handleAddEvent, handleRowDel]);

  const handleCalculateTotal = () => {
    let subTotal = 0;

    items.forEach((item) => {
      subTotal += parseFloat((item.price * item.quantity).toFixed(2));
    });

    setSubTotal(subTotal.toFixed(2));

    const taxAmountValue = parseFloat((subTotal * (taxRate / 100)).toFixed(2));
    setTaxAmount(taxAmountValue.toFixed(2));

    const discountAmountValue = parseFloat(
      (subTotal * (discountRate / 100)).toFixed(2)
    );
    setDiscountAmount(discountAmountValue.toFixed(2));

    setTotal((subTotal - discountAmountValue + taxAmountValue).toFixed(2));
  };

  const onItemizedItemEdit = (evt) => {
    const { id, name, value } = evt.target;
    const updatedItems = items.map((item) => {
      if (item.id === id) {
        return { ...item, [name]: value };
      }
      return item;
    });

    setItems(updatedItems);
    handleCalculateTotal();
  };

  const editField = (event) => {
    const { name, value } = event.target;
    if (name === "taxRate" || name === "discountRate") {
      if (value < 0) return;
    }
    switch (name) {
      case "dateOfIssue":
        setDateOfIssue(value);
        break;
      case "invoiceNumber":
        setInvoiceNumber(value);
        break;
      case "billTo":
        setBillTo(value);
        break;
      case "billToEmail":
        setBillToEmail(value);
        break;
      case "billToAddress":
        setBillToAddress(value);
        break;
      case "billFrom":
        setBillFrom(value);
        break;
      case "billFromEmail":
        setBillFromEmail(value);
        break;
      case "billFromAddress":
        setBillFromAddress(value);
        break;
      case "notes":
        setNotes(value);
        break;
      case "taxRate":
        setTaxRate(value);
        break;
      case "discountRate":
        setDiscountRate(value);
        break;
      default:
        break;
    }

    handleCalculateTotal();
  };

  const onCurrencyChange = (event) => {
    setCurrency(event.target.value);
  };

  const openModal = (event) => {
    event.preventDefault();
    handleCalculateTotal();
    setIsOpen(true);
  };

  const closeModal = () => setIsOpen(false);

  function handleOnSubmit(event) {
    event.preventDefault();
    handleCalculateTotal();
    const data = {
      info: {
        currency,
        invoiceNumber,
        dateOfIssue,
        billTo,
        billToEmail,
        billToAddress,
        billFrom,
        billFromEmail,
        billFromAddress,
        notes,
        total,
        subTotal,
        taxRate,
        taxAmount,
        discountRate,
        discountAmount,
      },
      items: items,
      currency: currency,
      subTotal: subTotal,
      taxAmount: taxAmount,
      discountAmount: discountAmount,
    };
    if (!props.isEditable) {
      dispatch(add(data));
    } else {
      dispatch(update(data));
    }
    navigate("/");
  }

  return (
    <Form onSubmit={handleOnSubmit}>
      <Row>
        <Col md={8} lg={9}>
          <Card className="p-4 p-xl-5 my-3 my-xl-4">
            <div className="d-flex flex-row align-items-start justify-content-between mb-3">
              <div className="d-flex flex-column">
                <div className="d-flex flex-column">
                  <div className="mb-2">
                    <span className="fw-bold">Current&nbsp;Date:&nbsp;</span>
                    <span className="current-date">{currentDate}</span>
                  </div>
                </div>
                <div className="d-flex flex-row align-items-center">
                  <span className="fw-bold d-block me-2">Due&nbsp;Date:</span>
                  <Form.Control
                    type="date"
                    value={dateOfIssue}
                    name="dateOfIssue"
                    onChange={editField}
                    style={{
                      maxWidth: "150px",
                    }}
                    required="required"
                  />
                </div>
              </div>
              <div className="d-flex flex-row align-items-center">
                <span className="fw-bold me-2">Invoice&nbsp;Number:&nbsp;</span>
                <Form.Control
                  type="number"
                  value={invoiceNumber}
                  name="invoiceNumber"
                  onChange={editField}
                  min="1"
                  style={{
                    maxWidth: "70px",
                  }}
                  required="required"
                  disabled={true}
                />
              </div>
            </div>
            <hr className="my-4" />
            <Row className="mb-5">
              <Col>
                <Form.Label className="fw-bold">Bill to:</Form.Label>
                <Form.Control
                  placeholder={"Who is this invoice to?"}
                  rows={3}
                  value={billTo}
                  type="text"
                  name="billTo"
                  className="my-2"
                  onChange={editField}
                  autoComplete="name"
                  required="required"
                  disabled={props.isEditable}
                />
                <Form.Control
                  placeholder={"Email address"}
                  value={billToEmail}
                  type="email"
                  name="billToEmail"
                  className="my-2"
                  onChange={editField}
                  autoComplete="email"
                  required="required"
                  disabled={props.isEditable}
                />
                <Form.Control
                  placeholder={"Billing address"}
                  value={billToAddress}
                  type="text"
                  name="billToAddress"
                  className="my-2"
                  autoComplete="address"
                  onChange={editField}
                  required="required"
                  disabled={props.isEditable}
                />
              </Col>
              <Col>
                <Form.Label className="fw-bold">Bill from:</Form.Label>
                <Form.Control
                  placeholder={"Who is this invoice from?"}
                  rows={3}
                  value={billFrom}
                  type="text"
                  name="billFrom"
                  className="my-2"
                  onChange={editField}
                  autoComplete="name"
                  required="required"
                  disabled={props.isEditable}
                />
                <Form.Control
                  placeholder={"Email address"}
                  value={billFromEmail}
                  type="email"
                  name="billFromEmail"
                  className="my-2"
                  onChange={editField}
                  autoComplete="email"
                  required="required"
                  disabled={props.isEditable}
                />
                <Form.Control
                  placeholder={"Billing address"}
                  value={billFromAddress}
                  type="text"
                  name="billFromAddress"
                  className="my-2"
                  autoComplete="address"
                  onChange={editField}
                  required="required"
                  disabled={props.isEditable}
                />
              </Col>
            </Row>
            <InvoiceItem
              onItemizedItemEdit={onItemizedItemEdit}
              onRowAdd={handleAddEvent}
              onRowDel={handleRowDel}
              currency={currency}
              items={items}
            />
            <Row className="mt-4 justify-content-end">
              <Col lg={6}>
                <div className="d-flex flex-row align-items-start justify-content-between">
                  <span className="fw-bold">Subtotal:</span>
                  <span>
                    {currency}
                    {subTotal}
                  </span>
                </div>
                <div className="d-flex flex-row align-items-start justify-content-between mt-2">
                  <span className="fw-bold">Discount:</span>
                  <span>
                    <span className="small ">({discountRate || 0}%)</span>
                    {currency}
                    {discountAmount || 0}
                  </span>
                </div>
                <div className="d-flex flex-row align-items-start justify-content-between mt-2">
                  <span className="fw-bold">Tax:</span>
                  <span>
                    <span className="small ">({taxRate || 0}%)</span>
                    {currency}
                    {taxAmount || 0}
                  </span>
                </div>
                <hr />
                <div
                  className="d-flex flex-row align-items-start justify-content-between"
                  style={{
                    fontSize: "1.125rem",
                  }}
                >
                  <span className="fw-bold">Total:</span>
                  <span className="fw-bold">
                    {currency}
                    {total || 0}
                  </span>
                </div>
              </Col>
            </Row>
            <hr className="my-4" />
            <Form.Label className="fw-bold">Notes:</Form.Label>
            <Form.Control
              placeholder="Thanks for your business!"
              name="notes"
              value={notes}
              onChange={editField}
              as="textarea"
              className="my-2"
              rows={1}
            />
          </Card>
        </Col>
        <Col md={4} lg={3}>
          <div className="sticky-top pt-md-3 pt-xl-4">
            <Button
              variant="primary"
              type="submit"
              onClick={openModal}
              className="d-block w-100"
            >
              Review Invoice
            </Button>
            <Button
              variant="danger"
              type="submit"
              className="d-block my-2 w-100"
            >
              {!props.isEditable ? 'Create Invoice' : 'Edit Invoice'}
            </Button>
            <InvoiceModal
              showModal={isOpen}
              closeModal={closeModal}
              info={{
                currency,
                invoiceNumber,
                dateOfIssue,
                billTo,
                billToEmail,
                billToAddress,
                billFrom,
                billFromEmail,
                billFromAddress,
                notes,
                total,
                subTotal,
                taxRate,
                taxAmount,
                discountRate,
                discountAmount,
              }}
              items={items}
              currency={currency}
              subTotal={subTotal}
              taxAmount={taxAmount}
              discountAmount={discountAmount}
            />
            <Form.Group className="mb-3">
              <Form.Label className="fw-bold">Currency:</Form.Label>
              <Form.Select
                onChange={onCurrencyChange}
                className="btn btn-light my-1"
                aria-label="Change Currency"
                disabled={props.isEditable}
              >
                <option value="$">USD (United States Dollar)</option>
                <option value="£">GBP (British Pound Sterling)</option>
                <option value="¥">JPY (Japanese Yen)</option>
                <option value="$">CAD (Canadian Dollar)</option>
                <option value="$">AUD (Australian Dollar)</option>
                <option value="$">SGD (Signapore Dollar)</option>
                <option value="¥">CNY (Chinese Renminbi)</option>
                <option value="₿">BTC (Bitcoin)</option>
              </Form.Select>
            </Form.Group>
            <Form.Group className="my-3">
              <Form.Label className="fw-bold">Tax rate:</Form.Label>
              <InputGroup className="my-1 flex-nowrap">
                <Form.Control
                  name="taxRate"
                  type="number"
                  value={taxRate}
                  onChange={editField}
                  className="bg-white border"
                  placeholder="0.0"
                  min="0.00"
                  step="0.01"
                  max="100.00"
                />
                <InputGroup.Text className="bg-light fw-bold text-secondary small">
                  %
                </InputGroup.Text>
              </InputGroup>
            </Form.Group>
            <Form.Group className="my-3">
              <Form.Label className="fw-bold">Discount rate:</Form.Label>
              <InputGroup className="my-1 flex-nowrap">
                <Form.Control
                  name="discountRate"
                  type="number"
                  value={discountRate}
                  onChange={editField}
                  className="bg-white border"
                  placeholder="0.0"
                  min="0.00"
                  step="0.01"
                  max="100.00"
                />
                <InputGroup.Text className="bg-light fw-bold text-secondary small">
                  %
                </InputGroup.Text>
              </InputGroup>
            </Form.Group>
          </div>
        </Col>
      </Row>
    </Form>
  );
};

export default InvoiceForm;
