'use client';
import { useEffect, useState } from "react"; // Importa useState
import { getUser } from "../../helpers/user";
import { TelephoneForward, Envelope } from "react-bootstrap-icons";
import { Button } from "react-bootstrap";
import ModUserModal from "./users/ModUserModal";


const jwt = sessionStorage.getItem("accessToken") || null;

const UserTab = ({actualizarDatos, usuarioLogeado}) => {
  const [userData, setUserData] = useState(null); 
  const [showModal, setShowModal] = useState(false);
  const user = usuarioLogeado;
  console.log(user);
  
  useEffect(() => {
    const fetchData = async () => { 
      try {
       
        const result = await getUser(user.id, jwt); 
        if (result && result.data) {
          setUserData(result.data); 
        }
      } catch (e) {
        console.error("Error fetching user data:", e); 
      }
    };

    if (user && jwt) {
        fetchData();
    }

  }, [user, jwt]); // Dependencias del useEffect

  if (!userData) {
    return <article><p>Cargando datos del usuario...</p></article>; // Mensaje de carga
  }
  console.log(userData);
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
      <ModUserModal show={showModal} handleClose={handleCloseModal} userData ={userData} setUserData={setUserData} actualizarDatos={actualizarDatos} jwt={jwt}></ModUserModal>
  </div>
  </div>

    </article>
  );
};

export default UserTab;