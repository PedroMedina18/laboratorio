import Menu from '../components/Menu'
import User from '../components/User'
import Reloj from "../components/Reloj";
import guardar from "../assets/iconos/registro.png"
import Membrete from "../components/MembreteExmamen"
import PDF from "../components/Pdf"
import { GuardarResultados, CompletarExamen } from '../js/Servidor';
import { jsPDF } from "jspdf"
import Alert from "../components/Alert";
import Aceptar from "../components/Aceptar";
import { useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import Carga from "../components/Carga"

function Examen_Heces({ IdExamen }) {
  const { user } = useContext(AuthContext)
  const [camposPDF, setPDF] = useState({ valoresOne: null, valoresTwO: null, valoresTree: null, observaciones: null, nombreDocument: null })
  const navigate = useNavigate();
  const crearPdf = (e) => {
    e.preventDefault();
    let valoresOne = []
    let valoresTwO = []
    const campos = document.querySelectorAll(".campo_valor")
    for (let index = 1; index <= 9; index++) {
      const valores = campos[index - 1]
      const valor_Campo = {
        campo: valores.children[0].innerText,
        resultado: valores.children[1].value,
      }
      valoresOne.push(valor_Campo)
    }

    for (let index = 10; index <= 12; index++) {
      const valores = campos[index - 1]
      const valor_Campo = {
        campo: valores.children[0].innerText,
        resultado: valores.children[1].value,
      }
      valoresTwO.push(valor_Campo)
    }
    const paciente = String(document.getElementById("NombrePaciente").innerText).replace(`Nombre:`, ``).replaceAll(` `, `_`)
    const cedula = String(document.getElementById("CedulaPaciente").innerText).replace(`C.I:`, ``).replaceAll(` `, `_`)
    const Examen = String(document.getElementById("NombreExamen").innerText).replace(`Nombre:`, ``).replaceAll(` `, `_`)
    let fecha =new Date()
    fecha=`${fecha.getFullYear()}_${fecha.getMonth()}_${fecha.getDate()}_${fecha.getHours()}_${fecha.getMinutes()}_${fecha.getSeconds()}`
    const nombre = `${paciente}_${cedula}_${Examen}_${fecha}`
    setPDF({
      ...camposPDF,
      valoresOne: valoresOne,
      valoresTwO: valoresTwO,
      valoresTree: String(e.target.valor_13.value),
      observaciones: String(e.target.observaciones.value),
      nombreDocument: nombre
    })
    crearDocumnet(nombre)
  }
  const crearDocumnet = (nombre) => {
    const formularioOne = document.querySelector("#FormHeces")
    const formularioTwo = document.querySelector("#FormDocument")
    const AcepterOne = document.querySelector("#AlertaAceptar")
    let doc = new jsPDF("p", "pt", "a4");
    let margin = 10
    let scale = (doc.internal.pageSize.width - margin * 2) / document.querySelector('#documentPDFHeces').scrollWidth
    formularioOne.classList.add("d-none")
    formularioTwo.classList.remove("d-none")
    formularioTwo.classList.add("d-flex")
    doc.html(document.querySelector('#documentPDFHeces'), {
      x: margin,
      y: margin,
      html2canvas: { scale: scale },
      callback: (pdf) => {
        pdf.save(`${nombre}.pdf`)
      }
    })
    AcepterOne.classList.toggle("show_paciente")

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
  const comprobar = () => {
    const form = document.querySelector("#FormHeces").checkValidity()
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
        <Alert messageErrorm="Error. Complete todos los campos" id="alertaDatos" />
        <Alert messageErrorm="Error. No hay Documento o no es el mismo verifique" id="alertaInput" />
        <form onSubmit={crearPdf} id="FormHeces">
          <Aceptar identificador="AlertaAceptar" />
          <h2 className='text-center m-0'>Examen de Heces</h2>
          <h4 className='fw-bold my-3'>Examen Macroscópico</h4>
          <div className=' w-100 d-flex flex-wrap'>
            <div className=' w-100 d-flex flex-wrap'>
              <div className='d-flex align-items-center my-1 campo_valor mx-1 justify-content-between' style={{ width: "400px" }}>
                <label className='fw-bold ' htmlFor="valor_1" maxLength={50}>ASPECTO</label>
                <input required id="valor_1" className='ms-5 form-control border border-secondary' style={{ width: "200px", height: "30px" }} type="text" />
              </div>
              <div className='d-flex align-items-center my-1 campo_valor mx-1 justify-content-between' style={{ width: "400px" }}>
                <label className='fw-bold ' htmlFor="valor_2" maxLength={50}>COLOR</label>
                <input required id="valor_2" className='form-control border border-secondary' type="text" style={{ width: "200px", height: "30px" }} />
              </div>
              <div className='d-flex align-items-center my-1 campo_valor mx-1 justify-content-between' style={{ width: "400px" }}>
                <label className='fw-bold ' htmlFor="valor_3" maxLength={50}>CONSISTENCIA</label>
                <input required id="valor_3" className='form-control border border-secondary' type="text" style={{ width: "200px", height: "30px" }} />
              </div>
              <div className='d-flex align-items-center my-1 campo_valor mx-1 justify-content-between' style={{ width: "400px" }}>
                <label className='fw-bold ' htmlFor="valor_4" maxLength={50}>REACCION</label>
                <input required id="valor_4" className='form-control border border-secondary' type="text" style={{ width: "200px", height: "30px" }} />
              </div>
              <div className='d-flex align-items-center my-1 campo_valor mx-1 justify-content-between' style={{ width: "400px" }}>
                <label className='fw-bold ' htmlFor="valor_5" maxLength={50}>SANGRE</label>
                <input required id="valor_5" className='form-control border border-secondary' type="text" style={{ width: "200px", height: "30px" }} />
              </div>
              <div className='d-flex align-items-center my-1 campo_valor mx-1 justify-content-between' style={{ width: "400px" }}>
                <label className='fw-bold' htmlFor="valor_6" maxLength={50}>MOCO</label>
                <input required id="valor_6" className='form-control border border-secondary' type="text" style={{ width: "200px", height: "30px" }} />
              </div>
              <div className='d-flex align-items-center my-1 campo_valor mx-1 justify-content-between' style={{ width: "400px" }}>
                <label className='fw-bold' htmlFor="valor_7" maxLength={50}>PUS</label>
                <input required id="valor_7" className='form-control border border-secondary' type="text" style={{ width: "200px", height: "30px" }} />
              </div>
              <div className='d-flex align-items-center my-1 campo_valor mx-1 justify-content-between' style={{ width: "400px" }}>
                <label className='fw-bold' htmlFor="valor_8" maxLength={50}>RESTOS DE ALIMENTOS</label>
                <input required id="valor_8" className='form-control border border-secondary' type="text" style={{ width: "200px", height: "30px" }} />
              </div>
              <div className='d-flex align-items-center my-1 campo_valor mx-1 justify-content-between' style={{ width: "400px" }}>
                <label className='fw-bold ' htmlFor="valor_9" maxLength={50}>OLOR</label>
                <input required id="valor_9" className='form-control border border-secondary' type="text" style={{ width: "200px", height: "30px" }} />
              </div>
            </div>
          </div>
          <h4 className='m-0 fw-bold my-3'>Examen Microscópico</h4>
          <div className='w-100 d-flex flex-wrap my-1'>

            <div className='d-flex align-items-center my-1 campo_valor mx-1 justify-content-between' style={{ width: "400px" }}>
              <label className='fw-bold me-3' htmlFor="valor_10" maxLength={50}>PROTOZOARIOS</label>
              <input required id="valor_10" className='form-control border border-secondary' type="text" style={{ width: "200px", height: "30px" }} />
            </div>
            <div className='d-flex align-items-center my-1 campo_valor mx-1 justify-content-between' style={{ width: "400px" }}>
              <label className='fw-bold me-3' htmlFor="valor_11" maxLength={50}>HELMINTOS</label>
              <input required id="valor_11" className='form-control border border-secondary' type="text" style={{ width: "200px", height: "30px" }} />
            </div>
            <div className='d-flex align-items-center my-1 campo_valor mx-1 justify-content-between' style={{ width: "400px" }}>
              <label className='fw-bold me-3' htmlFor="valor_12" maxLength={50}>LEUCOCITOS</label>
              <input required id="valor_12" className='form-control border border-secondary' type="text" style={{ width: "200px", height: "30px" }} />
            </div>
          </div>
          <div>
            <div className='d-flex align-items-center my-2 w-100'>
              <label className='fw-bold fs-4 me-3 text-center' htmlFor="valor_13" maxLength={300}>Examen Parasitológico</label>
              <textarea required id="valor_13" className='form-control border border-secondary' rows=""></textarea>
            </div>
            <div className='d-flex align-items-center my-2 w-100'>
              <label className='fw-bold fs-4 me-3' htmlFor="observaciones" maxLength={2000}>Observaciones</label>
              <textarea required id="observaciones" className='form-control  border border-secondary' rows="3"></textarea>
            </div>
          </div>
          <button onClick={comprobar} type="button" className="mx-auto py-1 px-4 fw-bold bGuardar">
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
      </section>
      <section className="align-self-start mt-auto justify-self-end">
        <Reloj grande={false} />
      </section>

      <PDF IdExamen={IdExamen} nombreExamen="Examen De Heces" campos={camposPDF} />
    </main>
  )
}

export default Examen_Heces