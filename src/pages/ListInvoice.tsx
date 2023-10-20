import "bootstrap/dist/css/bootstrap.min.css";
import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";
import { BiTrash } from "react-icons/bi";
import React from "react";
import { useNavigate } from "react-router-dom";

export function ListInvoice() {
  const navigate = useNavigate();
  return (
    <div>
      List invoice
      <Table>
        <thead>
          <tr>
            <th>invoices</th>
            <th className="text-center">ACTION</th>
          </tr>
        </thead>
      </Table>
      <Button
        className="fw-bold"
        onClick={() => {
          navigate("add-invoice");
        }}
      >
        Add Item
      </Button>
      <Button
        className="fw-bold"
        onClick={() => {
          navigate("edit-invoice");
        }}
      >
        Edit Item
      </Button>
    </div>
  );
}
