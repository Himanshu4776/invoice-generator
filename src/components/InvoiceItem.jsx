import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";
import { BiTrash } from "react-icons/bi";
import EditableField from "./EditableField";

const InvoiceItem = (props) => {
  const { onItemizedItemEdit, currency, onRowDel, items } = props;

  return (
    <div>
      <Table>
        <thead>
          <tr>
            <th>ITEM</th>
            <th>QTY</th>
            <th>PRICE/RATE</th>
            <th className="text-center">ACTION</th>
          </tr>
        </thead>
        <tbody>
          {items.map((item) => (
            <ItemRow
              key={item.id}
              id={item.id}
              item={item}
              currency={currency}
              onItemizedItemEdit={onItemizedItemEdit}
              onDelEvent={onRowDel}
            />
          ))}
        </tbody>
      </Table>
      <Button className="fw-bold" onClick={props.onRowAdd}>
        Add Item
      </Button>
    </div>
  );
};

const ItemRow = (props) => {
  const { onItemizedItemEdit, item, currency, id } = props;

  const onDelEvent = () => {
    props.onDelEvent(item);
  };

  return (
    <tr>
      <td style={{ width: "100%" }}>
        <EditableField
          onItemizedItemEdit={onItemizedItemEdit}
          cellData={{
            type: "text",
            name: "name",
            placeholder: "Item name",
            value: item.name,
            id: id,
          }}
        />
        <EditableField
          onItemizedItemEdit={onItemizedItemEdit}
          cellData={{
            type: "text",
            name: "description",
            placeholder: "Item description",
            value: item.description,
            id: id,
          }}
        />
      </td>
      <td style={{ minWidth: "70px" }}>
        <EditableField
          onItemizedItemEdit={onItemizedItemEdit}
          cellData={{
            type: "number",
            name: "quantity",
            min: 1,
            step: "1",
            value: item.quantity,
            id: id,
          }}
        />
      </td>
      <td style={{ minWidth: "130px" }}>
        <EditableField
          onItemizedItemEdit={onItemizedItemEdit}
          cellData={{
            leading: currency,
            type: "number",
            name: "price",
            min: 1,
            step: "0.01",
            precision: 2,
            textAlign: "text-end",
            value: item.price,
            id: id,
          }}
        />
      </td>
      <td className="text-center" style={{ minWidth: "50px" }}>
        <BiTrash
          onClick={onDelEvent}
          style={{ height: "33px", width: "33px", padding: "7.5px" }}
          className="text-white mt-1 btn btn-danger"
        />
      </td>
    </tr>
  );
};

export default InvoiceItem;
