import Reloj from '../components/Reloj'
import Boton from '../components/Boton'
import Menu from '../components/Menu'
import User from '../components/User'
import Boton_Salir from '../components/Boton_Salir'
import home from '../assets/iconos/home.png'
import error from '../assets/iconos/error-404.png'
import { useContext, useEffect } from "react";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from 'react-router-dom'



function Error404() {
  const { user } = useContext(AuthContext)
  const navigate = useNavigate();
  useEffect(() => {
      if(!user.state){
        navigate("/Login")
      }
  }, [])

  return (
    <main className='fondo_2 min-vh-100 d-flex flex-column justify-content-between align-items-center'>
      <section className='d-flex justify-content-between w-100'>
        <Menu />
        <User grande={true} />
      </section>
      <section className='w-100 d-flex flex-column justify-content-center align-items-center mt-2 '>
        <div className='w-100 d-flex flex-column justify-content-center align-items-center'>
            <h1 className='fw-bold'>Pagina No encontrada</h1>
            <img src={error} alt="Error" width="200px" height="200px"/>
        </div>
        <Boton img={home} nombre="Inicio" direccion="/Inicio" />
        
      </section>
      <section className='d-flex justify-content-between align-items-center w-100 '>
        <Reloj grande={true} mensage="inicio" />
        <Boton_Salir />
      </section>
    </main>
  )
}

export default Error404