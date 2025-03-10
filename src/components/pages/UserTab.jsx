'use client';
import { useEffect, useState } from "react"; // Importa useState
import { getUser } from "../../helpers/user";
import { TelephoneForward, Envelope } from "react-bootstrap-icons";
import { Button } from "react-bootstrap";
import ModUserModal from "./users/ModUserModal";


const jwt = sessionStorage.getItem("accessToken") || null;

const UserTab = ({actualizarDatos, userData, fetchDataUser}) => {
 
  const [showModal, setShowModal] = useState(false);

  if (!userData) {
    return <article><p>Cargando datos del usuario...</p></article>; // Mensaje de carga
  }
 
  const handleShowModal = () => setShowModal(true);
  const handleCloseModal = () => setShowModal(false);

  return (
    <article className="container">
      <div className="card bg-light shadow-lg" >
    <div className="card-body fondoLogin colorTexto">
    <h3 className="card-title">{userData.name}</h3>
    <p className="card-text">direccion: {userData.address}</p>
    <div>
    <h6>contacto</h6>
    <p className="fw-medium "> <TelephoneForward className="mx-2"/>  {userData.phone} <br/> <Envelope className="mx-2 "/> {userData.email} </p>
    </div>
    <Button className="colorPrimario text-light" variant="light" onClick={handleShowModal}>
        Modificar
      </Button>
      <ModUserModal show={showModal} handleClose={handleCloseModal} userData ={userData} fetchDataUser={fetchDataUser} actualizarDatos={actualizarDatos} jwt={jwt}></ModUserModal>
  </div>
  </div>

    </article>
  );
};

export default UserTab;