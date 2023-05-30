import Reloj from '../components/Reloj'
import Boton from '../components/Boton'
import Menu from '../components/Menu'
import User from '../components/User'
import Boton_Salir from '../components/Boton_Salir'
import consulta from '../assets/iconos/consulta.png'
import registro from '../assets/iconos/registro.png'
import muestra from '../assets/iconos/muestra.png'
import resultados from '../assets/iconos/resultados.png'
import { useContext, useEffect } from 'react'
import { AuthContext } from "../context/AuthContext";

function Incio() {
  const { initialDates, setValores, setInformacion } = useContext(AuthContext)

  useEffect(() => {
    setValores(initialDates)
    setInformacion(
      {
        estado: null,
        muestra_tipo: null,
        muestras: null,
        nombre_examen: null,
        id_tipo: null
      })
  }, [])

  return (
    <main className='fondo_2 min-vh-100 d-flex flex-column justify-content-between align-items-center'>

      <section className='d-flex justify-content-between w-100'>
        <Menu />
        <User grande={true} />
      </section>
      <section className='w-75 d-flex flex-wrap justify-content-center mt-5'>
        <Boton img={consulta} nombre="Consulta de Examenes" direccion="/Consulta" />
        <Boton img={registro} nombre="Registro de Examenes" direccion="/Registro_Examenes" />
        <Boton img={muestra} nombre="Registro de Muestras" direccion="/Registro_Muestra" />
        <Boton img={resultados} nombre="Captura de Resultados" direccion="/Captura_Resultados" />
      </section>
      <section className='d-flex justify-content-between align-items-center w-100 '>
        <Reloj grande={true} mensage="inicio" />
        <Boton_Salir />
      </section>
    </main>
  )
}

export default Incio