import React, { useEffect, useState } from "react";
import { activeUser, getAllUser, suspenderUser } from "../../helpers/user";
import AdminItems from "./users/adminItems";
import ModalRegister from "./users/ModalRegister";
import { PlusCircle } from "react-bootstrap-icons";
import { Table } from "react-bootstrap";
import Swal from "sweetalert2";


const PanelAdministrador = ({ usuarioLogeado, actualizarDatos }) => {
  const jwt = sessionStorage.getItem("accessToken") || null;
  const userLog = usuarioLogeado;
  const [users, setUsers] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const handleShowModal = () => setShowModal(true);
  const handleCloseModal = () => setShowModal(false);
  
  
  const fetchDataUsers = async () => {
    try {
        const result = await getAllUser(jwt);
        if (result && result.data) {
          setUsers(result.data);
      }
    } catch (e) {
      console.error("Error fetching users data:", e);
    }
  };
  const suspUser = async (id) => {
    try {
      const status = await Swal.fire({
        title: "funcion suspender",
        text: "desea suspender al usuario",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#d08799",
        cancelButtonColor: "#81a1c1",
        confirmButtonText: "suspender",
        cancelButtonText: "Cancelar",
      });
      if (status.isConfirmed) {
        const result = await suspenderUser(id, jwt);
        if (result && result.data) {
          await fetchDataUsers();
        }
      }
    } catch (e) {
      console.error("Error al suspender", e);
    }
  };
  const activarUser = async (id) => {
    try {
      const status = await Swal.fire({
        title: "activar",
        text: "se otorgará ingreso al usuario",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#56e52c",
        cancelButtonColor: "#81a1c1",
        confirmButtonText: "activar",
        cancelButtonText: "Cancelar",
      });
      if (status.isConfirmed) {
        const result = await activeUser(id, jwt);
        if (result && result.data) {
          await fetchDataUsers();
        }
      }
    } catch (e) {
      console.error("Error al eliminar", e);
    }
  };

  useEffect(() => {
    fetchDataUsers();
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
          <th className="bg-dark text-light">CORREO</th>
          <th className="bg-dark text-light">OPCIONES</th>
        </tr>
      </thead>
      <tbody>

      {users.map((user, posicion) => (
        <AdminItems
          user={user}
          key={posicion}
          suspUser={suspUser}
          activarUser={activarUser}
        ></AdminItems>
      ))}
      </tbody>
      </Table>
      <ModalRegister show={showModal} handleClose={handleCloseModal}  fetchDataUsers={fetchDataUsers} jwt={jwt}></ModalRegister>
    </article>
   
  );
};

export default PanelAdministrador;
