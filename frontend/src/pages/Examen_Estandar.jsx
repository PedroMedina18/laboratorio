import Menu from '../components/Menu'
import User from '../components/User'
import Reloj from "../components/Reloj";
import guardar from "../assets/iconos/registro.png"
import Membrete from "../components/MembreteExmamen"
import PDF from "../components/Pdf"
import { GuardarResultados, CompletarExamen, listValores_Examen } from '../js/Servidor';
import { jsPDF } from "jspdf"
import Alert from "../components/Alert";
import Aceptar from "../components/Aceptar";
import { useState, useContext, useEffect } from "react";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import Carga from "../components/Carga"

function Examen_Estandar({ IdExamen, nombre = "" }) {
  const [camposPDF, setPDF] = useState({ valores: null, observaciones: null, nombreDocument: null })
  const [CamposValores, setCampos] = useState(null)
  const { user } = useContext(AuthContext)
  const navigate = useNavigate();

  useEffect(() => {
    crearCampos()
  }, [])
  const crearCampos = async () => {
    try {
      const respuesta = await listValores_Examen(IdExamen);
      const datos = await respuesta.json();
      setCampos(datos.Valores)
    } catch (error) {
      console.log(error);
    }
  }
  const crearPdf = (e) => {
    e.preventDefault();
    let valores = []
    const campos = document.querySelectorAll(".campo_valor")
    campos.forEach(element => {
      const valor_Campo = {
        campo: element.children[0].innerText,
        resultado: element.children[1].value,
        unidad: String(element.children[2].innerText),
        valor_referencial: String(element.children[3].innerText)
      }
      valores.push(valor_Campo)
    })
    const paciente = String(document.getElementById("NombrePaciente").innerText).replace(`Nombre:`, ``).replaceAll(` `, `_`)
    const cedula = String(document.getElementById("CedulaPaciente").innerText).replace(`C.I:`, ``).replaceAll(` `, `_`)
    const Examen = String(document.getElementById("NombreExamen").innerText).replace(`Nombre:`, ``).replaceAll(` `, `_`)
    let fecha =new Date()
    fecha=`${fecha.getFullYear()}_${fecha.getMonth()}_${fecha.getDate()}_${fecha.getHours()}_${fecha.getMinutes()}_${fecha.getSeconds()}`
    const nombre = `${paciente}_${cedula}_${Examen}_${fecha}`
    console.log(nombre)
    setPDF({
      ...camposPDF,
      valores: valores,
      observaciones: String(e.target.observaciones.value),
      nombreDocument: nombre
    })
    crearDocumnet(nombre)
  }

  const crearDocumnet = (nombre) => {
    const formularioOne = document.querySelector("#FormEstandar")
    const formularioTwo = document.querySelector("#FormDocument")
    const AcepterOne = document.querySelector("#AlertaAceptar")
    let doc = new jsPDF("p", "pt", "a4");
    let margin = 10
    let scale = (doc.internal.pageSize.width - margin * 2) / document.querySelector('#documentPDF').scrollWidth
    formularioOne.classList.add("d-none")
    formularioTwo.classList.remove("d-none")
    formularioTwo.classList.add("d-flex")
    doc.html(document.querySelector('#documentPDF'), {
      x: margin,
      y: margin,
      html2canvas: { scale: scale },
      callback: (pdf) => {
        pdf.save(`${nombre}.pdf`)
      }
    })
    AcepterOne.classList.toggle("show_paciente")

  }

  const comprobar = () => {

    const form = document.querySelector("#FormEstandar").checkValidity()
    if (!form) {
      const alerta = document.querySelector(`#alertaDatos`)
      alerta.classList.toggle("show_paciente")
      setTimeout(() => {
        alerta.classList.remove("show_paciente")
      }, 3000);
      return
    }
    const aceptar = document.querySelector("#AlertaAceptar")
    aceptar.classList.toggle("show_paciente")
  }

  const comprobarDocument = () => {
    const form = document.querySelector("#FormDocument").checkValidity()
    const input = document.querySelector("#InputFile")
    if (!form) {
      const alerta = document.querySelector(`#alertaInput`)
      alerta.classList.toggle("show_paciente")
      setTimeout(() => {
        alerta.classList.remove("show_paciente")
      }, 3000);
      return
    }
    if (!(input.files[0].name === `${camposPDF.nombreDocument}.pdf`)) {
      const alerta = document.querySelector(`#alertaInput`)
      alerta.classList.toggle("show_paciente")
      setTimeout(() => {
        alerta.classList.remove("show_paciente")
      }, 3000);
      return
    }
    const aceptar = document.querySelector("#AlertaAceptarTwo")
    aceptar.classList.toggle("show_paciente")
  }

  const enviar = async (e) => {
    e.preventDefault();
    const cargando=document.querySelector("#pagina_carga")
    cargando.classList.add("show_paciente")
    const data = {
      "personal": user.usuario.id,
      "cargo": user.usuario.id_cargo,
      "observaciones": String(camposPDF.observaciones)
    }
    try {
      const respuesta = await CompletarExamen(IdExamen, data);
      const datos = await respuesta.json();
      if (datos.message === "Usted no esta autorizado") {
        console.log("NO AUTORIZADO")
        return
      }
      console.log(datos)
    } catch (error) {
      console.log(error);
    }

    const archivo = document.querySelector("#InputFile").files[0]
    const nombre = String(camposPDF.nombreDocument)
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
    navigate("/Inicio")
  }
  return (
    <main className='fondo_20 min-vh-100 d-flex flex-column align-items-center'>
      <section className="d-flex justify-content-between w-100">
        <Menu />
        <User grande={false} />
      </section>
      <Carga/>
      <section className=" py-3 px-3 w-95 rounded mt-1 bg-white">
        <Membrete IdExamen={IdExamen} />
        <Alert messageErrorm="Error. Complete todos los campos y dentro del rango requerido" id="alertaDatos" />
        <Alert messageErrorm="Error. No hay Documento o no es el mismo verifique" id="alertaInput" />
        <div>

          <form onSubmit={crearPdf} id="FormEstandar">
            <h2 className='text-center m-0 mb-2'>{nombre}</h2>
            <div className='d-flex bg-secondary-subtle border border-dark justify-content-between px-2'>
              <p className='m-0 letra' style={{ width: "190px" }}>Analisis</p>
              <p className='my-0 letra ' style={{ width: "150px", marginLeft: "50px" }}>Resultado</p>
              <p className='m-0 letra' style={{ width: "50px" }}>Unidades</p>
              <p className='m-0 letra' style={{ width: "180px" }}>Valor Referencial</p>
            </div>
            <Aceptar identificador="AlertaAceptar" />
            {
              CamposValores ? (
                CamposValores.map((element, index) =>
                  element.valor_minimo && element.valor_maximo ? (
                    <div key={index} className='d-flex justify-content-between px-2 my-2 campo_valor'>
                      <label htmlFor={`valor_${index}`} className='fw-bold' style={{ width: "190px" }}>{element.nombre}</label>
                      <input id={`valor_${index}`} required type="number" className='form-control border border-secondary' min={`${element.valor_minimo}`} max={`${element.valor_maximo}`} step="0.01" style={{ width: "200px", height: "30px", }} />
                      <p className='m-0 letra' style={{ width: "50px" }}>{element.unidad}</p>
                      <p className='m-0 letra' style={{ width: "180px" }}>{`${element.valor_minimo}-${element.valor_maximo} ${element.decorador ? element.decorador : ""}`}</p>
                    </div>
                  ) : (
                    <div key={index} className='d-flex justify-content-between px-2 my-2 campo_valor'>
                      <label htmlFor={`valor_${index}`} className='fw-bold' style={{ width: "190px" }}>{element.nombre}</label>
                      <input id={`valor_${index}`} required type="text" className='form-control border border-secondary' style={{ width: "200px", height: "30px", }} />
                      <p className='m-0 letra' style={{ width: "50px" }}>{element.unidad ? element.unidad : ""}</p>
                      <p className='m-0 letra' style={{ width: "50px" }}>{""}</p>
                    </div>
                  )
                )
              ) :
                (<></>)
            }
            <div className='d-flex align-items-center my-2 w-100'>
              <label className='fw-bold fs-4 me-3' htmlFor="observaciones">Observaciones</label>
              <textarea id="observaciones" className='form-control border border-secondary' required maxLength={2000} rows="5"></textarea>
            </div>
            <button onClick={comprobar} type='button' className="mx-auto py-1 px-4 fw-bold bGuardar">
              <img
                className="me-2"
                width="40px"
                height="40px"
                src={guardar}
                alt="guardar"
              />
              Guardar
            </button>
          </form>

          <form onSubmit={enviar} encType="multiport/form-data" id="FormDocument" className='d-none flex-column justify-content-between vh-60 position-relative'>
            <Aceptar identificador="AlertaAceptarTwo" />

            <h2 className="my-2 text-center">Por favor agrege el Documento PDF que se descargo y envielo </h2>
            <div className='d-flex w-100 my-2 justify-content-center align-items-center'>
              <label htmlFor="InputFile" className='fw-bold fs-5 mx-2'>Archivo</label>
              <input type="file" className='form-control border border-secondary' id="InputFile" style={{ width: "400px" }} accept=".pdf" required />

            </div>

            <button onClick={comprobarDocument} type="button" className="mx-auto py-1 px-4 fw-bold bGuardar">
              <img
                className="me-2"
                width="40px"
                height="40px"
                src={guardar}
                alt="guardar"
              />
              Guardar
            </button>
          </form>
        </div>

      </section>
      <section className="align-self-start mt-auto justify-self-end">
        <Reloj grande={false} />
      </section>
      <PDF IdExamen={IdExamen} nombreExamen={nombre} campos={camposPDF} />
    </main>
  )
}

export default Examen_Estandar