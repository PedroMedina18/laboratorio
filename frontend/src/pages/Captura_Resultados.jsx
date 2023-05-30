import Menu from '../components/Menu'
import User from '../components/User'
import Reloj from "../components/Reloj";
import lupa from "../assets/iconos/lupa.svg"
import flecha_izquierda from "../assets/iconos/flecha_left.svg"
import flecha_derecha from "../assets/iconos/flecha_right.svg"
import todas_active from "../assets/iconos/todas_active.svg"
import Link_Examen from '../components/Link_Examen'
import { useState, useEffect, useContext } from 'react'
import { AuthContext } from "../context/AuthContext"
import { useParams, useNavigate } from "react-router-dom";
import { listExamenesIncompletos, listTipoExamen_Cargo } from '../js/Servidor';
import Alert from "../components/Alert";


function Captura_Resultados() {
    const { user, setInformacion } = useContext(AuthContext)
    const [Tipoexamenes, setTipo_Examenes] = useState(null)
    const [examenes, setExamenes] = useState({ listExamenes: null, total: null, IndiceInical: 0, IndiceFinal: 0, indice: 0, paciente: 0 })
    const params = useParams();
    const navigate = useNavigate();
    useEffect(() => {
        setInformacion(
            {
              estado: null,
              muestra_tipo: null,
              muestras: null,
              nombre_examen: null,
              id_tipo: null
            })
        activacion()

    }, [])

    const activacion = () => {
        if (params.cedula) {
            const cedula = parseInt(params.cedula)
            if (isNaN(id_examen)) {
                buscarTipo_Examen()
                buscarExamen()
                // desplegarAlerta()
            } else {
                buscarTipo_Examen()
                buscarExamen(cedula)
                // desplegarAlerta()
            }
        } else {
            buscarTipo_Examen()
            buscarExamen()
            // desplegarAlerta()
        }
    }
    // const desplegarAlerta=()=>{
    //     if (errores.ErrorCaptura) {
    //         const alerta = document.querySelector(`#alertaCapture`)
    //         alerta.classList.toggle("show_paciente")
    //         setTimeout(() => {
    //             alerta.classList.remove("show_paciente")
    //         }, 3000);
    //         return
    //     }
    // }
    const buscarTipo_Examen = async () => {
        try {
            const res = await listTipoExamen_Cargo(parseInt(user.usuario.id_cargo));
            const data = await res.json();
            setTipo_Examenes(data.tipo_examen)
        } catch (error) {
            console.log(error);
        }
    }

    // funcion para la bususque de los examenes carga inicial
    const buscarExamen = async (paciente = 0) => {
        try {
            const res = await listExamenesIncompletos({ cargo: parseInt(user.usuario.id_cargo), indice: 1, paciente: paciente });
            const data = await res.json();
            setExamenes({
                ...examenes,
                listExamenes: data.Examenes,
                total: data.Total,
                IndiceInical: data.Total === 0 ? 0 : 1,
                IndiceFinal: data.Total < 50 ? data.Total : 50,
                indice: 1,
                paciente: paciente
            })
        } catch (error) {
            console.log(error);
        }

    }

    // funion para el cambio de datos como fecha o tipo de examen
    const cambiarDate = async () => {
        const tipo = parseInt(document.querySelector("#Examen").value)
        const fechaInicio = Boolean(document.querySelector("#Desde").value) ? document.querySelector("#Desde").value : null
        const fechaFin = Boolean(document.querySelector("#Hasta").value) ? document.querySelector("#Hasta").value : null
        const cedulaPaciente = examenes.paciente
        try {
            const res = await listExamenesIncompletos({ categoria: tipo, cargo: parseInt(user.usuario.id_cargo), fecha_incial: fechaInicio, fecha_final: fechaFin, paciente: cedulaPaciente });
            const data = await res.json();
            setExamenes({
                ...examenes,
                listExamenes: data.Examenes,
                total: data.Total,
                IndiceInical: data.Total === 0 ? 0 : 1,
                IndiceFinal: data.Total < 50 ? data.Total : 50,
                indice: 1
            })
        } catch (error) {
            console.log(error);
        }
    }

    // funion encargada de avanzar
    const avanzar = async () => {
        const maximo = parseInt(examenes.total)
        const limite = parseInt(examenes.IndiceFinal)
        const actual = parseInt(examenes.indice)
        if (limite < maximo) {
            console.log("funciona")
            const tipo = parseInt(document.querySelector("#Examen").value)
            const fechaInicio = document.querySelector("#Desde").value ? document.querySelector("#Desde").value : null
            const fechaFin = document.querySelector("#Hasta").value ? document.querySelector("#Hasta").value : null
            const indice = actual + 1
            const cedulaPaciente = examenes.paciente
            try {
                const res = await listExamenesIncompletos({ categoria: tipo, cargo: parseInt(user.usuario.id_cargo), fecha_incial: fechaInicio, fecha_final: fechaFin, indice: indice, paciente: cedulaPaciente });
                const data = await res.json();
                setExamenes({
                    ...examenes,
                    listExamenes: data.Examenes,
                    total: data.Total,
                    IndiceInical: actual * 50,
                    IndiceFinal: data.Total < (indice * 50) ? data.Total : indice * 50,
                    indice: indice,
                    paciente: cedulaPaciente
                })
            } catch (error) {
                console.log(error);
            }
        }
    }

    // funion encargada de retroceder
    const retroceder = async () => {
        const actual = parseInt(examenes.indice)
        if (actual > 1) {
            console.log("funciona")
            const tipo = parseInt(document.querySelector("#Examen").value)
            const fechaInicio = document.querySelector("#Desde").value ? document.querySelector("#Desde").value : null
            const fechaFin = document.querySelector("#Hasta").value ? document.querySelector("#Hasta").value : null
            const indice = actual - 1
            const cedulaPaciente = examenes.paciente
            try {
                const res = await listExamenesIncompletos({ categoria: tipo, cargo: parseInt(user.usuario.id_cargo), fecha_incial: fechaInicio, fecha_final: fechaFin, indice: indice, paciente: cedulaPaciente });
                const data = await res.json();
                setExamenes({
                    ...examenes,
                    listExamenes: data.Examenes,
                    total: data.Total,
                    IndiceInical: ((indice - 1) * 50) === 0 ? 1 : ((indice - 1) * 50),
                    IndiceFinal: data.Total < (indice * 50) ? data.Total : (indice * 50),
                    indice: indice,
                    paciente: cedulaPaciente
                })
            } catch (error) {
                console.log(error);
            }
        }

    }

    // funion encargada de buscar por la cedula del paciente
    const buscarPaciente = (e) => {
        e.preventDefault()
        // Proceso Necesrio para volver las condicionales a su valor original
        const fechaInicio = document.querySelector("#Desde")
        const fechaFin = document.querySelector("#Hasta")
        fechaInicio.value = null
        fechaFin.value = null
        const tipo_examen = document.querySelector("#Examen")
        tipo_examen.value = 0

        // ejecucion de la busquedad
        if (Boolean(e.target.Cedula.value)) {
            navigate(`/Captura_Resultados/${e.target.Cedula.value}`)
            buscarExamen(e.target.Cedula.value)
        } else {
            navigate(`/Captura_Resultados`)
            buscarExamen()
        }
    }




    return (
        <main className="fondo_20 min-vh-100 d-flex flex-column align-items-center">
            <section className="d-flex justify-content-between w-100">
                <Menu />
                <User grande={false} />
            </section>
            <section className='w-95 d-flex flex-column  vh-85 bg-white p-3 rounded mt-2'>
                
                <Alert messageErrorm="Examen sin Muestra asignada no se puede Completar" id="alertaCapture" />
               
                <div className="w-100 d-flex">
                    <form onSubmit={buscarPaciente} className='d-flex my-0 mx-auto buscadorPaciente border border-secondary-subtle rounded-pill' style={{ height: "35px" }}>
                        <input type="number" placeholder='Cedula del Paciente' className='mx-3 border-0 w-80 buscador' id='Cedula' name='Cedula' min={1} />
                        <button type="submit" className='w-20 border-0 rounded-pill bg-secondary-subtle '><img src={lupa} alt="buscar" /></button>
                    </form>
                    <div className='d-flex fs-6 align-items-center px-0'>
                        <p className='m-0 mx-1 letra'>{`${examenes.IndiceInical}-${examenes.IndiceFinal} de ${examenes.total == null ? 0 : examenes.total}`}</p>
                        <p onClick={retroceder} className='m-0 mx-1 cursor'><img src={flecha_izquierda} alt="flecha" /></p>
                        <p onClick={avanzar} className='m-0 mx-1 cursor'><img src={flecha_derecha} alt="flecha" /></p>
                    </div>
                </div>
                <div className='d-flex w-100 flex-wrap justify-content-center justify-content-xl-between align-items-center mt-2'>
                    <p className='cursor m-0 me-5 me-xl-0 py-2 px-5 letra border-bottom border-primary border-4 text-primary' style={{ width: "220px" }} ><img className='me-2' width="25px" src={todas_active} />Todos</p>
                    <select onChange={cambiarDate} name="Examen" defaultValue="0" className=" px-1 mt-3 mt-md-0  form-select fs-6 " id="Examen" style={{ height: "38px", width: "250px" }}>
                        <option value="0">Tipo de Examen</option>
                        {
                            Tipoexamenes ? ((
                                Tipoexamenes.map((element) => (
                                    <option key={element.id} value={element.id} >{element.nombre}</option>
                                ))
                            )) :
                                (<></>)
                        }
                    </select>
                    <div className='d-flex px-3 align-items-center mt-3 mt-lg-0 buscardorFecha'>
                        <label htmlFor='Desde' className='m-0 mx-2 letra'>Desde</label>
                        <input className='form-control' id='Desde' name='Desde' onChange={cambiarDate} type="date" style={{ height: "35px" }} />
                        <label htmlFor='Hasta' className='m-0 mx-2 letra'>Hasta</label>
                        <input className='form-control' id='Hasta' name='Hasta' onChange={cambiarDate} type="date" style={{ height: "35px" }} />
                    </div>
                </div>
                <div className='bg-body-secondary w-100 mt-3 overflow-auto d-flex flex-column' style={{ height: "420px" }}>
                    {
                        examenes.listExamenes ? ((
                            examenes.listExamenes.map((element) => (
                                <Link_Examen key={element.id} defect={false} informacion={element} direccion={element.id} />
                            ))
                        )) :
                            (<h2 className='text-center mt-5'>Examen no Encontrado</h2>)
                    }
                </div>
            </section>
            <section className="align-self-start mt-auto justify-self-end">
                <Reloj grande={false} />
            </section>
        </main>
    )
}

export default Captura_Resultados