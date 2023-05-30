import Reloj from "../components/Reloj";
import Menu from '../components/Menu'
import User from '../components/User'
import Pacientes from "../components/Pacientes";
import ContenedorBusquedad from "../components/ContenedorBusquedad";
import DatosExamen from "../components/DatosExamen";
import { registerExamen } from "../js/Servidor";
import { useContext, useEffect } from "react";
import { AuthContext } from "../context/AuthContext";
import Alert from "../components/Alert";
import { useNavigate } from "react-router-dom";
import Aceptar from "../components/Aceptar";
import Carga from "../components/Carga"

function Registro_Examenes() {
  const { user, cargarExamenes, descodificacion, setDatos, setList, setInformacion } = useContext(AuthContext)
  const navigate = useNavigate();

  useEffect(() => {
    setDatos({pacientes:null, tipoExamen:null, muestraExamen:null})
    setList({listExamen:null, listPaciente:null, listMuestraOne:null, listMuestraTwo:null})
    setInformacion(
      {
        estado: null,
        muestra_tipo: null,
        muestras: null,
        nombre_examen: null,
        id_tipo: null
      })
  }, [])
  // FUNCION ENCARGA DE REGISTRAR EL O LOS EXAMENES
  const registrar = async (e) => {
    e.preventDefault();
    const cargando=document.querySelector("#pagina_carga")
    cargando.classList.add("show_paciente")
    for (let index = 1; index <= cargarExamenes.examenes.length; index++) {

      const data = {
        "idPaciente": parseInt(e.target.paciente.value),
        "cedula": parseInt(e.target.cedula.value),
        "idExamen": descodificacion(document.getElementById(`codigo_${index}`).value),
        "nombre": document.getElementById(`nombre_${index}`).value,
        "idPersonal": user.usuario.id
      }
      try {
        const respuesta = await registerExamen(data);
        const datos = await respuesta.json();
        console.log(datos)
      } catch (error) {
        console.log(error);
      }
    }
    navigate("/Inicio")
  }

  return (
    <main className="fondo_20 min-vh-100 d-flex flex-column align-items-center">
      <section className="d-flex justify-content-between w-100">
        <Menu />
        <User grande={false} />
      </section>
      <Carga/>
      {/* CONTENEDORE DE BUSQUEDAD DE DATOS A LA BASE DE DATOS */}
      <ContenedorBusquedad tipo="paciente" containerSuperior="ContainerS_Paciente" containerInferior="Container_Paciente" Idformulario="Formulario_Paciente" Idclose="Close_Paciente" />
      <ContenedorBusquedad tipo="examen" containerSuperior="ContainerS_Examen" containerInferior="Container_Examen" Idformulario="Formulario_Examen" Idclose="Close_Examen" />

      {/* ALERTAS */}
      <Alert messageErrorm="No se a registrado ningun Paciente" id="alertaPaciente" />
      <Alert messageErrorm="No se a registrado ningun Examen" id="alertaExamen" />

      <form onSubmit={registrar} className="w-100 d-flex flex-column align-items-center justify-content-center">
        <h1 className="fw-bold">Registros de Examenes Clinicos</h1>

        <Aceptar identificador="AlertaAceptar" />

        <Pacientes />
        <DatosExamen />

      </form>

      <section className="align-self-start mt-auto justify-self-end">
        <Reloj grande={false} />
      </section>
    </main>
  );
}

export default Registro_Examenes;
