import React, { useEffect } from "react";
import Modal from "react-bootstrap/Modal";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import { createProduct, modProduct } from "../../../helpers/product";

function ModProduct({ show, handleClose, product, provider, fetchData, jwt, isEditing }) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
    setValue,
  } = useForm();

  useEffect(() => {
    if (product && product.provider && isEditing) {  
        setValue("name", product.name);
        setValue("detail", product.detail);
        setValue("p_purchase", product.p_purchase);
        setValue("p_sale", product.p_sale);
        setValue("providerId", product.provider.id);
      }else if (!isEditing){
        reset()
      }
  }, [setValue, product,isEditing]);

  const onSubmit = async (data, e) => {
    e.preventDefault();
    actualizarProducto(data)
  };
  const actualizarProducto= async(data)=>{
    try {
      let result;
      if(isEditing){
         result = await modProduct(product.id, jwt, data)
         if(!result){
           throw new Error("no se pudo actualizar")
         }
         Swal.fire({
           title: "datos de producto actualizado!",
           icon: "success",
           background:"#faf5e5",
           draggable: true
          });
        } else{
          result = await createProduct(jwt, data)
          if(!result){
            throw new Error("no se pudo crear")
          }
        Swal.fire({
          title: "producto creado!",
          icon: "success",
          background:"#faf5e5",
          draggable: true
        });
      }
        fetchData()
        
      } catch (error) {
        console.error("Error en onSubmit:", error.message);
      }
  }

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        {
          isEditing?<Modal.Title >Modificar Producto</Modal.Title>:<Modal.Title >Crear Producto</Modal.Title>
        }
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
          <label>detalle</label>
            <input
            type="text"
              className="input-group-text w-100 text-start"
              {...register("detail", {
                required: true,
                minLength:10,
                maxLength:250
              })}
            />
            {errors.detail && (
              <span className="fs-6 text-danger">
                campo obligatorio, debe contener entre 10 y 250 caracteres
              </span>
            )}
          </div>
          <div className="mb-1">
          <label>precio de compra</label>
            <input
            type="text"
              placeholder="22.33"
              className="input-group-text w-100 text-start"
              {...register("p_purchase", {
                required: true,
                min:1,
                max:1000000,
                pattern: /^\d+(\.\d{1,2})?$/,
              })}
            />
            {errors.p_purchase && (
              <span className="fs-6 text-danger">
                campo obligatorio, el precio debe encontrarse entre 1 y 1 millon
              </span>
            )}
          </div>
          <div className="mb-1">
          <label>precio de venta</label>
            <input
              type="text"
              className="input-group-text w-100 text-start"
              {...register("p_sale", {
                required: true,
                minLength:1,
                maxLength:6,
                max:1000000,
                min:1
              })}
            />
            {errors.p_sale && (
              <span className="fs-6 text-danger">
                campo obligatorio, el precio debe encontrarse entre 1 y 1 millon
              </span>
            )}
          </div>
          <div className="mb-1">
            <label>proveedor</label>
            <div className="input-group mb-3">
              <label className="input-group-text" htmlFor="inputGroupSelect01">
                Options
              </label>
              <select
                className="form-select"
                id="inputGroupSelect01"
                {...register("providerId", { required: true })}
                defaultValue={product?.provider?.id}
              >
                <option value="">selecionar</option>
                {provider.map((prov) => (
                  <option key={prov.id} value={prov.id}>
                    {prov.name}
                  </option>
                ))}
              </select>
            </div>
            {errors.providerId && (
              <span className="fs-6 text-danger">campo obligatorio</span>
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

export default ModProduct;
