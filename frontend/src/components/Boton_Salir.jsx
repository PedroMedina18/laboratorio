import exit from "../assets/iconos/salir.svg"
import { useContext, useEffect } from "react";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from 'react-router-dom'


function Boton_Salir() {
  const { setLoginUser, user } = useContext(AuthContext)
  const navigate = useNavigate();

  const salir = () => {
    setLoginUser({
      ...user,
      state: false,
      usuario: null
    })
    navigate("/Login")
  }
  return (
    <button onClick={salir} className="shadow_t btn btn-light p-1 me-3 text-decoration-none text-black cursor" height="50px" style={{ height: "75px", width: "80px", borderRadius: "10px", }} href="/Login">
      <img src={exit} alt="salir" width="70px" />
    </button>
  )
}

export default Boton_Salir