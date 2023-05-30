import { useState, useEffect } from 'react'
import { listTipoMuestra } from '../js/Servidor';
import guardar from "../assets/iconos/registro.png"


function Muestra() {

    const [muestras, setMuestra] = useState(null)

    useEffect(() => {
        buscarMuestra()
    }, [])
    
    const buscarMuestra = async () => {
        try {
            const res = await listTipoMuestra();
            const data = await res.json();
            setMuestra(data.tipo_muestra)

        } catch (error) {
            console.log(error);
        }
    }

    const comprobar = () => {

        if (!Boolean(document.querySelector(`#cedula`).value)) {
            const alerta = document.querySelector(`#alertaPacienteExamen`)
            alerta.classList.toggle("show_paciente")
            setTimeout(() => {
                alerta.classList.remove("show_paciente")
            }, 3000);
            return
        }
        const expresion = /([A-Z]{3}\-[0-9]{3})/
        const form = document.querySelector("#Form_Muestra").checkValidity()
        const muestra = Boolean(document.querySelector("#Muestra").value)
        const numero = document.querySelector("#numero").value >= 1 && document.querySelector("#numero").value <= 20
        const lote = document.querySelector("#lote").value

        if (!form || !muestra || !numero || !(expresion.test(lote) || !Boolean(lote))) {
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

    return (
        <>
            <h4 className='fs-3'>Muestra</h4>
            <div className='d-flex flex-wrap justify-content-start justify-content-lg-between'>
                <div className="d-flex mt-3">
                    <label className="fs-5 fw-bold me-3" htmlFor="Muestra ">Tipo de Muestra</label>
                    <select name="Muestra" defaultValue="" className="form-select fs-5 text-center px-1" id="Muestra"
                        style={{ width: "250px" }}>
                        <option className="fs-5 text-center px-1" value="">Muestra</option>
                        {
                            muestras ? ((
                                muestras.map((element) => (
                                    <option key={element.id} className="fs-5 text-center px-1" value={element.id} >{element.nombre}</option>
                                ))
                            )) :
                                (<></>)
                        }
                    </select>
                </div>
                <div className='mt-3 me-sm-3'>
                    <label className="fs-5 fw-bold me-3 " htmlFor="fecha_registro">Fecha Registro  </label>
                    <input id="fecha_registro" className="fs-5 text-center px-1" type="date" style={{ width: "180px" }} aria-label="Disabled input example" required />
                </div>
                <div className='mt-3 me-sm-3'>
                    <label className="fs-5 fw-bold me-3 " htmlFor="fecha_extraccion">Fecha Extracción  </label>
                    <input id="fecha_extraccion" className="fs-5 text-center px-1" type="date" style={{ width: "180px" }} aria-label="Disabled input example" required />
                </div>
            </div>

            <div className='d-flex flex-wrap justify-content-start justify-content-lg-between'>
                <div className="d-flex mt-3 me-2">
                    <label className="fs-5 fw-bold me-3 " htmlFor="lote">Lote Nº</label>
                    <input id="lote" className="fs-5 text-center px-1" type="text" style={{ width: "80px" }} aria-label="Disabled input example" min="0" max="7" />
                </div>
                <div className="d-flex mt-3">
                    <label className="fs-5 fw-bold me-3 " htmlFor="numero">Nº de Muestras</label>
                    <input id="numero" className="fs-5 text-center px-1" type="number" style={{ width: "80px" }} aria-label="Disabled input example" min="1" max="20" required />
                </div>
                <div className="d-flex me-3 form-check d-flex align-items-center">
                    <input className="form-check-input border border-dark" type="radio" name="estado" id="estado1" defaultValue={true} defaultChecked />
                    <label className="form-check-label fs-5 fw-bold ms-3" htmlFor="estado1">
                        Interno
                    </label>
                </div>
                <div className="d-flex me-sm-3 form-check d-flex justify-content-center align-items-center">
                    <input className="form-check-input border border-dark" type="radio" name="estado" id="estado2" defaultValue={false} />
                    <label className="form-check-label fs-5 fw-bold ms-3" htmlFor="estado2">
                        Externo
                    </label>
                </div>
            </div>

            <button onClick={comprobar} type="button" className=" mt-2 mx-auto p-1 fw-bold bMuestra"><img className="me-2" width="60px" height="60px" src={guardar} alt="guardar" />Registrar</button>

        </>
    )
}

export default Muestra