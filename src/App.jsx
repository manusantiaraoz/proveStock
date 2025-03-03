import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import Principal from "./components/routes/Principal";
import Footer from "./components/common/Footer";
import { useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./components/pages/login";

function App() {
  const usuario = JSON.parse(sessionStorage.getItem("user")) || ""; 
  const [usuarioLogeado, setUsuarioLogueado] = useState({usuario});
  console.log("usuario:", usuarioLogeado);
  
  return (
    <BrowserRouter>
      <Routes>
        <Route exact path="/" element={<Principal></Principal>}></Route>
        <Route
          exact
          path="/login"
          element={
              <Login setUsuarioLogueado={setUsuarioLogueado}></Login>
          }
        ></Route>
      </Routes>
      <Footer></Footer>
    </BrowserRouter>
  );
}

export default App;
