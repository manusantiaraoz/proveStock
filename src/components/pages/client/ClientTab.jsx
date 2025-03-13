import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";
import { delClient } from "../../../helpers/client";
import ClientItem from "./clientItem";
import ModalClient from "./modalClient";
import { Table } from "react-bootstrap";
import { PlusCircle } from "react-bootstrap-icons";


const ClientTab = ({clients, fetchDataClient}) => {
  const jwt = sessionStorage.getItem("accessToken") || null;
  
  const [showModal, setShowModal] = useState(false);
  const [clientEdit, setClientEdit]=useState(null)
  const [isEditing, setIsEditing] = useState(false);
  
  const handleShowModal = (client, editing = true) => {
    setClientEdit(client);
    setIsEditing(editing);
    setShowModal(true);
}
  const handleCloseModal = () => setShowModal(false);

 

  const EliminarClient = async (id) => {
    try {
      const status = await Swal.fire({
        title: "¿Seguro quieres borrarlo?",
        text: "El cliente se eliminaría permanentemente.",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#d08799",
        cancelButtonColor: "#81a1c1",
        confirmButtonText: "Borrar",
        cancelButtonText: "Cancelar",
      });
      if (status.isConfirmed) {
        const result = await delClient(id, jwt);
        if (result && result.data) {
          Swal.fire({
            title: "cliente borrado",
            icon: "success",
          });
          fetchDataClient();
        }
      }
    } catch (error) {
      console.error("error en eliminar", error);
    }
  };

  useEffect(() => {
    fetchDataClient();
  }, []);
  return (
    <article className="container">
      <div className=" d-flex justify-content-end">
      <button className="btn btn-secondary border-1 border-info my-2" onClick={() => handleShowModal(null, false)}> <PlusCircle></PlusCircle> Nuevo Cliente</button>
      </div>
      <Table responsive>
      <thead>
        <tr className="glass-efect">
          <th className="bg-dark text-light">NOMBRE</th>
          <th className="bg-dark text-light">DNI</th>
          <th className="bg-dark text-light">DIRECCIÓN</th>
          <th className="bg-dark text-light">CORREO</th>
          <th className="bg-dark text-light">PHONE</th>
          <th className="bg-dark text-light">OPCIONES</th>
        </tr>
      </thead>
      <tbody>

      {clients.map((client, posicion) => (
        <ClientItem client={client} key={posicion} EliminarClient={EliminarClient} onEdit={handleShowModal}></ClientItem>
      ))}
      </tbody>
      </Table>
      <ModalClient show={showModal} handleClose={handleCloseModal} client={clientEdit}  fetchData={fetchDataClient} jwt={jwt} isEditing={isEditing}></ModalClient>
    </article>
  );
};

export default ClientTab;
