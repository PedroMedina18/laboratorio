import lupa from "../assets/iconos/loupe.png"
import { useContext, useEffect } from "react";
import { AuthContext } from "../context/AuthContext";
import { listExamenMuestra } from "../js/Servidor";

function DatosMuestra() {
    const { valores, initialDates, setValores, list, setList, codificacion, setDatos, datos } = useContext(AuthContext)
    // para eliminar posibles datos precargados
    useEffect(() => {
        setValores(initialDates)
    }, [])

    const buscarExamenMuestra = async () => {
        try {
            const res = await listExamenMuestra();
            const data = await res.json();

            data.examenesSinMuestras.forEach(element => {
                const condigo = codificacion("ORD", element.id_examen)
                element.codigo = condigo
            });
            data.examenesConMuestras.forEach(element => {
                const condigo = codificacion("ORD", element.id_examen)
                element.codigo = condigo
            });
            const listExamenOne=!(data.examenesSinMuestras.length)? null : data.examenesSinMuestras
            const listExamenTwo=!(data.examenesConMuestras.length)? null : data.examenesConMuestras
            setDatos({
                ...datos,
                muestraExamen: listExamenOne
            });
            setList({
                ...list,
                listMuestraOne: listExamenOne,
                listMuestraTwo: listExamenTwo
            })

        } catch (error) {
            console.log(error);
        }
    }

    const desplegar = () => {
        buscarExamenMuestra()
        const show = document.querySelector("#ContainerS_Muestra")
        const container = document.getElementById("Container_Muestra")
        show.classList.toggle("show_paciente")
        container.classList.toggle("show_container")
    }

    return (
        <>
            <h4 className='fs-3'>Paciente</h4>
            <div className='mb-3 d-flex flex-wrap mt-4 mt-xl-0'>
                <div className='ms-0 ms-lg-3 ms-xl-4 ms-xxl-5'>
                    <label className="fs-5 fw-bold me-3" htmlFor="c.i ">C.I</label>
                    <input id="cedula" name="cedula" className="fs-5 text-center px-1" style={{ width: "150px" }} type="number" value={valores.cedula} aria-label="Disabled input example" disabled />
                </div>

                <div className='d-flex ms-0 ms-lg-3 ms-xl-4 ms-xxl-5 mt-4 mt-xl-0'>
                    <label className="fs-5 fw-bold me-3 " htmlFor="nombre">Nombre</label>
                    <input id="nombre" name="nombre" className="fs-5 text-center px-1" type="text" style={{ width: "300px" }} value={valores.nombre} aria-label="Disabled input example" disabled />
                </div>

                <div className='ms-0 ms-lg-3 ms-xl-4 ms-xxl-5 mt-4 mt-xl-0'>
                    <label className="fs-5 fw-bold me-3" htmlFor="edad">Edad</label>
                    <input id="edad" name="edad" className="fs-5  text-center px-1" type="number"
                        style={{ width: "80px" }} value={valores.edad} aria-label="Disabled input example" disabled />
                </div>

            </div>
            <div className='d-flex flex-wrap'>
                <div className="ms-0 ms-lg-3 ms-xl-4 ms-xxl-5 mt-4 mt-xl-0">
                    <label className="fs-5 fw-bold me-3" htmlFor="sexo">Sexo</label>
                    <input id="sexo" name="sexo" className="fs-5  text-center px-1" type="text"
                        style={{ width: "130px" }} value={valores.sexo} aria-label="Disabled input example" disabled />
                </div>


                <div className='d-flex ms-0 ms-lg-3 ms-xl-4 ms-xxl-5 mt-4 mt-xl-0'>
                    <label className="fs-5 fw-bold me-3" htmlFor="correo">Correo</label>
                    <input type="email" id="correo" name="correo" className="fs-5  text-center px-1"
                        style={{ width: "300px" }} value={valores.correo} aria-label="Disabled input example" disabled />
                </div>

                <div className='ms-0 ms-lg-3 ms-xl-4 ms-xxl-5 mt-4 mt-xl-0'>
                    <label className="fs-5 fw-bold me-3" htmlFor="Telefono">Telefono</label>
                    <input id="telefono" name="telefono" className="fs-5 text-center px-1" style={{ width: "160px" }} type="text" value={valores.telefono} aria-label="Disabled input example" disabled />
                </div>
            </div>

            <button onClick={desplegar} type="button" className=' b-registro-muestra fw-bold'><img src={lupa} alt="lupa" width="60px" /> Buscar</button>

            <div className="w-100 hr"></div>

            <h4 className='fs-3 '>Examen</h4>

            <div className=' d-flex flex-wrap' >
                <div className="d-flex mt-2">
                    <label className=" fs-5 fw-bold me-3" htmlFor="Codigo">Codigo</label>
                    <input id="codigo" name="codigo" className="fs-5 text-center px-1" style={{ width: "280px" }} type="text" value={valores.codigo} aria-label="Disabled input example" disabled />
                </div>
                <div className='mt-2 d-flex ms-0 ms-md-3 ms-xl-5'>
                    <label className="fs-5 fw-bold me-3" htmlFor="Examen">Examen</label>
                    <input id="examen" name="examen" className="fs-5 text-center px-1" style={{ width: "280px" }} type="text" value={valores.examen} aria-label="Disabled input example" disabled />
                </div>
                <div className='mt-2 d-flex ms-0 ms-md-3 ms-xl-5'>
                    <label className="fs-5 fw-bold me-3 " htmlFor="fecha_registro">Fecha Registro  </label>
                    <input id="fecha_registro" name="fecha_registro" className="fs-5 text-center px-1" type="date" style={{ width: "180px" }} value={valores.fecha} aria-label="Disabled input example" disabled />
                </div>
            </div>
            <div className="w-100 hr" />
        </>
    )
}

export default DatosMuestra