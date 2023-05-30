import React from 'react'
import lupa from "../assets/iconos/lupa.svg"
import close from "../assets/iconos/close.svg"
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";




function ContenedorBusquedad({ tipo, containerSuperior, containerInferior, Idformulario, Idclose }) {
    const {datos, setDatos, valores, list, setValores, calcularFecha, cargarExamenes, setCargarExamenes,} = useContext(AuthContext)

    const cerrar = (e) => {
        const show = document.querySelector(`#${containerSuperior}`)
        const container = document.querySelector(`#${containerInferior}`)
        const formulario = document.querySelector(`#${Idformulario}`)
        const close = document.querySelector(`#${Idclose}`)
        if (e.target == show || e.target == close) {
            show.classList.toggle("show_paciente")
            container.classList.toggle('show_container')
            formulario.reset()
        }
    }
    // EXISTEN TRES TIPOS DE CONTENEDORES CADA UNO CON CIERTAS CARACTERISTICAS DISTINTAS ESTOS SON PACIENTES, TIPO DE EXAMEN Y EL DE MUESTRAS
    if (tipo == "paciente") {
        const buscarPaciente = (e) => {
            e.preventDefault();
            const Paciente = []
            const Newexpresion = new RegExp(`${e.target.cedula.value}`, `i`)
            list.listPaciente.forEach(paciente => {
                if (Newexpresion.test(paciente.cedula)) {
                    Paciente.push(paciente)
                }
            })
            if (Paciente.length === 0) {
                setDatos({
                    ...datos,
                    pacientes: null
                })
            } else {
                setDatos({
                    ...datos,
                    pacientes: Paciente
                })
            }
        }
    
        const agregarDatosPaciente = (paciente) => {
            try {
    
                const edadPaciente = calcularFecha(paciente.fecha_nacimiento)
                setValores({
                    ...valores,
                    id: `${paciente.id_paciente}`,
                    cedula: `${paciente.cedula}`,
                    nombre: `${paciente.nombres} ${paciente.apellidos}`,
                    edad: `${edadPaciente}`,
                    telefono: `${paciente.telefono}`,
                    sexo: `${paciente.sexo}`,
                    correo: `${paciente.correo_electronico}`
                })
                const show = document.querySelector(`#${containerSuperior}`)
                const container = document.querySelector(`#${containerInferior}`)
                const formulario = document.querySelector(`#${Idformulario}`)
                show.classList.toggle("show_paciente")
                container.classList.toggle('show_container')
                formulario.reset()
            } catch (error) {
                console.log(error);
            }
        }
        return (
            <div className='container_superior' id={containerSuperior} onClick={cerrar}>
                <img className='close' src={close} alt="close" id={Idclose} />
                <div id={containerInferior} className='container_pacientes py-2 px-4  overflow-hidden' >
                    <form id={Idformulario} onSubmit={buscarPaciente} className='d-flex my-0 mx-auto w-80 ' style={{ height: "35px" }}>
                        <input type="number" className='mx-3 border-0 w-80 buscador rounded-pill px-3' placeholder='Cedula del paciente' name="Cedula" id="cedula" required />
                        <button type="submit" className='border-0 rounded-pill  btn btn btn-sm btn-light' style={{ width: "80px" }}><img src={lupa} alt="buscar" /></button>
                    </form>
                    <div className='w-100 bg-white rounded mt-3 h-80 overflow-x-auto' >
                        {
                            datos.pacientes ? (
                                datos.pacientes.map((paciente) =>
                                    <div onClickCapture={() => { agregarDatosPaciente(paciente) }} key={paciente.id_paciente} id={paciente.cedula} className='w-100 border-top border-secondary-subtle px-3 d-flex justify-content-around align-items-center links cursor pacientes'>
                                        <p className='fw-bold w-25 text-center' style={{ fontSize: "19px" }}>{paciente.cedula}</p>
                                        <p className='fw-bold w-75 text-center' style={{ fontSize: "19px" }}>{`${paciente.nombres} ${paciente.apellidos}`}</p>
                                    </div>
                                )
                            ) : (
                                <h3 className='text-center mt-5'>Paciente no Existe</h3>
                            )
                        }
                    </div>
                </div>
            </div>
        )
    }

    if (tipo == "examen") {
        const buscarExamen = (e) => {
            e.preventDefault();
    
            const expresion = /(EXM)?(\-?(\d{3})){1,2}(\-?(\d{1,5}))(E|O)?$/
    
            const tipo_examenes = []
            if (expresion.test(e.target.Examen.value)) {
                const nombre = e.target.Examen.value.replaceAll(` `, `.`)
                const Newexpresion = new RegExp(`${nombre}`, `i`)
                list.listExamen.forEach(examen => {
                    if (Newexpresion.test(examen.id)) {
                        tipo_examenes.push(examen)
                    }
                })
                if (tipo_examenes.length === 0) {
                    setDatos({
                        ...datos,
                        tipoExamen: null
                    })
                } else {
                    setDatos({
                        ...datos,
                        tipoExamen: tipo_examenes
                    })
                }
            } else {
                const nombre = e.target.Examen.value.replaceAll(` `, `.`)
                const Newexpresion = new RegExp(`${nombre}`, `i`)
                list.listExamen.forEach(examen => {
                    if (Newexpresion.test(examen.nombre)) {
                        tipo_examenes.push(examen)
                    }
                })
                if (tipo_examenes.length === 0) {
                    setDatos({
                        ...datos,
                        tipoExamen: null
                    })
                } else {
                    setDatos({
                        ...datos,
                        tipoExamen: tipo_examenes
                    })
                }
            }
        }

        const agregarExamen = (examen) => {
            const array = cargarExamenes.examenes
            const indice = array.length
            // TODO LO DE ABAJO ES PARA CONSEGUIR LA FECHA DE HOY
            const fechaActual = new Date()
            const añoActual = parseInt(fechaActual.getFullYear())
            let mesActual = parseInt(fechaActual.getMonth()) + 1
            let diaActual = parseInt(fechaActual.getDate())
            if (mesActual <= 9) {
                mesActual = `0${mesActual}`
            }
            if (diaActual <= 9) {
                diaActual = `0${diaActual}`
            }
            const fecha = `${añoActual}-${mesActual}-${diaActual}`
    
            array.push({
                id: indice + 1,
                codigo: examen.id,
                nombre: examen.nombre,
                fecha: fecha,
                estado: "Incompleto",
                description: examen.description
            })
            let numero = cargarExamenes.cantidad - 1
            if (numero === 0) {
                numero = 0
            }
            setCargarExamenes({
                ...cargarExamenes,
                examenes: array,
                cantidad: numero
            })
            const show = document.querySelector(`#${containerSuperior}`)
            const container = document.querySelector(`#${containerInferior}`)
            const formulario = document.querySelector(`#${Idformulario}`)
            show.classList.toggle("show_paciente")
            container.classList.toggle('show_container')
            formulario.reset()
        }
        return (
            <div className='container_superior' id={containerSuperior} onClick={cerrar}>
                <img className='close' src={close} alt="close" id={Idclose} />
                <div id={containerInferior} className='container_pacientes py-2 px-4 overflow-hidden' >
                    <form id={Idformulario} onSubmit={buscarExamen} className='d-flex my-0 mx-auto w-80 ' style={{ height: "35px" }}>
                        <input type="text" className='mx-3 border-0 w-80 buscador rounded-pill px-3' placeholder='Nombre del Examen' name="Examen" id="examen" required />
                        <button type="submit" className='border-0 rounded-pill  btn btn btn-sm btn-light' style={{ width: "80px" }}><img src={lupa} alt="buscar" /></button>
                    </form>
                    <div className='w-100 bg-white rounded mt-3 h-80 overflow-x-auto' >
                        {
                            datos.tipoExamen ? (
                                datos.tipoExamen.map((examen) =>

                                    <div onClickCapture={() => { agregarExamen(examen) }} key={examen.id} id={examen.id} className='w-100 border-top border-secondary-subtle px-3 d-flex justify-content-around align-items-center links cursor pacientes'>
                                        <p className='fw-bold w-50 text-center' style={{ fontSize: "19px" }}>{examen.id}</p>
                                        <p className='fw-bold w-75 text-center' style={{ fontSize: "19px" }}>{examen.nombre}</p>
                                    </div>
                                )
                            ) : (
                                <h3 className='text-center mt-5'>Examen no Encontrado</h3>
                            )
                        }
                    </div>
                </div>
            </div>
        )
    }

    if (tipo == "muestra") {
        const agregarDatosMuestra = (examen) => {
            try {
    
                const edadPaciente = calcularFecha(examen.fecha_nacimiento)
                setValores({
                    ...valores,
                    id: `${examen.id_paciente}`,
                    cedula: `${examen.cedula}`,
                    nombre: `${examen.nombres} ${examen.apellidos}`,
                    edad: `${edadPaciente}`,
                    telefono: `${examen.telefono}`,
                    sexo: `${examen.sexo}`,
                    correo: `${examen.correo_electronico}`,
                    codigo: `${examen.codigo}`,
                    examen: `${examen.nombre_Examen}`,
                    fecha: `${examen.fecha_registro.slice(0, 10)}`
                })
                const show = document.querySelector(`#${containerSuperior}`)
                const container = document.querySelector(`#${containerInferior}`)
                const formulario = document.querySelector(`#${Idformulario}`)
                show.classList.toggle("show_paciente")
                container.classList.toggle('show_container')
                formulario.reset()
            } catch (error) {
                console.log(error);
            }
        }
    
        const buscarMuestra = (e) => {
            e.preventDefault();
            const examenMuestra = []
            let lista
            if (e.target.value === "true") {
                lista = list.listMuestraTwo
            } else {
                lista = list.listMuestraOne
            }
            const Newexpresion = new RegExp(`${e.target.examen.value}`, `i`)
            lista.forEach(examen => {
                if (Newexpresion.test(examen.paciente.cedula)) {
                    examenMuestra.push(examen)
                }
            })
            if (examenMuestra.length === 0) {
                setDatos({
                    ...datos,
                    muestraExamen: null
                })
            } else {
                setDatos({
                    ...datos,
                    muestraExamen: examenMuestra
                })
            }
    
        }
        const cambiar = (e) => {
            if (e.target.value === "true") {
                setDatos({
                    ...datos,
                    muestraExamen: list.listMuestraTwo
                })
            } else {
                setDatos({
                    ...datos,
                    muestraExamen: list.listMuestraOne
                })
            }
        }
        return (
            <div className='container_superior' id={containerSuperior} onClick={cerrar}>
                <img className='close' src={close} alt="close" id={Idclose} />
                <div id={containerInferior} className='w-90 container_pacientes py-2 px-4 overflow-hidden ' >
                    <form id={Idformulario} onSubmit={buscarMuestra} className='d-flex my-0 mx-auto w-100 ' style={{ height: "35px" }}>
                        <select defaultValue="" name="estado" id="estado" onChange={cambiar} className="form-select rounded-pill w-25" aria-label="Default select example">
                            <option value={false} >No Asignado</option>
                            <option value={true} >Asignado</option>
                        </select>
                        <input type="number" className='mx-3 border-0 w-80 buscador rounded-pill px-3' placeholder='Cedula del Paciente' name="examen" id="examen" required />
                        <button type="submit" className='border-0 rounded-pill  btn btn btn-sm btn-light' style={{ width: "80px" }}><img src={lupa} alt="buscar" /></button>
                    </form>
                    <div className='w-100 bg-white rounded mt-3 h-80 overflow-x-auto' >
                        {
                            datos.muestraExamen ? (
                                datos.muestraExamen.map((examen) =>

                                    <div onClickCapture={() => { agregarDatosMuestra(examen) }} key={examen.id_examen} id={examen.id_examen} className=' border-top border-secondary-subtle px-3 d-flex justify-content-around align-items-center links cursor pacientes' style={{width:"1000px"}}>
                                        <p className='fw-bold w-50 text-center' style={{ fontSize: "18px" }}>{examen.codigo}</p>
                                        <p className='fw-bold w-50 text-center' style={{ fontSize: "18px" }}>{examen.fecha_registro.slice(0, 10)}</p>
                                        <p className='fw-bold w-50 text-center' style={{ fontSize: "18px" }}>{examen.nombre_Examen}</p>
                                        <p className='fw-bold w-50 text-center' style={{ fontSize: "18px" }}>{examen.cedula}</p>
                                        <p className='fw-bold w-75 text-center' style={{ fontSize: "18px" }}>{`${examen.nombres} ${examen.apellidos}`}</p>
                                    </div>
                                )
                            ) : (
                                <h3 className='text-center mt-5'>Examen no Encontrado</h3>
                            )
                        }
                    </div>
                </div>
            </div>
        )
    }
}

export default ContenedorBusquedad