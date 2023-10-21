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
import {currencyToString, NAVIGATE} from '../shared/constants';
import {FcEmptyTrash} from "react-icons/fc";

export const ListInvoice = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const data = useSelector((state) => state.invoices.value);

  function handleEditClick(code) {
    navigate(NAVIGATE.EDIT, { state: code });
  }

  function handleAddClick() {
    navigate(NAVIGATE.ADD);
  }

  function handleViewClick(code) {
    navigate(NAVIGATE.VIEW, { state: code });
  }

  function handleDeleteClick(code) {
    dispatch(remove(code));
  }

  return (
    <>
      <div className="d-flex justify-content-center align-items-center mb-5">
        <h1>Invoice Generator</h1>
      </div>
      <Container>
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h3>List of Invoices</h3>
        <Button className="fw-bold" onClick={handleAddClick}>
          Add Invoice
        </Button>
      </div>
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
                  <td className="align-middle">{currencyToString(item.currency)}</td>
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
          {
            !data.length && (
            <div className="d-flex justify-content-center align-items-center mt-5">
              <FcEmptyTrash color="primary"
                  style={{
                    height: "106px",
                    width: "106px",
                    marginTop: "-3px",
                  }}
                  className="me-2" />
              <div className="text-center">
                <h1>No data to show</h1>
                <h3>Create new record</h3>
              </div>
            </div>
            )
          }
        </div>
      </Container>
    </>
  );
};
