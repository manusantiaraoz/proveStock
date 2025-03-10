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
  const [quantities, setQuantities] = useState({}); // Estado para las cantidades
  const [subtotals, setSubtotals] = useState({});
  const [totalGeneral, setTotalGeneral] = useState(0);

  const handleQuantityChange = (productId, quantity, price, checked) => {
    if (checked) {
      const parsedQuantity = parseInt(quantity);
      setQuantities({ ...quantities, [productId]: parsedQuantity });
      const subtotal = parsedQuantity * price;
      setSubtotals({ ...subtotals, [productId]: subtotal });
    } else {
      const newQuantities = { ...quantities };
      delete newQuantities[productId];
      setQuantities(newQuantities);

      const newSubtotals = { ...subtotals };
      delete newSubtotals[productId];
      setSubtotals(newSubtotals);
    }
  };

  useEffect(() => {
    if (budget) {
      reset();
    }
  }, [reset, budget]);
  useEffect(() => {
    let total = 0;
    Object.values(subtotals).forEach((subtotal) => {
      total += subtotal;
    });
    setTotalGeneral(total);
  }, [subtotals]);

  const onSubmit = async (data, e) => {
    e.preventDefault();

    const selectedProducts = (data.productIds || []).map((productId) => ({
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
        title: "producto creado!",
        icon: "success",
        background: "#faf5e5",
        draggable: true,
      });
      fetchData();
      reset()
    } catch (error) {
      console.error("Error en onSubmit:", error.message);
    }
  };

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        {<Modal.Title>Crear cliente</Modal.Title>}
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
                        onChange={(e) =>
                          handleQuantityChange(
                            prod.id,
                            quantities[prod.id] || 1,
                            prod.p_sale,
                            e.target.checked
                          )
                        }
                      />
                    </th>
                    <th for={prod.name}>{prod.name}</th>
                    <th for={prod.p_sale}>{prod.p_sale}</th>
                    <th>
                      <input
                        type="number"
                        id="cuantity"
                        {...register("cuantity")}
                        max={prod.stock}
                        placeholder={prod.stock + " disponibles"}
                        value={quantities[prod.id] || ""}
                        onChange={(e) =>
                          handleQuantityChange(
                            prod.id,
                            e.target.value,
                            prod.p_sale,
                            true
                          )
                        }
                      />
                    </th>
                  </tr>
                ))}
              </tbody>
              
            </table>
          </div>
          <div className="mb-1">
            <label>detalle</label>
            <input
              placeholder="nombre"
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
            <h6 className="text-end">total: ${totalGeneral.toFixed(2)}</h6>
          <input className=" btn btn-warning text-light" type="submit" />
        </form>
      </Modal.Body>
    </Modal>
  );
}

export default BudgetModal;
