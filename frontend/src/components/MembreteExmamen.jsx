import React from 'react'
import { useState, useEffect, useContext } from 'react'
import { getExamen } from '../js/Servidor';
import { AuthContext } from "../context/AuthContext"

function MembreteExmamen({ IdExamen, hoy = false }) {
  const { calcularFecha, codificacion, user } = useContext(AuthContext)
  const [datos, setDatos] = useState({
    Nombre: "",
    CI: "",
    Edad: "",
    Sexo: "",
    Orden: "",
    Examen: "",
    ExamenNombre: "",
    Paciente: "",
    Fecha_Registro: "",
    Medico: "",
    fecha_actual: ""
  })
  useEffect(() => {
    buscarExamen(IdExamen)
  }, [])

  const buscarExamen = async (id) => {
    try {
      const res = await getExamen(id);
      const data = await res.json();
      if (data.Examen == null) {
      } else {
        const fecha = new Date();
        const dia = fecha.getDate();
        let mes = parseInt(fecha.getMonth()) + 1;
        const año = fecha.getFullYear();
        if (mes < 10) {
          mes = `0${mes}`
        }

        setDatos({
          ...datos,
          Nombre: `${data.Examen.nombres} ${data.Examen.apellidos}`,
          CI: `${data.Examen.cedula}`,
          Edad: calcularFecha(data.Examen.fecha_nacimiento),
          Sexo: `${data.Examen.sexo}`,
          Orden: codificacion("ORD", data.Examen.id_examen),
          Paciente: codificacion("PAC", data.Examen.id_paciente),
          Fecha_Registro: `${data.Examen.fecha_registro_examen.slice(0, 10)}`,
          Examen: codificacion("EXM", data.Examen.id_tipo_examen),
          ExamenNombre: `${data.Examen.nombre}`,
          Medico: `${user.usuario.nombres} ${user.usuario.apellidos} | ${user.usuario.cargo}`,
          fecha_actual: `${año}-${mes}-${dia}`
        })
      }
    } catch (error) {
      console.log(error)
    }
  }

  if (!hoy) {
    return (
      <>
        <div className='d-flex w-100 justify-content-around'>
          <div>
            <p className='m-0 letra_2'><b className='me-1'>Paciente:</b>{datos.Paciente}</p>
            <p className='m-0 letra_2' id="NombrePaciente" ><b className='me-1'>Nombre:</b>{datos.Nombre}</p>
            <p className='m-0 letra_2' id="CedulaPaciente"><b className='me-1'>C.I:</b>{datos.CI}</p>
            <p className='m-0 letra_2'><b className='me-1'>Edad:</b>{datos.Edad}</p>
            <p className='m-0 letra_2'><b className='me-1'>Sexo:</b>{datos.Sexo}</p>
          </div>
          <div>
            <p className='m-0 letra_2'><b className='me-1'>Orden:</b>{datos.Orden}</p>
            <p className='m-0 letra_2'><b className='me-1'>Examen:</b>{datos.Examen}</p>
            <p className='m-0 letra_2' id="NombreExamen"><b className='me-1'>Nombre:</b>{datos.ExamenNombre}</p>
            <p className='m-0 letra_2'><b className='me-1'>Fecha de Registro:</b>{datos.Fecha_Registro}</p>
            <p className='m-0 letra_2'><b className='me-1'>Medico:</b>{datos.Medico}</p>
          </div>
        </div>
        <div className='hr'></div>
      </>
    )
  } else {
    return (
      <>
        <div className='hr'></div>
        <div className='d-flex w-100 mx-auto justify-content-around'>
          <div>
            <p className='m-0 letra_2'><b className='me-1'>Paciente:</b>{datos.Paciente}</p>
            <p className='m-0 letra_2'><b className='me-1'>Nombre:</b>{datos.Nombre}</p>
            <p className='m-0 letra_2'><b className='me-1'>C.I:</b>{datos.CI}</p>
            <p className='m-0 letra_2'><b className='me-1'>Edad:</b>{datos.Edad}</p>
            <p className='m-0 letra_2'><b className='me-1'>Sexo:</b>{datos.Sexo}</p>
          </div>
          <div>
            <p className='m-0 letra_2'><b className='me-1'>Orden:</b>{datos.Orden}</p>
            <p className='m-0 letra_2'><b className='me-1'>Examen:</b>{datos.Examen}</p>
            <p className='m-0 letra_2'><b className='me-1'>Nombre:</b>{datos.ExamenNombre}</p>
            <p className='m-0 letra_2'><b className='me-1'>Fecha de Registro:</b>{datos.Fecha_Registro}</p>
            <p className='m-0 letra_2'><b className='me-1'>Medico:</b>{datos.Medico}</p>
            <p className='m-0 letra_2'><b className='me-1'>Finalizado:</b>{datos.fecha_actual}</p>
          </div>
        </div>
        <div className='hr'></div>
      </>
    )
  }



}

export default MembreteExmamen