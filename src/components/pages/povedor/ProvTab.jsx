import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";

import { Table } from "react-bootstrap";
import { delProvider, getProvider } from "../../../helpers/provider";
import ProvItem from "./ProvItem";
import ModalProv from "./modalProv";


const ProvTab = ({prov, fetchDataProv}) => {
  const jwt = sessionStorage.getItem("accessToken") || null;
  //const [prov, setProv] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [provEdit, setProvEdit]=useState(null)
  const [isEditing, setIsEditing] = useState(false);
  
  const handleShowModal = (prov, editing = true) => {
    setProvEdit(prov);
    setIsEditing(editing);
    setShowModal(true);
}
  const handleCloseModal = () => setShowModal(false);

 

  const EliminarProvedor = async (id) => {
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
        const result = await delProvider(id, jwt);
        if (result && result.data) {
          Swal.fire({
            title: "cliente borrado",
            icon: "success",
          });
          fetchDataProv();
        }
      }
    } catch (error) {
      console.error("error en eliminar", error);
    }
  };

  useEffect(() => {
    fetchDataProv();
  }, []);
  return (
    <article className="container">
      <button className="btn btn-primary my-2" onClick={() => handleShowModal(null, false)}>cliente</button>
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
        
      {prov.map((prov, posicion) => (
        <ProvItem prov={prov} key={posicion} EliminarProvedor={EliminarProvedor} onEdit={handleShowModal}></ProvItem>
      ))}
      </tbody>
      </Table>
      <ModalProv show={showModal} handleClose={handleCloseModal} prov={provEdit}  fetchDataProv={fetchDataProv} jwt={jwt} isEditing={isEditing}></ModalProv>
    </article>
  );
};

export default ProvTab;
