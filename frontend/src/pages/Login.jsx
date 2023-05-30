import React, { useState, useContext } from "react";
import contraseña_2 from '../assets/iconos/contraseña_2.svg'
import alerta from '../assets/iconos/alertamensage.svg'
import PerfilLogo from '../assets/iconos/PerfilLogo.svg'
import { AuthContext } from "../context/AuthContext";
import { iniciarSeccion } from '../js/Servidor.js'
import { useNavigate } from "react-router-dom";

// funcion para invalidar campos
const invalidacion = (tipo) => {
  const formulario = document.querySelector("#Formulario")
  formulario.classList.remove("border-info")
  formulario.classList.add("border-danger")
  if (tipo === "Usuario no existe") {
    const input = document.querySelector("#Input_Usuario input")
    input.classList.remove("border-dark-subtle")
    input.classList.add("border-danger")
  }
  if (tipo === "Contraseña incorrecta") {
    const input = document.querySelector("#Input_Contraseña input")
    input.classList.remove("border-dark-subtle")
    input.classList.add("border-danger")
  }

}

function Login() {
  const { setLoginUser, user, initialDates, setValores } = useContext(AuthContext)

  const [messageError, setError] = useState(null)

  const navigate = useNavigate();

  // // para eliminar posibles datos precargados
  // useEffect(() => {
  //   setValores(initialDates)
  // }, [])

  // funcion encargada de ingresar al sistema
  const ingresar = async (e) => {
    e.preventDefault();
    // para ver errores
    try {
      let respuesta;
      respuesta = await iniciarSeccion(e.target);
      const data = await respuesta.json();
      if (data.permiso) {
        setLoginUser({
          ...user,
          state: data.permiso,
          usuario: data.usuario
        })
        navigate("/Inicio")
        document.getElementById('FormularioLogin').reset()
      } else {
        setError(data.message)
        invalidacion(data.message)
      }
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <main className="w-100 vh-100 d-flex flex-column justify-content-center align-items-center fondo">

      {/* mensaje de error */}

      {
        messageError ? (
          <div className="w-50 d-flex p-2 justify-content-center align-items-center alert alert-danger" role="alert">
            <img
              className="me-3"
              src={alerta}
              alt="alerta" />
            <p className="m-0 text-danger fw-bold fs-5">{messageError}</p>
          </div>
        ) : (
          <></>
        )
      }

      <form
        className=" d-flex justify-content-between align-items-center flex-column bg-white border border-info border-1 rounded form_form"
        id="FormularioLogin"
        onSubmit={ingresar}
      >
        <h2 className="text-uppercase fs-2 fw-bold m-0">Iniciar Sesión</h2>
        {/* Campo de Usuario */}
        <div className="d-flex w-100" id="Input_Usuario">
          <label className="me-1 cursor" htmlFor="Usuario">
            <img width="40px" src={PerfilLogo} alt="perfil" />
          </label>
          <input
            className="form-control border border-2 border-dark-subtle"
            type="text"
            name="Usuario"
            id="Usuario"
            placeholder="Usuario"
            required
          />
        </div>
        {/* Campo de la Contraseña */}
        <div className="d-flex w-100 " id="Input_Contraseña">
          <label className="me-1 cursor" htmlFor="Password">
            <img width="40px" src={contraseña_2} alt="Password" />
          </label>
          <input
            className="form-control border border-2 border-dark-subtle"
            type="password"
            name="Password"
            id="Password"
            placeholder="Contraseña"
            required
          />
        </div>
        {/* Boton Para Enviar Datos*/}
        <button
          type="submit"
          className="w-100 fw-bold btn btn-primary"
          id="Boton"
        >
          Enviar
        </button>
      </form>
    </main>
  );
}

export default Login