import React, { useEffect, useState } from "react";
import ProductItem from "./ProductItem";
import { delProduct, getProduct } from "../../../helpers/product";
import Swal from "sweetalert2";
import ModProduct from "./modalProduct";
import { PlusCircle } from "react-bootstrap-icons";


const ProductTab = ({provider, product ,fetchDataProduct}) => {
  const jwt = sessionStorage.getItem("accessToken") || null;
  const [showModal, setShowModal] = useState(false);
  const [productToEdit, setProductToEdit]=useState(null)
  const [isEditing, setIsEditing] = useState(false);
  
  const handleShowModal = (product, editing = true) => {
    setProductToEdit(product);
    setIsEditing(editing);
    setShowModal(true);
}
  const handleCloseModal = () => setShowModal(false);


  const EliminarProduct = async (id) => {
    try {
      const status = await Swal.fire({
        title: "¿Seguro quieres borrarlo?",
        text: "El producto se eliminaría permanentemente.",
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
          fetchDataProduct();
        }
      }
    } catch (error) {
      console.error("error en eliminar", error);
    }
  };

  useEffect(() => {
    fetchDataProduct();
  }, []);
  return (
    <article className="container">
      <div className=" d-flex justify-content-end">
      <button className="btn btn-secondary border-1 border-info my-2 " onClick={() => handleShowModal(null, false)}><PlusCircle ></PlusCircle> Nuevo Producto</button>
      </div>
    
      
      {product.map((prod, posicion) => (
        <ProductItem product={prod} key={posicion} EliminarProduct={EliminarProduct} onEdit={handleShowModal}></ProductItem>
      ))}
      <ModProduct show={showModal} handleClose={handleCloseModal} product={productToEdit} provider={provider} fetchData={fetchDataProduct} jwt={jwt} isEditing={isEditing}></ModProduct>
    </article>
  );
};

export default ProductTab;
