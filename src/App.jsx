import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import Principal from "./components/pages/Principal";
import Footer from "./components/common/Footer";
import { useEffect, useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./components/pages/login";
import RutasProtegidas from "./components/routes/RutasProtegidas";
import RutasUser from "./components/routes/RutasUser";
import Menu from "./components/common/Menu";


function App() {
  const usuario = JSON.parse(sessionStorage.getItem("user")) || null
  const [usuarioLogeado, setUsuarioLogeado] = useState(usuario);
  
  const actualizarDatos = (nuevosDatos) => {
    setUsuarioLogeado(nuevosDatos);
    sessionStorage.setItem("user", JSON.stringify(nuevosDatos));
  };
  useEffect(()=>{
    console.log("desde app", usuarioLogeado);
    
  },[usuarioLogeado])
  return (
    <BrowserRouter>
    <Menu usuarioLogeado={usuarioLogeado}  setUsuarioLogeado={setUsuarioLogeado}></Menu>
      <Routes>
        <Route exact path="/" element={<Principal></Principal>}></Route>
        <Route
          exact
          path="/login"
          element={<Login setUsuarioLogeado={setUsuarioLogeado}></Login>}
        ></Route>
        <Route
          exact
          path="/user/*"
          element={
            <RutasProtegidas rolesPermitidos = {['USER', 'SUPERADMIN']} usuarioLogeado ={usuarioLogeado} >
              <RutasUser usuarioLogeado ={usuarioLogeado} actualizarDatos={actualizarDatos}></RutasUser>
            </RutasProtegidas>
          }
        ></Route>
      </Routes>
      <Footer></Footer>
    </BrowserRouter>
  );
}

export default App;
