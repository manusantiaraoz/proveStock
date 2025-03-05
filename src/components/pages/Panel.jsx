import React from 'react';
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import UserTab from './UserTab';

const Panel = ({usuarioLogeado, actualizarDatos}) => {
  console.log("desde panel", usuarioLogeado);
  
    return (
        <section className='mainPage'>
        <Tabs
      defaultActiveKey="profile"
      id="uncontrolled-tab-example"
      className="mb-3 bg-dark"
    >
      <Tab eventKey="home" title="Usuario" className=''>
        <UserTab usuarioLogeado={usuarioLogeado} actualizarDatos={actualizarDatos}/>
      </Tab>
      <Tab eventKey="profile" title="proveedores">
        Tab content for Profile
      </Tab>
      <Tab eventKey="contact" title="Productos">
        Tab content for Contact
      </Tab>
      <Tab eventKey="contact" title="Clientes">
        Tab content for Contact
      </Tab>
      <Tab eventKey="contact" title="presupuestos">
        Tab content for Contact
      </Tab>
    </Tabs>

        </section>
    );
};

export default Panel;