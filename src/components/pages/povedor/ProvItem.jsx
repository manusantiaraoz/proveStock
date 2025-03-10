import React from "react";
import { PencilSquare, Trash3 } from "react-bootstrap-icons";

const ProvItem = ({ prov, onEdit, EliminarProvedor }) => {
 
  const { name,dni, address, phone, email } = prov;
  return (
    <tr className="colorPrimarioTexto border-bottom">
      <td>
        {name}
      </td>
      <td>{dni}</td>
      <td>{email}</td>
      <td>{address}</td>
      <td>{phone}</td>
      <td>
        <div className=" align-content-center py-2">
          <div className="d-flex justify-content-center">
            <button
              className="btn btn-outline-success m-2"
              onClick={() => onEdit(prov)}
            >
              <PencilSquare></PencilSquare>{" "}
            </button>
            <button
              className="btn btn-outline-danger m-2"
              onClick={() => EliminarProvedor(prov.id)}
            >
              <Trash3></Trash3>{" "}
            </button>
          </div>
        </div>
      </td>
    </tr>
 
  );
};

export default ProvItem;
