import React, { useEffect } from "react";
import Modal from "react-bootstrap/Modal";
import { useForm } from "react-hook-form";
import { createUser, modUser } from "../../../helpers/user";
import Swal from "sweetalert2";
function ModalRegister({ show, handleClose, fetchDataUsers }) {
  const jwt = sessionStorage.getItem("accessToken") || null;
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
    setValue,
  } = useForm();

  useEffect(() => {
    setValue("email", "");
    setValue("dni", "");;
    setValue("password", "");
  }, []);

  const onSubmit = async (data, e) => {
    e.preventDefault();
    try {
      const result = await createUser(jwt, data)
      if(!result){
        Swal.fire({
          title: "no se pudo crear el usuario",
          icon: "error",
          background:"#faf5e5",
          draggable: true
        });
      }
      fetchDataUsers();
      Swal.fire({
        title: "usuario creado!",
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
        <Modal.Title >Crear Usuario</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <form onSubmit={handleSubmit(onSubmit)} className="d-flex flex-column">
          <div className="">
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
          
          <div className="mb-4">
            <label className="">
              password
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

export default ModalRegister;
