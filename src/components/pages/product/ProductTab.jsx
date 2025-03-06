import React, { useEffect, useState } from "react";
import ProductItem from "./ProductItem";
import { delProduct, getProduct } from "../../../helpers/product";
import Swal from "sweetalert2";
import ModProduct from "./modalProduct";
import { getProvider } from "../../../helpers/provider";

const ProductTab = () => {
  const jwt = sessionStorage.getItem("accessToken") || null;
  const [product, setProduct] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [provider, setProvider] = useState([])
  const [productToEdit, setProductToEdit]=useState(null)
  const [isEditing, setIsEditing] = useState(false);
  
  const handleShowModal = (product, editing = true) => {
    setProductToEdit(product);
    setIsEditing(editing);
    setShowModal(true);
}
  const handleCloseModal = () => setShowModal(false);

  const fetchData = async () => {
    try {
      const result = await getProduct(jwt);
      if (result && result.data) {
        setProduct(result.data);
      }
    } catch (e) {
      console.error("Error fetching product data:", e);
    }
  };

  const EliminarProduct = async (id) => {
    try {
      const status = await Swal.fire({
        title: "¿Seguro quieres borrarlo?",
        text: "El usuario se eliminaría permanentemente.",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#d08799",
        cancelButtonColor: "#81a1c1",
        confirmButtonText: "Borrar",
        cancelButtonText: "Cancelar",
      });
      if (status.isConfirmed) {
        const result = await delProduct(id, jwt);
        if (result && result.data) {
          Swal.fire({
            title: "producto borrado",
            icon: "success",
          });
          fetchData();
        }
      }
    } catch (error) {
      console.error("error en eliminar", error);
    }
  };

  const listProv = async ()=>{
    try {
        const result = await getProvider(jwt);
        if (result && result.data) {
          setProvider(result.data);
        }
      } catch (e) {
        console.error("Error fetching provider data:", e);
      }
  }


  useEffect(() => {
    fetchData();
    listProv()
  }, []);
  return (
    <article className="container">
      <button className="btn btn-primary" onClick={() => handleShowModal(null, false)}>Crear Producto</button>

      {product.map((prod, posicion) => (
        <ProductItem product={prod} key={posicion} EliminarProduct={EliminarProduct} onEdit={handleShowModal}></ProductItem>
      ))}
      <ModProduct show={showModal} handleClose={handleCloseModal} product={productToEdit} provider={provider} fetchData={fetchData} jwt={jwt} isEditing={isEditing}></ModProduct>
    </article>
  );
};

export default ProductTab;
