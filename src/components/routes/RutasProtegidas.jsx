import React from 'react';
import { Navigate } from 'react-router';

const RutasProtegidas = ({children ,rolesPermitidos, usuarioLogeado}) => {
    const userRol = usuarioLogeado
    
    
    if(!userRol){
        console.log("usuario sin rol");
        
        return <Navigate to={'/login'}></Navigate>        
    }if(rolesPermitidos && !rolesPermitidos.includes(userRol.role)){
        console.log("sin permisos");
        return <Navigate to={'/login'}></Navigate>
    }
    
    
    return children
}

export default RutasProtegidas;