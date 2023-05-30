import Menu from '../components/Menu'
import User from '../components/User'
import Reloj from "../components/Reloj";
import guardar from "../assets/iconos/registro.png"
import mas from "../assets/iconos/plus.png"
import Membrete from "../components/MembreteExmamen"
import { GuardarResultados, CompletarExamen } from '../js/Servidor';
import { useContext, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import InputFile from '../components/InputFile'
import Alert from "../components/Alert";
import { useNavigate } from "react-router-dom";
import Carga from "../components/Carga"
import Aceptar from "../components/Aceptar";

export default function Resonancia_RayosX({ IdExamen, nombre }) {
  const { user } = useContext(AuthContext)
  const [contador, setContador] = useState(1)
  const navigate = useNavigate();

  const enviar = async (e) => {
    e.preventDefault()
    const cargando=document.querySelector("#pagina_carga")
    cargando.classList.add("show_paciente")
    const data = {
      "personal": user.usuario.id,
      "cargo": user.usuario.id_cargo,
      "observaciones": String(e.target.observaciones.value)
    }
    try {
      const respuesta = await CompletarExamen(IdExamen, data);
      const datos = await respuesta.json();
      if (datos.message === "Usted no esta autorizado") {
        console.log("NO AUTORIZADO")
        return
      }
    } catch (error) {
      console.log(error);
    }
    for (let index = 1; index <= contador; index++) {
      const archivo = document.getElementById(`inputfile_${index}`).files[0]
      const nombre = String(document.getElementById(`nombre_${index}`).value)
      let FromData = new FormData()
      FromData.append('nombre', nombre);
      FromData.append('imagen', archivo)
      FromData.append('examen', IdExamen)
      try {
        const respuesta = await GuardarResultados(FromData);
        const datos = await respuesta.json();
        console.log(datos)
      } catch (error) {
        console.log(error);
      }
    }

    navigate("/Inicio")
  }
  const agregar = () => {
    const numero = contador + 1
    setContador(numero)

  }
  const eliminar = () => {
    const numero = contador - 1
    setContador(numero)

  }
  const constructor = () => {
    let array = [];
    for (let index = 1; index <= contador; index++) {
      array.push(
        <InputFile key={index} indice={index} eliminar={eliminar} />
      );
    }
    return array;
  }
  const comprobar = () => {
    const form = document.querySelector("#FormInputFile").checkValidity()
    

    if (contador === 0) {
      const alerta = document.querySelector(`#alertaArchivo`)
      alerta.classList.toggle("show_paciente")
      setTimeout(() => {
        alerta.classList.remove("show_paciente")
      }, 3000);
      return
    }

    if (!form) {
      const alerta = document.querySelector(`#alertaVacio`)
      alerta.classList.toggle("show_paciente")
      setTimeout(() => {
        alerta.classList.remove("show_paciente")
      }, 3000);
      return
    }
    const aceptar = document.querySelector("#AlertaAceptar")
    aceptar.classList.toggle("show_paciente")
  }

return (
  <main className='fondo_20 min-vh-100 d-flex flex-column align-items-center'>
    <section className="d-flex justify-content-between w-100">
      <Menu />
      <User grande={false} />
    </section>
    <section className=" py-3 px-3 w-95 rounded mt-1 bg-white vh-85">
    <Carga/>
      <Membrete IdExamen={IdExamen} />
      <Alert messageErrorm="No hay ningun arhivo asignado por favor agregue uno" id="alertaArchivo" />
      <Alert messageErrorm="Campo de archivo vacio por favor comprobar" id="alertaVacio" />


      <form id="FormInputFile" onSubmitCapture={enviar} encType="multiport/form-data" className='d-flex flex-column justify-content-between vh-60 position-relative' >
        <Aceptar identificador="AlertaAceptar" />
        <h2 className='text-center m-0 mb-2'>{nombre}</h2>
        <div className='d-flex flex-column w-100 my-2'>

          {constructor()}

        </div>
        <div className='d-flex align-items-center my-2 w-100'>
          <label className='fw-bold fs-4 me-3' htmlFor="observaciones">Observaciones</label>
          <textarea className='form-control border border-secondary' id="observaciones" maxLength={2000} name="observaciones" rows="5"></textarea>
        </div>
        <button type="button" onClick={comprobar} className="mx-auto py-1 px-4 fw-bold bGuardar">
          <img
            className="me-2"
            width="40px"
            height="40px"
            src={guardar}
            alt="guardar"
          />
          Guardar
        </button>

        <button type="button" onClick={agregar} className="mx-auto py-1 px-4 fw-bold bAgregar position-absolute top-0 end-0">
          <img
            className="me-2"
            width="40px"
            height="40px"
            src={mas}
            alt="guardar"
          />
          Agrar Otro archivo
        </button>
      </form>

    </section>
    <section className="align-self-start mt-auto justify-self-end">
      <Reloj grande={false} />
    </section>

  </main>
)
}
