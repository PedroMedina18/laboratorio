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

function Examen_Orina({ IdExamen }) {
    const { user } = useContext(AuthContext)
    const [camposPDF, setPDF] = useState({ valoresOne: null, valoresTwO: null, valoresTree: null, observaciones: null, nombreDocument: null })
    const navigate = useNavigate();

    const crearPdf = (e) => {
        e.preventDefault();
        let valoresOne = []
        let valoresTwO = []
        let valoresTree = []
        const campos = document.querySelectorAll(".campo_valor")
        for (let index = 1; index <= 2; index++) {
            const valores = campos[index - 1]
            const valor_Campo = {
                campo: valores.children[0].innerText,
                resultado: valores.children[1].value,
                unidad: String(valores.children[2].innerText),
                valor_referencial: String(valores.children[3].innerText)
            }
            valoresOne.push(valor_Campo)
        }

        for (let index = 3; index <= 8; index++) {
            const valores = campos[index - 1]
            const valor_Campo = {
                campo: valores.children[0].innerText,
                resultado: valores.children[1].value,
                unidad: String(valores.children[2].innerText),
                valor_referencial: String(valores.children[3].innerText)
            }
            valoresTwO.push(valor_Campo)
        }
        for (let index = 9; index <= 14; index++) {
            const valores = campos[index - 1]
            const valor_Campo = {
                campo: valores.children[0].innerText,
                resultado: valores.children[1].value,
                unidad: String(valores.children[2].innerText),
                valor_referencial: String(valores.children[3].innerText)
            }
            valoresTree.push(valor_Campo)
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
            valoresTree: valoresTree,
            observaciones: String(e.target.observaciones.value),
            nombreDocument: nombre
        })
        crearDocumnet(nombre)

    }
    const crearDocumnet = (nombre) => {
        const formularioOne = document.querySelector("#FormOrina")
        const formularioTwo = document.querySelector("#FormDocument")
        const AcepterOne = document.querySelector("#AlertaAceptar")
        let doc = new jsPDF("p", "pt", "a4");
        let margin = 10
        let scale = (doc.internal.pageSize.width - margin * 2) / document.querySelector('#documentPDFOrina').scrollWidth
        formularioOne.classList.add("d-none")
        formularioTwo.classList.remove("d-none")
        formularioTwo.classList.add("d-flex")
        doc.html(document.querySelector('#documentPDFOrina'), {
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

        const form = document.querySelector("#FormOrina").checkValidity()
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
        if (!form ) {
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
                <form onSubmit={crearPdf} id="FormOrina">
                    <Aceptar identificador="AlertaAceptar" />

                    <h2 className='text-center m-0 mb-2'>Examen De Orina</h2>
                    <div className='d-flex bg-secondary-subtle border border-dark justify-content-between px-2'>
                        <p className='m-0 letra' style={{ width: "120px" }}>Analisis</p>
                        <p className='my-0 letra ' style={{ width: "150px", marginLeft: "50px" }}>Resultado</p>
                        <p className='m-0 letra' style={{ width: "50px" }}>Unidades</p>
                        <p className='m-0 letra' style={{ width: "180px" }}>Valor Referencial</p>
                    </div>
                    <div>
                        <h5 className='text-center'>Macroscopio</h5>
                        <div className='d-flex  justify-content-between px-2 my-2 campo_valor' id="campo_1">
                            <label id="identificador_1" htmlFor="valor_1" className='fw-bold' style={{ width: "120px" }}>COLOR</label>
                            <input id="valor_1" type="text" className='form-control border border-secondary' maxLength={50} style={{ width: "200px", height: "30px" }} required />
                            <p id="unidad_1" className='m-0 letra' style={{ width: "50px" }}></p>
                            <p id="referencia_1" className='m-0 letra' style={{ width: "180px" }}></p>
                        </div>
                        <div className='d-flex justify-content-between px-2 my-2 campo_valor' id="campo_2">
                            <label id="identificador_2" htmlFor="valor_2" className='fw-bold' style={{ width: "120px" }}>ASPECTO</label>
                            <input id="valor_2" type=" text" className='form-control border border-secondary' maxLength={50} style={{ width: "200px", height: "30px" }} required />
                            <p id="unidad_2" className='m-0 letra' style={{ width: "50px" }}></p>
                            <p id="referencia_2" className='m-0 letra' style={{ width: "180px" }}></p>
                        </div>
                    </div>
                    <div>

                        <h5 className='text-center'>Quimico</h5>

                        <div className='d-flex justify-content-between px-2 my-2 campo_valor' id="campo_3">
                            <label id="identificador_3" htmlFor="valor_3" className='fw-bold' style={{ width: "120px" }}>DENSIDAD</label>
                            <input id="valor_3" type="number" className='form-control border border-secondary' style={{ width: "200px", height: "30px" }} min="1003" max="1030" step="0.01" required />
                            <p id="unidad_3" className='m-0 letra' style={{ width: "50px" }}>gr/ml</p>
                            <p id="referencia_3" className='m-0 letra' style={{ width: "180px" }}>1003 - 1030</p>
                        </div>
                        <div className='d-flex justify-content-between px-2 my-2 campo_valor' id="campo_4">
                            <label id="identificador_4" htmlFor="valor_4" className='fw-bold' style={{ width: "120px" }}>PROTEINAS</label>
                            <input id="valor_4" type="text" className='form-control border border-secondary' maxLength={50} style={{ width: "200px", height: "30px" }} required />
                            <p id="unidad_4" className='m-0 letra' style={{ width: "50px" }}></p>
                            <p id="referencia_4" className='m-0 letra' style={{ width: "180px" }}></p>
                        </div>
                        <div className='d-flex justify-content-between px-2 my-2 campo_valor' id="campo_5">
                            <label id="identificador_5" htmlFor="valor_5" className='fw-bold' style={{ width: "120px" }}>PH</label>
                            <input id="valor_5" type="number" className='form-control border border-secondary' style={{ width: "200px", height: "30px" }} min="5" max="7" step="0.01" required />
                            <p id="unidad_5" className='m-0 letra' style={{ width: "50px" }}></p>
                            <p id="referencia_5" className='m-0 letra' style={{ width: "180px" }}>5 - 7</p>
                        </div>
                        <div className='d-flex justify-content-between px-2 my-2 campo_valor' id="campo_6">
                            <label id="identificador_6" htmlFor="valor_6" className='fw-bold' style={{ width: "120px" }}>SANGRE</label>
                            <input id="valor_6" type="text" className='form-control border border-secondary' maxLength={50} style={{ width: "200px", height: "30px" }} required />
                            <p id="unidad_6" className='m-0 letra' style={{ width: "50px" }}></p>
                            <p id="referencia_6" className='m-0 letra' style={{ width: "180px" }}></p>
                        </div>
                        <div className='d-flex justify-content-between px-2 my-2 campo_valor' id="campo_7">
                            <label id="identificador_7" htmlFor="valor_7" className='fw-bold' style={{ width: "120px" }}>GLUCOSA</label>
                            <input id="valor_7" type="text" className='form-control border border-secondary' maxLength={50} style={{ width: "200px", height: "30px" }} required />
                            <p id="unidad_7" className='m-0 letra' style={{ width: "50px" }}></p>
                            <p id="referencia_7" className='m-0 letra' style={{ width: "180px" }}></p>
                        </div>
                        <div className='d-flex justify-content-between px-2 my-2 campo_valor' id="campo_8">
                            <label id="identificador_8" htmlFor="valor_8" className='fw-bold' style={{ width: "120px" }}>NITRATOS</label>
                            <input id="valor_8" type="text" className='form-control border border-secondary' maxLength={50} style={{ width: "200px", height: "30px" }} required />
                            <p id="unidad_8" className='m-0 letra' style={{ width: "50px" }}></p>
                            <p id="referencia_8" className='m-0 letra' style={{ width: "180px" }}></p>
                        </div>
                    </div>
                    <div>
                        <h5 className='text-center'>Microscópico</h5>
                        <div className='d-flex justify-content-between px-2 my-2 campo_valor' id="campo_9">
                            <label id="identificador_9" htmlFor="valor_9" className='fw-bold' style={{ width: "120px" }}>BACTERIAS</label>
                            <input id="valor_9" type="text" className='form-control border border-secondary' maxLength={50} style={{ width: "200px", height: "30px" }} required />
                            <p id="unidad_9" className='m-0 letra' style={{ width: "50px" }}></p>
                            <p id="referencia_9" className='m-0 letra' style={{ width: "180px" }}></p>
                        </div>
                        <div className='d-flex justify-content-between px-2 my-2 campo_valor' id="campo_10">
                            <label id="identificador_10" htmlFor="valor_10" className='fw-bold' style={{ width: "120px" }}>LEUCOCITOS</label>
                            <input id="valor_10" type="text" className='form-control border border-secondary' maxLength={50} style={{ width: "200px", height: "30px" }} required />
                            <p id="unidad_10" className='m-0 letra' style={{ width: "50px" }}>Obser./Campo</p>
                            <p id="referencia_10" className='m-0 letra' style={{ width: "180px" }}></p>
                        </div>
                        <div className='d-flex justify-content-between px-2 my-2 campo_valor' id="campo_11">
                            <label id="identificador_11" htmlFor="valor_11" className='fw-bold' style={{ width: "120px" }}>ERITROSITOS</label>
                            <input id="valor_11" type="text" className='form-control border border-secondary' maxLength={50} style={{ width: "200px", height: "30px", }} required />
                            <p id="unidad_11" className='m-0 letra' style={{ width: "50px" }}>Obser./Campo</p>
                            <p id="referencia_11" className='m-0 letra' style={{ width: "180px" }}></p>
                        </div>
                        <div className='d-flex justify-content-between px-2 my-2 campo_valor' id="campo_12">
                            <label id="identificador_12" htmlFor="valor_12" className='fw-bold' style={{ width: "120px" }}>HEMATIES</label>
                            <input id="valor_12" type="text" className='form-control border border-secondary' maxLength={50} style={{ width: "200px", height: "30px" }} />
                            <p id="unidad_12" className='m-0 letra' style={{ width: "50px" }}>Obser./Campo</p>
                            <p id="referencia_12" className='m-0 letra' style={{ width: "180px" }}></p>
                        </div>
                        <div className='d-flex justify-content-between px-2 my-2 campo_valor' id="campo_13">
                            <label id="identificador_13" htmlFor="valor_13" className='fw-bold' style={{ width: "120px" }}>MUCINA</label>
                            <input id="valor_13" type="text" className='form-control border border-secondary' maxLength={50} style={{ width: "200px", height: "30px" }} />
                            <p id="unidad_13" className='m-0 letra' style={{ width: "50px" }}></p>
                            <p id="referencia_13" className='m-0 letra' style={{ width: "180px" }}></p>
                        </div>
                        <div className='d-flex justify-content-between px-2 my-2 campo_valor' id="campo_14">
                            <label id="identificador_14" htmlFor="valor_14" className='fw-bold' style={{ width: "120px" }}>EPIT. PLANAS</label>
                            <input id="valor_14" type="text" className='form-control border border-secondary' maxLength={50} style={{ width: "200px", height: "30px" }} />
                            <p id="unidad_14" className='m-0 letra' style={{ width: "50px" }}>Obser./Campo</p>
                            <p id="referencia_14" className='m-0 letra' style={{ width: "180px" }}></p>
                        </div>
                        <div className='d-flex align-items-center my-2 w-100'>
                            <label htmlFor="observaciones" className='fw-bold fs-4 me-3'>Observaciones</label>
                            <textarea id="observaciones" maxLength={2000} className='form-control border border-secondary' name="" rows="5" required></textarea>
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
            <PDF IdExamen={IdExamen} nombreExamen="Examen De Orina" campos={camposPDF} />
        </main>
    )
}

export default Examen_Orina