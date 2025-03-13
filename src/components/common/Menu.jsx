import React from "react";
import { Navbar, Nav, Button } from "react-bootstrap";
import { NavLink, useNavigate } from "react-router-dom";
import logo from "../../../public/logo4.jfif";

const Menu = ({ usuarioLogeado, setUsuarioLogeado }) => {
  const navegacion = useNavigate();
  const logout = () => {
    sessionStorage.removeItem("user");
    sessionStorage.removeItem("accessToken")
    setUsuarioLogeado(null);
    navegacion("/");
  };

  React.useEffect(() => {
    if (usuarioLogeado && !["USER", "SUPERADMIN"].includes(usuarioLogeado?.role)) {
      setUsuarioLogeado(null); // Establece usuarioLogeado como null
      navegacion("/");
    }
  }, [usuarioLogeado, navegacion, setUsuarioLogeado]);

  return (
    <>
      <Navbar expand="lg" className="colorPrimario">
        <>
          <Navbar.Brand href="#home" className=" ms-4 text-white">
            <img
              alt=""
              src={logo}
              width="35"
              height="35"
              className="d-inline-block align-top rounded"
            />
            {" "}
            ProveStock
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ms-auto me-4">
              <NavLink end className="nav-link" to="/">
                Inicio
              </NavLink>
              {usuarioLogeado ? (
                <>
                  {usuarioLogeado.role === "USER" ? (
                    <>
                    <NavLink  className="nav-link text-white">
                     ¡{usuarioLogeado.name}!
                    </NavLink>
                    <NavLink  className="nav-link" to="/user">
                     Panel
                    </NavLink>
                  </>
                  ) : usuarioLogeado.role === "SUPERADMIN" ? (
                    <NavLink end className="nav-link" to="/admin">
                      administrador
                    </NavLink>
                  ) : null}
                  {usuarioLogeado?.role === "USER" || usuarioLogeado?.role === "SUPERADMIN" ? (
                    <Button className="nav-link" onClick={logout}>
                      Logout
                    </Button>
                  ) : null}
                </>
              ) : (
                <NavLink end className="nav-link" to="/login">
                  Login
                </NavLink>
              )}
            </Nav>
          </Navbar.Collapse>
        </>
      </Navbar>
    </>
  );
};

export default Menu;