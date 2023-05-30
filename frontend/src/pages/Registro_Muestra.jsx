import Reloj from "../components/Reloj";
import Menu from '../components/Menu'
import User from '../components/User'
import ContenedorBusquedad from '../components/ContenedorBusquedad'
import DatosMuestra from "../components/DatosMuestra";
import Muestra from "../components/Muestra";
import Aceptar from "../components/Aceptar";
import Alert from "../components/Alert";
import { registerMuestra } from "../js/Servidor";
import { useContext, useEffect } from "react";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import Carga from "../components/Carga"


function Registro_Muestra() {
  const { user, descodificacion, setDatos, setList } = useContext(AuthContext)

  useEffect(() => {
    setDatos({pacientes:null, tipoExamen:null, muestraExamen:null})
    setList({listExamen:null, listPaciente:null, listMuestraOne:null, listMuestraTwo:null})
  }, [])
  
  const navigate = useNavigate();

  // funcion para registrar la muestra
  const registrar = async (e) => {
    e.preventDefault();
    const cargando=document.querySelector("#pagina_carga")
    cargando.classList.add("show_paciente")
    const data = {
      "idExamen": descodificacion(e.target.codigo.value),
      "idMuestra": parseInt(e.target.Muestra.value),
      "idPersonal": user.usuario.id,
      "fecha_extraccion": e.target.fecha_extraccion.value,
      "lote": Boolean(e.target.lote.value) ? e.target.lote.value : null,
      "interno": e.target.estado.value === "true" ? true : false,
      "numero": parseInt(e.target.numero.value)
    }
    try {
      const respuesta = await registerMuestra(data);
      const datos = await respuesta.json();
      if (datos.message == "Muestra No Permitida") {
        const aceptar=document.querySelector(`#AlertaAceptar`)
        aceptar.classList.toggle("show_paciente")
        // _________________________________________
        const alerta = document.querySelector(`#alertaMuestra`)
        console.log(alerta)
        alerta.classList.toggle("show_paciente")
        setTimeout(() => {
          alerta.classList.remove("show_paciente")
        }, 3000);
      }else{
        navigate("/Inicio")
      }
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <main className="fondo_2 min-vh-100 d-flex flex-column align-items-center">
      <section className="d-flex justify-content-between w-100">
        <Menu />
        <User grande={false} />
      </section>
      <Carga/>
      <ContenedorBusquedad tipo="muestra" containerSuperior="ContainerS_Muestra" containerInferior="Container_Muestra" Idformulario="Formulario_Muestra" Idclose="Close_Muestra" />


      <Alert messageErrorm="No se a registrado ningun Paciente ni Examen" id="alertaPacienteExamen" />
      <Alert messageErrorm="Complete los datos" id="alertaDatos" />
      <Alert messageErrorm="Muestra no permitida para este Examen" id="alertaMuestra" />


      <h1>Registro de Muestras</h1>

      <form onSubmit={registrar} className='w-95 bg-white p-3 position-relative' id="Form_Muestra">

        <Aceptar identificador="AlertaAceptar" />
        
        <DatosMuestra />
        <Muestra />

      </form>
      <section className="align-self-start mt-auto justify-self-end">
        <Reloj grande={false} />
      </section>
    </main>
  )
}

export default Registro_Muestra