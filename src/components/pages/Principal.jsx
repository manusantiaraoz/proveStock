import React from "react";
import banner from "../../../public/bannerImages1.jpg";
import iset from "../../../public/pagina2.png";
import principal from "../../../public/logo2.jfif"
import productos from "../../../public/proveStock/productos.png"
import proveedores from "../../../public/proveStock/proveedores.png"
import presupuesto from "../../../public/proveStock/presupuestos.png"
import Carousel from 'react-bootstrap/Carousel';
const Principal = () => {
  return (
    <section className="mainPage">
        
      <div className="container-fluid  cardEfect">
        <div className="row  contenedorPrincipal ">
          <div className="d-flex justify-content-center align-content-center flex-wrap flex-column">
        <h1 className=" controlTexto ">Gestión, Organización y mejor Control</h1>
        <h4 className=" controlTexto  ms-5">todo lo que necesitas para transformar tu emprendimiento</h4>
        <div className="d-flex justify-content-center align-content-center flex-wrap">

        <a className="btn btn-light w-50" href="https://wa.me/+3815984662" target="_blank"> comunicate con nosotros</a>
        </div>
            </div>        
        </div>
      </div>
      <div className="container-fluid contBanner glass-efect ">
        <div className="row">        
        <h2 className="text-center   d-flex align-items-center col-lg-7">Administra tu información personal, de tus proveedores, productos, clientes y genera presupuestos de manera simple</h2>
        <img src={principal} alt="" className=" my-2 imgBanner colorPrimarioTexto bg-opacity-10 border border-light  rounded col-lg-6" />
        </div>
      </div>
      
      <div className="container-fluid  colorPrimariomod">
        <div className="row d-flex justify-content-center">
        <Carousel slide={false} className="my-5 glass-efect w-75 ">
      <Carousel.Item>
        <img src={productos} alt="" className="imgCarousel"/>
        <Carousel.Caption>
          <p className="fs-3 text-dark bg-white rounded">fácil  de usar</p>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
      <img src={proveedores} alt="" className="imgCarousel"/>
        <Carousel.Caption>
          <p className="fs-3 text-dark bg-white rounded">información clara</p>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
      <img src={presupuesto} alt="" className="imgCarousel"/>
        <Carousel.Caption>
          <p className="fs-3 text-dark bg-white rounded">
            todo lo necesario en un solo software
          </p>
        </Carousel.Caption>
      </Carousel.Item>
    </Carousel>

        </div>
      </div>
      <div className="container-fluid contBanner glass-efect bg-secondary ">
        <div className="row colorPrimario">
            <div className="col-xl-7 d-flex align-items-center flex-column justify-content-center">
        <h4 className="text-center controlTexto  ">Este software tiene como finalidad mostrar todos los conocimientos adquiridos a lo largo de la tecnicatura en desarrollo de software. <br/> muchas gracias al equipo docente presente en cada paso de este trayecto. </h4>
        <h5 className="text-light"> att: Santi Araoz Daniel Emmanuel</h5>
        </div>        
        <img src={iset} alt="" className=" ms-5 my-2 imgBanner bg-light  col-lg-6 w-25" />
        </div>
      </div>
    </section>
  );
};

export default Principal;
