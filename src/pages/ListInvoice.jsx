import "bootstrap/dist/css/bootstrap.min.css";
import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";
import { BiTrash, BiEditAlt } from "react-icons/bi";
import { AiFillEye } from "react-icons/ai";
import React from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Container from "react-bootstrap/Container";
import { remove } from "../store/invoiceSlice";

export const ListInvoice = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const data = useSelector((state) => state.invoices.value);

  console.log('data', data);

  function handleEditClick(code) {
    console.log('code', code);
    navigate("edit-invoice", { state: code });
  }

  function handleAddClick() {
    navigate("add-invoice");
  }

  function handleDeleteClick(code) {
    dispatch(remove(code));
  }

  function handleViewClick(code) {
    navigate("view-invoice", { state: code });
  }

  return (
    <>
      <h1>Invoice generator</h1>
      <div className="d-flex">
        <h3>List of Invoices</h3>
        <Button className="fw-bold " onClick={handleAddClick}>
          Add Invoice
        </Button>
      </div>
      <Container>
        <div>
          <Table>
            <thead>
              <tr>
                <th>Invoice Number</th>
                <th>Due Date</th>
                <th>Currency</th>
                <th>Total</th>
                <th className="text-center">ACTION</th>
              </tr>
            </thead>
            <tbody>
              {data.map((item, index) => (
                <tr key={index}>
                  <td className="align-middle">{item.info?.invoiceNumber}</td>
                  <td className="align-middle">{item.info?.dateOfIssue}</td>
                  <td className="align-middle">{item.currency}</td>
                  <td className="align-middle">{item.info?.total}</td>
                  <td className="text-center" style={{ minWidth: "50px" }}>
                    <BiTrash
                      onClick={() =>
                        handleDeleteClick(item.info?.invoiceNumber)
                      }
                      style={{
                        height: "33px",
                        width: "33px",
                        padding: "7.5px",
                      }}
                      className="text-white mr-2 btn btn-danger"
                    />
                    <BiEditAlt
                      onClick={() => {
                        handleEditClick(item.info?.invoiceNumber);
                      }}
                      style={{
                        height: "33px",
                        width: "33px",
                        padding: "7.5px",
                      }}
                      className="text-white mx-2 btn btn-warning"
                    />
                    <AiFillEye
                      onClick={() => {
                        handleViewClick(item.info?.invoiceNumber);
                      }}
                      style={{
                        height: "33px",
                        width: "33px",
                        padding: "7.5px",
                      }}
                      className="text-white btn btn-success"
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </div>
      </Container>
    </>
  );
};