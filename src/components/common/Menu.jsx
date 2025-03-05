import React from "react";
import { Navbar, Nav, Container, Button } from "react-bootstrap";
import { NavLink, useNavigate } from "react-router-dom";
import logo from "../../../public/logo4.jfif";

const Menu = ({ usuarioLogeado, setUsuarioLogeado }) => {
  const navegacion = useNavigate();
  const logout = () => {
    sessionStorage.removeItem("user");
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
        <Container>
          <Navbar.Brand href="#home" className="text-white">
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
            <Nav className="ms-auto">
              <NavLink end className="nav-link" to="/">
                Inicio
              </NavLink>
              {usuarioLogeado ? (
                <>
                  {usuarioLogeado.role === "USER" ? (
                    <p end className="nav-link text-white">
                     ¡hola {usuarioLogeado.name}!
                    </p>
                  ) : usuarioLogeado.role === "SUPERADMIN" ? (
                    <NavLink end className="nav-link" to="/">
                      SUPERADMIN
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
        </Container>
      </Navbar>
    </>
  );
};

export default Menu;