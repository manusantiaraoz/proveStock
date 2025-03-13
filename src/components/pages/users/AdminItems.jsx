import React from "react";
import { PencilSquare, Trash3 } from "react-bootstrap-icons";
const AdminItems = ({ user, suspUser, activarUser}) => {
  
  const { name, email,isActive, id } = user;
  return (
    <tr className="colorPrimarioTexto border-bottom">
      <td>
        {name}
      </td>
      <td>{email}</td>
      <td>
        <div className=" align-content-center py-2">
          <div className="d-flex justify-content-center">
           
           {
            isActive ?
           (<button
              className="btn btn-outline-warning m-2"
              onClick={() => suspUser(id)}
            >
              <PencilSquare></PencilSquare> SUSPENDER
            </button>):(

            <button
              className="btn btn-outline-danger m-2"
              onClick={() => activarUser(id)}
            >
              <Trash3></Trash3> ACTIVAR
            </button>
            )

           }
           
          </div>
        </div>
      </td>
    </tr>
 
  );
};

export default AdminItems;