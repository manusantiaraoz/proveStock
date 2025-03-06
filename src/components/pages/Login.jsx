import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { loginApi } from "../../helpers/auth";
import Swal from "sweetalert2";
import logo from "../../../public/logo4.jfif";
import { useNavigate } from "react-router-dom";

const Login = ({setUsuarioLogeado}) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const navegacion = useNavigate()

  const onSubmit = async (data, e) => {
    e.preventDefault()
    try {
      await loggerUser(data);
    } catch (error) {
      console.error("Error en onSubmit:", error);
    }
  };

  useEffect(() => {
    return () => {
      reset();
    };
  }, [reset]);

  const loggerUser = async (info) => {
    try {
      const repuesta = await loginApi(info);
      const { user, token } = repuesta;
      sessionStorage.setItem("user", JSON.stringify(user));
      sessionStorage.setItem("accessToken", token.accessToken);
      Swal.fire({
        icon: "success",
        title: "bienvenido",
        text: `hola ${user.name} que tengas una jornada productiva`,
      });
      setUsuarioLogeado(user)
      navegacion('/user')
    } catch (e) {
      console.error("Error en loggerUser:", e);
      Swal.fire({
        icon: "error",
        title: "Oops..., no se encontro el usuario",
        text: "verifica que los campos sean correctos",
      });
      throw e;
    }
  };

  return (
    <section
      className="mainPage
    d-flex
    justify-content-center
    align-content-center
    flex-wrap"
    >
      <div className="containter fondoLogin rounded shadow-sm">
        <div className="row">
          <div className="col-4">
            <img src={logo} alt="" className="w-100" />
          </div>
          <div className="col-8 justify-content-center align-content-center flex-wrap p-5">
            <h3 className="text-center mb-3">inicio de sesion</h3>
            <form
              onSubmit={handleSubmit(onSubmit)}
              className="d-flex flex-column"
            >
              <div className="mb-1">
                <input
                  placeholder="example@gmail.com"
                  className="input-group-text w-100"
                  type="email"
                  {...register("email", {
                    required: true,
                  })}
                />
                {errors.email && (
                  <span className="fs-6 text-danger">
                    este campo debe ser un email valido y es obligatorio
                  </span>
                )}
              </div>
              <div className="mb-4">
                <input
                  placeholder="*******"
                  type="password"
                  className="input-group-text w-100 "
                  {...register("password", {
                    required: true,
                    minLength: 8,
                    maxLength: 12,
                  })}
                />
                {errors.password && (
                  <span className="fs-6 text-danger">
                    este campo debe tener minimo 8 caracteres y es obligatorio
                  </span>
                )}
              </div>
              <input className="btn btn-dark" type="submit" />
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Login;
