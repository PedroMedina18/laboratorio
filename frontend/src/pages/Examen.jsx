import Menu from '../components/Menu'
import User from '../components/User'
import Reloj from "../components/Reloj";
import guardar from "../assets/iconos/registro.png"
import x from "../assets/iconos/x.svg";
import chequeado from "../assets/iconos/chequeado.svg";
import close from "../assets/iconos/close.png"
import { useState, useEffect, useContext } from 'react'
import { useParams, useNavigate } from "react-router-dom";
import { getExamen, delateExamen } from '../js/Servidor';
import { AuthContext } from "../context/AuthContext"

function Examen() {
    const { calcularFecha, codificacion, descodificacion } = useContext(AuthContext)
    const [DatosExamen, setDatosExamen] = useState({
        Nombre_Paciente: "", CI: "",
        Correo: "", Edad: "", Fecha_Nacimiento: "",
        Sexo: "", Telefono: "", Direccion: "", Orden: "",
        Paciente: "", Fecha_Registro: "", Encargado: "",
        Fecha_Finalización: "", Examen: "", Codigo: "",
        Estado: "", Medico: ""
    })
    const [listMuestras, setMuestras] = useState([])
    const [listResultados, setResultados] = useState([])
    const params = useParams();
    const navigate = useNavigate();
    useEffect(() => {
        if (params.id) {
            const id_examen = parseInt(params.id)
            if (isNaN(id_examen)) {
                navigate("/Inicio")
            } else {
                buscarExamen(params.id)
            }
        } else {
            navigate("/Inicio")
        }
    }, [])


    const buscarExamen = async (id) => {
        try {
            const res = await getExamen(id);
            const data = await res.json();
            if (data.Examen == null) {
                navigate("/Inicio")
                console.log(data.message)
            } else {
                setDatosExamen({
                    ...DatosExamen,
                    Nombre_Paciente: `${data.Examen.nombres} ${data.Examen.apellidos}`,
                    CI: `${data.Examen.cedula}`,
                    Correo: `${data.Examen.correo_electronico}`,
                    Edad: calcularFecha(data.Examen.fecha_nacimiento),
                    Fecha_Nacimiento: `${data.Examen.fecha_nacimiento}`,
                    Sexo: `${data.Examen.sexo}`,
                    Telefono: `${data.Examen.telefono}`,
                    Direccion: `${data.Examen.direccion}`,
                    Orden: codificacion("ORD", data.Examen.id_examen),
                    Paciente: codificacion("PAC", data.Examen.id_paciente),
                    Fecha_Registro: `${data.Examen.fecha_registro_examen.slice(0, 10)}`,
                    Encargado: `${data.Examen.encargado}`,
                    Fecha_Finalización: data.Examen.fecha_finalizacion ? `${data.Examen.fecha_finalizacion.slice(0, 10)}` : '-',
                    Examen: `${data.Examen.nombre}`,
                    Codigo: codificacion("EXM", data.Examen.id_tipo_examen),
                    Estado: `${data.Examen.estado}`,
                    Medico: data.Examen.medico ? `${data.Examen.medico}` : '-'
                })
                setMuestras(data.Muestras)
                setResultados(data.Resultados)
            }
        } catch (error) {
            console.log(error)
        }
    }
    const eliminar= async(id)=>{
        const idExamen=descodificacion(id)
        try{
            const res = await delateExamen(idExamen);
            const data = await res.json();
            console.log(data)
            navigate("/Consulta")
        }catch (error){
            console.log(error)
        }
    }

    return (
        <main className='fondo_20 min-vh-100 d-flex flex-column align-items-center'>
            <section className="d-flex justify-content-between w-100">
                <Menu />
                <User grande={false} />
            </section>
            <section className=" py-3 px-3 w-95 rounded mt-1 bg-white">
                <div className='d-flex flex-column flex-lg-row w-100 justify-content-around w-100' >
                    <div className="aceptar">
                        <p className='m-0 letra_2'><b className='me-1'>Nombre:</b> {DatosExamen.Nombre_Paciente}</p>
                        <p className='m-0 letra_2'><b className='me-1'>C.I:</b>  {DatosExamen.CI}</p>
                        <p className='m-0 letra_2'><b className='me-1'>Correo Electronico:</b> {DatosExamen.Correo}</p>
                        <p className='m-0 letra_2'><b className='me-1'>Edad:</b>{DatosExamen.Edad}</p>
                        <p className='m-0 letra_2'><b className='me-1'>Fecha de Nacimiento:</b>{DatosExamen.Fecha_Nacimiento}</p>
                        <p className='m-0 letra_2'><b className='me-1'>Sexo:</b>{DatosExamen.Sexo}</p>
                        <p className='m-0 letra_2'><b className='me-1'>Telefono:</b>{DatosExamen.Telefono}</p>
                        <p className='m-0 letra_2'><b className='me-1'>Dirección:</b>{DatosExamen.Direccion}</p>
                    </div>
                    <div className="aceptar">
                        <p className='m-0 letra_2'><b className='me-1'>Orden:</b>{DatosExamen.Orden}</p>
                        <p className='m-0 letra_2'><b className='me-1'>Paciente:</b>{DatosExamen.Paciente}</p>
                        <p className='m-0 letra_2'><b className='me-1'>Fecha de Registro:</b>{DatosExamen.Fecha_Registro}</p>
                        <p className='m-0 letra_2'><b className='me-1'>Encargado:</b>{DatosExamen.Encargado}</p>
                        <p className='m-0 letra_2'><b className='me-1'>Fecha de Finalización:</b>{DatosExamen.Fecha_Finalización}</p>
                        <p className='m-0 letra_2'><b className='me-1'>Examen:</b>{DatosExamen.Examen}</p>
                        <p className='m-0 letra_2'><b className='me-1'>Estado:</b>{DatosExamen.Estado==true ? (<><img className="cursor" width="50px" height="30px" src={chequeado} alt="completado" /><span className='m-0 letra_2'>Completado</span></>) : (<><img className="cursor" width="50px" height="30px" src={x} alt="incompleto" /><span className='m-0 letra_2'>Incompleto</span></>)}</p>
                        <p className='m-0 letra_2'><b className='me-1'>Medico:</b> {DatosExamen.Medico} </p>
                    </div>
                </div>
                <div className='hr'></div>
                <h3 className='text-center'>Muestras Asignadas</h3>
                <div className='d-flex flex-wrap w-100 px-5'>
                    {
                        Boolean(listMuestras.length) ? (
                            listMuestras.map((muestra) =>
                                <div key={muestra.id}>
                                    <p className='m-0 letra_2'><b className='me-1'>Tipo de Muestra:</b>{muestra.nombre}</p>
                                    <p className='m-0 letra_2'><b className='me-1'>Fecha de Registro:</b>{muestra.fecha_registro.slice(0, 10)}</p>
                                    <p className='m-0 letra_2'><b className='me-1'>Fecha de Extracción:</b>{muestra.fecha_extraccion.slice(0, 10)}</p>
                                    <p className='m-0 letra_2'><b className='me-1'>Número:</b>{muestra.numero}</p>
                                    <p className='m-0 letra_2'><b className='me-1'>Lote:</b>{muestra.lote ? muestra.lote : "-"}</p>
                                    <p className='m-0 letra_2'><b className='me-1'>Interna:</b>{Boolean(muestra.interno) ? "Si" : "No"}</p>
                                </div>
                            )
                        ) : (
                            <div className='w-100 my-5'>
                                <h4 className='text-center'>------ No Hay Muestras Asignadas ------</h4>
                            </div>
                        )
                    }

                </div>
                <h3 className='text-center'>Resultados</h3>

                <div className='w-100 d-flex flex-wrap p-2 justify-content-center'>
                    {
                        Boolean(listResultados.length) ? (
                            listResultados.map((resultado, index) =>
                                <div className="mx-2 card p-3 bg-body-tertiary text-center" key={index} >
                                    <p className='m-0 letra_2'><b className='me-1'>Nombre:</b>{resultado.nombre}</p>
                                    <p className='m-0 letra_2'><b className='me-1'>Fecha de Registro:</b>{resultado.fecha_registro.slice(0, 10)}</p>
                                    <a className="btn btn-info mt-2 fw-bold" href={`http://127.0.0.1:8000/media/${resultado.archivo}`} download="documento" target="_blank" >Visualizar</a>
                                </div>
                            )
                        ) : (
                            <div className='py-3'>
                                <h4 className='text-center'>- - - - No existen - - - -</h4>
                            </div>
                        )
                    }
                </div>
                {
                    (DatosExamen.Estado == false && !Boolean(listMuestras.length)) ? (
                        <div className='d-flex'>
                            <button onClick={()=>eliminar(DatosExamen.Orden)} type='button' className="mx-auto py-1 px-4 fw-bold bEliminar">
                                <img
                                    className="me-2"
                                    width="40px"
                                    height="40px"
                                    src={close}
                                    alt="guardar"
                                />
                                Eliminar Examen
                            </button>

                        </div>
                    ) : (<></>)
                }

            </section>
            <section className="align-self-start mt-auto justify-self-end">
                <Reloj grande={false} />
            </section>

        </main>
    )
}

export default Examen