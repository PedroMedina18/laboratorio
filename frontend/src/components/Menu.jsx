import { useEffect } from 'react'
import menu from "../assets/iconos/menu.svg"
import consulta from '../assets/iconos/consulta.png'
import registro from '../assets/iconos/registro.png'
import muestra from '../assets/iconos/muestra.png'
import resultados from '../assets/iconos/resultados.png'
import home from '../assets/iconos/home.png'
import { Link } from "react-router-dom";

// Menu para navegar

function Menu() {
  
  useEffect(() => {
    Paginar()
  }, [])


  function Paginar() {
    const boton_menu = document.querySelector("#button-menu")
    const menu = document.querySelector("#menu-desplegable")
    const close = document.querySelector("#close")

    window.addEventListener('click', e => {
      if (menu.classList.contains('ver-menu') && e.target != menu && e.target != boton_menu && e.target != close) {
        menu.classList.toggle("ver-menu")
      }
    })
  }

  function Colocar_Menu() {
    const menu = document.querySelector("#menu-desplegable")
    menu.classList.toggle("ver-menu")

  }

  function Cerrar_Menu() {
    const menu = document.querySelector("#menu-desplegable")
    menu.classList.toggle("ver-menu")

  }
  return (
    <>
      <button className="shadow_t btn btn-light p-1 mt-2 ms-3" onClick={() => { Colocar_Menu() }} height="50px" style={{ height: "50px", borderRadius: "10px", }}> <img src={menu} alt="menu" width="40px" id="button-menu" /></button>
      <nav className='menu-navegacion' id='menu-desplegable'>
        <button className="shadow_t btn btn-light p-1 mt-2 ms-3 mb-2" onClick={() => { Cerrar_Menu() }} style={{ width: "50px", height: "50px", borderRadius: "10px", }}> <img src={menu} alt="menu" width="40px" id="close" /></button>
        <Link to="/Inicio" className="text-decoration-none text-black fs-5 w-100 d-flex align-items-center justify-content-center flex-fill menus"><img className='me-3' height="55px" width="70px" src={home} alt="icono" />Inicio</Link>
        <Link to="/Consulta" className="text-decoration-none text-black fs-5 w-100 d-flex align-items-center justify-content-center flex-fill menus"><img className='me-3' height="55px" width="70px" src={consulta} alt="icono" /> Consulta de Examenes</Link>
        <Link to="/Registro_Examenes" className="text-decoration-none text-black fs-5 w-100 d-flex align-items-center justify-content-center flex-fill menus"><img className='me-3' height="55px" width="70px" src={registro} alt="icono" /> Registro de Examenes</Link>
        <Link to="/Registro_Muestra" className="text-decoration-none text-black fs-5 w-100 d-flex align-items-center justify-content-center flex-fill menus"><img className='me-3' height="55px" width="70px" src={muestra} alt="icono" /> Registro de Muestras</Link>
        <Link to="/Captura_Resultados" className="text-decoration-none text-black fs-5 w-100 d-flex align-items-center justify-content-center flex-fill menus"><img className='me-3' height="55px" width="70px" src={resultados} alt="icono" /> Captura de Resultados</Link>
      </nav>
    </>
  )
}

export default Menu