import React, { useEffect } from "react";
import Modal from "react-bootstrap/Modal";
import { useForm } from "react-hook-form";
import { modUser } from "../../../helpers/user";
import Swal from "sweetalert2";

function ModUserModal({ show, handleClose, userData, setUserData, actualizarDatos,jwt }) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
    setValue,
  } = useForm();

  useEffect(() => {
    setValue("email", userData.email);
    setValue("address", userData.address);
    setValue("name", userData.name);
    setValue("dni", userData.dni);
    setValue("phone", userData.phone);
    setValue("password", "");
  }, [userData, setValue]);

  const onSubmit = async (data, e) => {
    e.preventDefault();
    try {
      const result = await modUser(userData.id,jwt, data)
      console.log("esto devuelve result:",data);
      if(!result){
        throw new Error("no se pudo actualizar")
      }
      setUserData(result.data);
      actualizarDatos(result.data);
      Swal.fire({
        title: "datos de usuario actualizado!",
        icon: "success",
        background:"#faf5e5",
        draggable: true
      });
      
    } catch (error) {
      console.error("Error en onSubmit:", error.message);
    }
  };
  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title >Modificar Usuario</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <form onSubmit={handleSubmit(onSubmit)} className="d-flex flex-column">
          <div className="mb-1">
            <label>nombre</label>
            <input
              placeholder="nombre de tu empresa"
              className="input-group-text w-100 text-start"
              type="text"
              {...register("name", {
                required: true,
                minLength:2,
                maxLength:50
              })}
            />
            {errors.name && (
              <span className="fs-6 text-danger">
                campo obligatorio, debe contener entre 2 y 50 caracteres
              </span>
            )}
          </div>
          <div className="mb-1">
          <label>email</label>
            <input
            type="email"
              placeholder="example@gmail.com"
              className="input-group-text w-100 text-start"
              {...register("email", {
                required: true,
              })}
            />
            {errors.email && (
              <span className="fs-6 text-danger">
                este campo debe ser un email valido y es obligatorio
              </span>
            )}
          </div>
          <div className="mb-1">
          <label>dni</label>
            <input
            type="text"
              placeholder="38455766"
              className="input-group-text w-100 text-start"
              {...register("dni", {
                required: true,
                minLength:8,
                maxLength:12
              })}
            />
            {errors.dni && (
              <span className="fs-6 text-danger">
                campo obligatorio, debe contener entre 8 y 12 caracteres
              </span>
            )}
          </div>
          <div className="mb-1">
          <label>telefono</label>
            <input
              type="text"
              className="input-group-text w-100 text-start"
              {...register("phone", {
                required: true,
                minLength:9,
                maxLength:15
              })}
            />
            {errors.phone && (
              <span className="fs-6 text-danger">
                campo obligatorio, debe contener entre 9 y 15 caracteres
              </span>
            )}
          </div>
          <div className="mb-1">
          <label>direccion</label>
            <input
            type="text"
              placeholder="example@gmail.com"
              className="input-group-text w-100 text-start"
              {...register("address", {
                required: true,
                minLength:10,
                maxLength:100
              })}
            />
            {errors.address && (
              <span className="fs-6 text-danger">
                campo obligatorio, debe contener entre 10 y 100 caracteres
              </span>
            )}
          </div>
          <div className="mb-4">
            <label className="text-danger">
              si desea actulizar contraseña, ingrese una nueva
            </label>
            <input
              placeholder="*******"
              type="password"
              className="input-group-text w-100 "
              {...register("password", {
                required: false,
                minLength: 8,
                maxLength: 12,
              })}
            />
            {errors.password && (
              <span className="fs-6 text-danger">
              campo obligatorio debe tener minimo 8 caracteres y un maximo de 12
              </span>
            )}
          </div>
          <input className=" btn colorPrimario text-light" type="submit" />
        </form>
      </Modal.Body>
    </Modal>
  );
}

export default ModUserModal;
