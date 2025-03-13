import React, { useEffect, useState } from "react";
import Modal from "react-bootstrap/Modal";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import { createBudget } from "../../../helpers/budget";

function BudgetModal({
  show,
  handleClose,
  budget,
  fetchData,
  jwt,
  product,
  clients,
}) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
    watch,
  } = useForm();
  const [quantities, setQuantities] = useState({});
  const [checkedProducts, setCheckedProducts] = useState({});

  const handleCheckboxChange = (productId, checked) => {
    setCheckedProducts((prevChecked) => ({
      ...prevChecked,
      [productId]: checked,
    }));

    setQuantities((prevQuantities) => {
      const newQuantities = { ...prevQuantities };
      if (!checked) {
        delete newQuantities[productId];
      } else if (newQuantities[productId] === undefined) {
        newQuantities[productId] = 1;
      }
      return newQuantities;
    });
  };

  const handleQuantityInputChange = (productId, quantity) => {
    setQuantities((prevQuantities) => {
      const newQuantities = { ...prevQuantities };
      const parsedQuantity = parseInt(quantity);
      if (!isNaN(parsedQuantity) && parsedQuantity >= 0) {
        newQuantities[productId] = parsedQuantity;
      }
      return newQuantities;
    });
  };

  const onSubmit = async (data, e) => {
    e.preventDefault();

    const selectedProducts = Object.keys(quantities).map((productId) => ({
      quantity: quantities[productId] || 1,
      productId: productId,
    }));

    if (selectedProducts.length === 0) {
      Swal.fire({
        title: "Advertencia",
        text: "Debes seleccionar al menos un producto.",
        icon: "warning",
        background: "#faf5e5",
        draggable: true,
      });
      return;
    }

    const datos = {
      clientId: data.client,
      detail: data.detail,
      productLine: selectedProducts,
    };
    console.log(datos);
    createBudgetfunc(datos);
  };

  const createBudgetfunc = async (data) => {
    try {
      let result;
      result = await createBudget(jwt, data);
      if (!result) {
        throw new Error("no se pudo crear");
      }
      Swal.fire({
        title: "presupuesto creado!",
        icon: "success",
        background: "#faf5e5",
        draggable: true,
      });
      fetchData();
      reset();
    } catch (error) {
      console.error("Error en onSubmit:", error.message);
    }
  };

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header className="bg-secondary text-light" closeButton>
        {<Modal.Title>Crear Presupuesto</Modal.Title>}
      </Modal.Header>
      <Modal.Body>
        <form onSubmit={handleSubmit(onSubmit)} className="d-flex flex-column">
          <div className="mb-1">
            <label>cliente</label>
            <div className="input-group mb-3">
              <label className="input-group-text" htmlFor="inputGroupSelect01">
                Options
              </label>
              <select
                className="form-select"
                id="inputGroupSelect01"
                {...register("client", { required: true })}
              >
                <option value="">selecionar</option>
                {clients.map((client) => (
                  <option key={client.id} value={client.id}>
                    {client.name}
                  </option>
                ))}
              </select>
            </div>
            {errors.client && (
              <span className="fs-6 text-danger">campo obligatorio</span>
            )}
          </div>
          <div className="mb-1">
            <label>productos</label>
            <table className="table table-striped">
              <thead>
                <tr>
                  <th>select</th>
                  <th>nombre</th>
                  <th>precio</th>
                  <th>cantidad</th>
                </tr>
              </thead>
              <tbody>
                {product.map((prod) => (
                  <tr key={prod.id}>
                    <th>
                      <input
                        type="checkbox"
                        name="productIds"
                        value={prod.id}
                        {...register("productIds")}
                        checked={checkedProducts[prod.id] || false}
                        onChange={(e) =>
                          handleCheckboxChange(prod.id, e.target.checked)
                        }
                      />
                    </th>
                    <th htmlFor={prod.name}>{prod.name}</th>
                    <th htmlFor={prod.p_sale}>{prod.p_sale}</th>
                    <th>
                      <input
                        type="number"
                        id={`cuantity-${prod.id}`}
                        {...register(`cuantity-${prod.id}`)} // Registro único
                        max={prod.stock}
                        placeholder={prod.stock + " disponibles"}
                        value={quantities[prod.id] || ""}
                        onChange={(e) =>
                          handleQuantityInputChange(prod.id, e.target.value)
                        }
                        disabled={!checkedProducts[prod.id]}
                      />
                      <label className="text-danger">{prod.stock} disponible</label>
                    </th>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="mb-1">
            <label>detalle</label>
            <input
              placeholder="detalle del equipo a trabajar o info que dio el cliente"
              className="input-group-text w-100 text-start"
              type="text"
              {...register("detail", {
                required: true,
                minLength: 2,
                maxLength: 50,
              })}
            />
            {errors.name && (
              <span className="fs-6 text-danger">
                campo obligatorio, debe contener entre 2 y 250 caracteres
              </span>
            )}
          </div>

          <Modal.Footer>
            <input className=" btn btn-warning w-100" type="submit" />
          </Modal.Footer>
        </form>
      </Modal.Body>
    </Modal>
  );
}

export default BudgetModal;