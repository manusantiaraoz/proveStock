import React from 'react';
import { PencilSquare, Trash3 } from 'react-bootstrap-icons';

const ProductItem = ({product, onEdit,EliminarProduct }) => {
    const{name, detail, p_purchase, p_sale,stock} = product
    const {name:nameProvider, phone, address}= product.provider
    return (
        <div className="container glass-efect my-3 ">
      <div className="row">
      <section className=" textoPrincipal my-2 rounded row">
        <div className="col-xl-3 my-1  ">
          <p className="border-bottom border-dark">nombre</p>
          <p > {name}</p>
        </div>
        <div className="col-xl-2 my-1 ">
          <p className="border-bottom border-dark">descripción</p>
          <p> {detail}</p>
        </div>
        <div className="col-xl-2 my-1 ">
          <p className="border-bottom border-dark">p.compra</p>
          <p> ${p_purchase}</p>
        </div>
        <div className="col-xl-2 my-1 ">
          <p className="border-bottom border-dark">p.venta</p>
          <p> ${p_sale}</p>
        </div>
        <div className="col-xl-1 my-1 ">
          <p className="border-bottom border-dark">stock</p>
          <p>{stock}</p>
        </div>
      <div className=' col-xl-2 align-content-center py-2'> 
        <div className='d-flex justify-content-end'>
        <button className='btn btn-outline-success ' onClick={() => onEdit(product)}><PencilSquare></PencilSquare> </button>
        <button className='btn btn-outline-danger mx-2' onClick={() =>EliminarProduct(product.id)} ><Trash3></Trash3> </button>
            
        </div>
      </div>
      <div className='bg-secondary-subtle text-center textoSecundario pt-2 mx-2'>
      <p className=''>provedor: {nameProvider}, dirección: {address}, telefono: {phone}</p>
      </div>
      </section>
      </div>
    </div>
    );
};

export default ProductItem;