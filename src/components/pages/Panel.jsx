import React, { useEffect, useState } from 'react';
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import UserTab from './UserTab';
import ProductTab from './product/ProductTab';
import ClientTab from './client/ClientTab';
import ProvTab from './povedor/ProvTab';
import { getProvider } from '../../helpers/provider';
import { getUser } from '../../helpers/user';
import { getProduct } from '../../helpers/product';
import { getClient } from '../../helpers/client';
import { getBudget } from '../../helpers/budget';
import BudgetTab from './budget/budgetTab';

const Panel = ({usuarioLogeado, actualizarDatos}) => {
  const jwt = sessionStorage.getItem("accessToken") || null;
  const user = usuarioLogeado;
//proveedor
  const [prov, setProv] = useState([]);
   const fetchDataProv = async () => {
      try {
        const result = await getProvider(jwt);
        if (result && result.data) {
          setProv(result.data);
        }
      } catch (e) {
        console.error("Error fetching product data:", e);
      }
    };
//usuario
const [userData, setUserData] = useState(null);
   const fetchDataUser=()=>{
      const fetchData = async () => { 
            try {
             
              const result = await getUser(user.id, jwt); 
              if (result && result.data) {
                setUserData(result.data); 
              }
            } catch (e) {
              console.error("Error fetching user data:", e); 
            }
          };
      
          if (user && jwt) {
              fetchData();
          }
    }
//producto
const [product, setProduct] = useState([]);
 const fetchDataProduct = async () => {
    try {
      const result = await getProduct(jwt);
      if (result && result.data) {
        setProduct(result.data);
      }
    } catch (e) {
      console.error("Error fetching product data:", e);
    }
  };
//cliente
  const [clients, setClients] = useState([]);
 const fetchDataClient = async () => {
    try {
      const result = await getClient(jwt);
      if (result && result.data) {
        setClients(result.data);
      }
    } catch (e) {
      console.error("Error fetching product data:", e);
    }
  };
//budget
  const [budget, setBudget] = useState([]);
 const fetchDataBudget = async () => {
    try {
      const result = await getBudget(jwt);
  
      if (result && result.data) {
        setBudget(result.data);
      }
    } catch (e) {
      console.error("Error fetching product data:", e);
    }
  };

    useEffect(()=>{
      fetchDataProv(),
      fetchDataUser(),
      fetchDataProduct(),
      fetchDataClient(),
      fetchDataBudget()
    },[])
    return (
        <section className='mainPage'>
        <Tabs
      defaultActiveKey="home"
      id="uncontrolled-tab-example"
      variant="tabs"
      className="my-3 bg-light "
    >
      <Tab eventKey="home" title="Usuario" className=''>
        <UserTab userData={userData} actualizarDatos={actualizarDatos} fetchDataUser={fetchDataUser}/>
      </Tab>
      <Tab eventKey="proveedores" title="proveedores">
        <ProvTab prov={prov} fetchDataProv={fetchDataProv}></ProvTab>
      </Tab>
      <Tab eventKey="productos" title="Productos">
        <ProductTab provider={prov} fetchDataProduct={fetchDataProduct} product={product} ></ProductTab>
      </Tab>
      <Tab eventKey="clientes" title="Clientes">
        <ClientTab clients={clients} fetchDataClient={fetchDataClient}></ClientTab>
      </Tab>
      <Tab eventKey="presupuesto" title="presupuestos">
       <BudgetTab budget={budget} fetchDataBudget={fetchDataBudget} product={product} clients={clients}></BudgetTab>
      </Tab>
    </Tabs>

        </section>
    );
};

export default Panel;