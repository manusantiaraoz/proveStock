import React from 'react';
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import UserTab from './UserTab';
import ProductTab from './product/ProductTab';

const Panel = ({usuarioLogeado, actualizarDatos}) => {
  console.log("desde panel", usuarioLogeado);
  
    return (
        <section className='mainPage'>
        <Tabs
      defaultActiveKey="home"
      id="uncontrolled-tab-example"
      className="mb-3 bg-dark"
    >
      <Tab eventKey="home" title="Usuario" className=''>
        <UserTab usuarioLogeado={usuarioLogeado} actualizarDatos={actualizarDatos}/>
      </Tab>
      <Tab eventKey="proveedores" title="proveedores">
        Tab content for Profile
      </Tab>
      <Tab eventKey="productos" title="Productos">
        <ProductTab usuarioLogeado={usuarioLogeado}></ProductTab>
      </Tab>
      <Tab eventKey="clientes" title="Clientes">
        Tab content for Contact
      </Tab>
      <Tab eventKey="presupuesto" title="presupuestos">
        Tab content for Contact
      </Tab>
    </Tabs>

        </section>
    );
};

export default Panel;