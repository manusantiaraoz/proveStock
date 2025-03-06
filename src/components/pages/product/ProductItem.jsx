import React from 'react';
import { PencilSquare, Trash3 } from 'react-bootstrap-icons';

const ProductItem = ({product, onEdit,EliminarProduct }) => {
    const{name, detail, p_purchase, p_sale} = product
    const {name:nameProvider, phone, address}= product.provider
    return (
        <div className="container glass-efect">
      <div className="row ">
        <div className="colorTexto col-xl-8 ">
          <h5 className="m-2">{name}</h5>
          <h6 className='ms-2'>detalles del producto</h6>
          <p className='ms-4 '><strong>descripción:</strong> {detail} <br/> <strong>precio de compra:</strong> ${p_purchase} <br/> <strong>precio de venta: </strong>${p_sale}</p>
          <p className='ms-3 '> <strong>proveedor:</strong>  {nameProvider}, dirección: {address}, telefono:{phone}</p>
          </div>
      <div className=' col-xl-4 align-content-center py-2'> 
        <div className='d-flex justify-content-center'>
        <button className='btn btn-outline-success ' onClick={() => onEdit(product)}><PencilSquare></PencilSquare> </button>
        <button className='btn btn-outline-danger mx-2' onClick={() =>EliminarProduct(product.id)} ><Trash3></Trash3> </button>
            
        </div>
      </div>
      </div>
    </div>
    );
};

export default ProductItem;