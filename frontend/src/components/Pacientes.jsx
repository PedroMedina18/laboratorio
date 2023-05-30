import React from 'react'
import lupa from "../assets/iconos/loupe.png";
import { useContext, useEffect } from "react";
import { AuthContext } from "../context/AuthContext";
import { listPacientes } from '../js/Servidor';


// COMPONENTE EN DONDE SE CARAGN TODOS LOS DATOS DEL PACIENTE EN LA SECCION DE ESGISTRO DE EXAMENES
export default function Pacientes() {
    const { valores, setDatos, datos, initialDates, setValores, list, setList } = useContext(AuthContext)

    useEffect(() => {
        setValores(initialDates)
    }, [])

    const buscarPacientes = async () => {
        try {
            const res = await listPacientes();
            const data = await res.json();
            setDatos({
                ...datos,
                pacientes: data.paciente
            });
            setList({
                ...list,
                listPaciente: data.paciente
            })

        } catch (error) {
            console.log(error);
        }
    }

    // FUNCION ENCARGADA DE DESPLEGAR EL CONTENDOR PARA LA BUSQUEDAD DEL PACIENTE
    const desplegar = () => {
        buscarPacientes()
        const show = document.querySelector("#ContainerS_Paciente")
        const container = document.getElementById("Container_Paciente")
        show.classList.toggle("show_paciente")
        container.classList.toggle("show_container")
    }

    return (
        <section className="d-flex flex-column align-items-center bg-white  p-3 w-95">
            <h4 className="mx-auto fs-2 text-dark fw-semibold mb-1">Paciente</h4>

            <input
                id="paciente"
                name="paciente"
                className="d-none"
                type="number"
                value={valores.id}
                aria-label="Disabled input example"
                disabled
                required
            />

            <div className="d-flex mb-0 mb-lg-5 w-100 align-items-center position-relative ">
                <div className='d-flex flex-wrap flex-column flex-md-row justify-content-start align-items-center w-80 mt-3 mt-lg-2'>
                    <div className="d-flex  justify-content-start justify-content-lg-center align-items-center mt-3 mt-lg-2 mt-md-0 me-md-3 ajustador ">
                        <label className="fs-5 fw-bold me-2" htmlFor="cedula ">
                            C.I
                        </label>
                        <input
                            id="cedula"
                            name="cedula"
                            className="fs-5 px-2 text-center"
                            type="number"
                            value={valores.cedula}
                            aria-label="Disabled input example"
                            disabled
                            required
                            style={{minWidth:"100px"}}
                        />
                    </div>
                    <div className="d-flex justify-content-start justify-content-lg-center align-items-center mt-3 mt-lg-2 me-md-3 mt-md-0 ajustador ">
                        <label className="fs-5 fw-bold me-2" htmlFor="nombre">
                            Nombre
                        </label>
                        <input
                            id="nombre"
                            name="nombre"
                            className="fs-5 px-2 text-center"
                            type="text"
                            value={valores.nombre}
                            aria-label="Disabled input example"
                            style={{width:"350px"}}
                            disabled
                            required
                        />
                    </div>
                    <div className="d-flex justify-content-start justify-content-lg-center align-items-center mt-3 mt-lg-2  mt-md-0 ajustador ">
                        <label className="fs-5 fw-bold me-2" htmlFor="edad">
                            Edad
                        </label>
                        <input
                            id="edad"
                            name="edad"
                            className="fs-5 px-2 text-center"
                            type="number"
                            style={{width:"80px"}}
                            value={valores.edad}
                            aria-label="Disabled input example"
                            disabled
                            required
                        />
                    </div>
                </div>

                <button onClick={desplegar} type="button" className=" fw-bold p-1 d-flex align-items-center justify-content-center bbuscar  position-absolute top-0 end-0" >
                    <img width="50px" height="50px" src={lupa} alt="Buscar" />
                   <span className='d-none d-lg-flex'>Buscar Paciente</span>
                </button>

            </div>

            <div className="d-flex flex-wrap justify-content-between w-100  ">
                <div className="  d-flex  justify-content-start justify-content-lg-center mt-3 mt-lg-2 mt-md-0 align-items-center ajustador">
                    <label className="fs-5 fw-bold me-2" htmlFor="telefono">
                        Telefono
                    </label>
                    <input
                        id="telefono"
                        name="telefono"
                        className="fs-5 w-60 px-2 text-center"
                        type="text"
                        value={valores.telefono}
                        aria-label="Disabled input example"
                        disabled />

                </div>

                <div className=" d-flex justify-content-start justify-content-lg-center mt-3 mt-lg-2 mt-md-0 ajustador">
                    <label className="fs-5 fw-bold me-2" htmlFor="sexo">
                        Sexo
                    </label>
                    <input
                        id="sexo"
                        name="sexo"
                        className="fs-5 px-2 text-center"
                        type="text"
                        value={valores.sexo}
                        style={{minWidth:"100px"}}
                        aria-label="Disabled input example"
                        disabled
                        required
                    />
                </div>

                <div className=" d-flex justify-content-start justify-content-md-center mt-3 mt-lg-2 mt-md-0 ajustador">
                    <label className="fs-5 fw-bold me-2" htmlFor="correo">
                        Correo
                    </label>
                    <input
                        type="email"
                        id="correo"
                        name="correo"
                        className="fs-5 px-2 text-center "
                        value={valores.correo}
                        style={{width:"300px"}}
                        aria-label="Disabled input example"
                        disabled
                        required
                    />
                </div>
            </div>
        </section>
    )
}
