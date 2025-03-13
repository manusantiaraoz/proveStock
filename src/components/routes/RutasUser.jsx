import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Panel from '../pages/Panel';

//importar las rutas del usuario
const RutasUser = ({usuarioLogeado, actualizarDatos}) => {
    return (
        
        <Routes>
          <Route path='/' element={<Panel usuarioLogeado={usuarioLogeado} actualizarDatos={actualizarDatos}></Panel>}>   
          </Route>
        </Routes>            
        
        
    );
};

export default RutasUser;