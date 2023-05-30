import React from "react";
import usuario from "../assets/iconos/user.svg";
import { useContext, useEffect } from "react";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

// COMPONENETE ENCARGADO DE MOSTRAR LA INFORMACION BASICA DEL USUARIO
// TIENE DOS VERSIONES UNA GRANDE Y UNA PEQUEÑA POR LO QUE SE DEBE INDICAR CUAL SE NECESITA

function User({ grande=false }) {
  const { user } = useContext(AuthContext)

  const navigate = useNavigate();


  useEffect(() => {
    if (!(user.usuario )) {
      navigate("/Login")
    }
  }, [])

  if (!(user.usuario)) {
    return (<></>)
  } else {
    if (grande) {
      return (
        <div className="d-flex align-items-center  justify-content-center p-2 mt-2 me-2 bg-light bg-gradient rounded border border-info  border-opacity-10 border-2">
          <div className="d-flex flex-column me-3 tamaño text-center fw-bold">
            <p className="m-0">{`${user.usuario.nombres} ${user.usuario.apellidos}`}</p>
            <p className="m-0">{user.usuario.cargo}</p>
          </div>
          <div
            className="rounded-circle  d-flex justify-content-center align-items-center"
            style={{ height: "60px", width: "60px" }}>
            <img className="m-0 p-0" src={usuario} alt="usuario" width="60px" />
          </div>
        </div>
      )
    } else {
      return (
        <div className="d-flex align-items-center justify-content-center px-1 py-1 mt-1 me-3 bg-light bg-gradient rounded border border-info  border-opacity-10 border-2">
          <div className="d-flex align-items-center me-2 tamaño text-center fw-bold">
            <p className="m-0">{`${user.usuario.nombres} ${user.usuario.apellidos}`}</p>
            <p className="mx-1 my-0">|</p>
            <p className="m-0">{user.usuario.cargo}</p>
          </div>
          <div
            className="rounded-circle  d-flex justify-content-center align-items-center"
            style={{ height: "45px", width: "60px" }}>
            <img className="m-0 p-0" src={usuario} alt="usuario" width="60px" />
          </div>
        </div>
      )
    }
  }



}

export default User;
