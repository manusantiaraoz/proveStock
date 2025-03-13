import React from 'react';
import { Route, Routes } from 'react-router-dom';
import PanelAdministrador from '../pages/PanelAdministrador';

const RutaAdmin = ({usuarioLogeado, actualizarDatos}) => {
    return (
        
        <Routes>
          <Route path='/' element={<PanelAdministrador usuarioLogeado={usuarioLogeado} actualizarDatos={actualizarDatos}></PanelAdministrador>}>   
          </Route>
        </Routes>            
        
        
    );
};

export default RutaAdmin;