import React, { useEffect } from "react";
import Modal from "react-bootstrap/Modal";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import { createProvider, modProvider } from "../../../helpers/provider";

function ModalProv({ show, handleClose, prov, fetchDataProv, jwt, isEditing }) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
    setValue,
  } = useForm();

  useEffect(() => {
    if (prov && isEditing) {  
        setValue("name", prov.name);
        setValue("phone", prov.phone);
        setValue("address", prov.address);
        setValue("dni", prov.dni);
        setValue("email", prov.email);
      }else if (!isEditing){
        reset()
      }
  }, [setValue, prov,isEditing]);

  const onSubmit = async (data, e) => {
    e.preventDefault();
    actualizarProv(data)
  };
  const actualizarProv= async(data)=>{
    try {
      let result;
      if(isEditing){
         result = await modProvider(prov.id, jwt, data)
         if(!result){
           throw new Error("no se pudo actualizar")
         }
         Swal.fire({
           title: "datos de proveedor actualizado!",
           icon: "success",
           background:"#faf5e5",
           draggable: true
          });
        } else{
          result = await createProvider(jwt, data)
          if(!result){
            throw new Error("no se pudo crear")
          }
        Swal.fire({
          title: "proveedor creado!",
          icon: "success",
          background:"#faf5e5",
          draggable: true
        });
      }
      fetchDataProv()
        
      } catch (error) {
        console.error("Error en onSubmit:", error.message);
      }
  }

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        {
          isEditing?<Modal.Title >Modificar proveedor</Modal.Title>:<Modal.Title >Crear proveedor</Modal.Title>
        }
      </Modal.Header>
      <Modal.Body>
        <form onSubmit={handleSubmit(onSubmit)} className="d-flex flex-column">
          <div className="mb-1">
            <label>nombre</label>
            <input
              placeholder="nombre"
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
          <label>phone</label>
            <input
            type="text"
              placeholder="380303456"
              className="input-group-text w-100 text-start"
              {...register("phone", {
                required: true,
                minLength:9,
                maxLength:15,
              })}
            />
            {errors.phone && (
              <span className="fs-6 text-danger">
                campo obligatorio, debe tener entre 9 y 15 digitos
              </span>
            )}
          </div>
          <div className="mb-1">
          <label>direccion</label>
            <input
              type="text"
              className="input-group-text w-100 text-start"
              {...register("address", {
                required: true,
                minLength:10,
                maxLength:100,
              })}
            />
            {errors.address && (
              <span className="fs-6 text-danger">
                campo obligatorio, extencion minima 10 caracteres y el maximo 100
              </span>
            )}
          </div>
          <div className="mb-1">
          <label>DNI</label>
            <input
              type="text"
              className="input-group-text w-100 text-start"
              {...register("dni", {
                required: true,
                minLength:8,
                maxLength:12,
              })}
            />
            {errors.dni && (
              <span className="fs-6 text-danger">
                campo obligatorio, extencion minima 8 caracteres y el maximo 12
              </span>
            )}
          </div>
          <div className="mb-1">
          <label>email</label>
            <input
              type="email"
              className="input-group-text w-100 text-start"
              {...register("email", {
                required: true,
              })}
            />
            {errors.email && (
              <span className="fs-6 text-danger">
                campo obligatorio
              </span>
            )}
          </div>
            {
              isEditing?(
                <input className=" btn colorPrimario text-light" type="submit" />
              ):<input className=" btn btn-warning text-light" type="submit" />
            }
        </form>
      </Modal.Body>
    </Modal>
  );
}

export default ModalProv;
