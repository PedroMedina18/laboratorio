import Menu from '../components/Menu'
import User from '../components/User'
import Link_Examen from '../components/Link_Examen'
import Reloj from "../components/Reloj";
import lupa from "../assets/iconos/lupa.svg"
import flecha_izquierda from "../assets/iconos/flecha_left.svg"
import flecha_derecha from "../assets/iconos/flecha_right.svg"
import bien from "../assets/iconos/bien.svg"
import bien_active from "../assets/iconos/bien_active.svg"
import todas from "../assets/iconos/todas.svg"
import todas_active from "../assets/iconos/todas_active.svg"
import mal_active from "../assets/iconos/mal_active.svg"
import mal from "../assets/iconos/mal.svg"
import { listTipoExamen, listExamen } from '../js/Servidor';
import { useState, useEffect } from 'react'
import { useParams, useNavigate } from "react-router-dom";

function Consulta() {
  const [Tipoexamenes, setTipo_Examenes] = useState(null)
  const [examenes, setExamenes] = useState({ listExamenes: null, total: null, IndiceInical: 0, IndiceFinal: 0, indice: 0, paciente: 0 })
  const [estado, setEstado] = useState({ todos: true, terminadas: false, incompletas: false })
  const params = useParams();
  const navigate = useNavigate();
  useEffect(() => {
    activacion()
  }, [])
  const activacion = () => {
    if (params.cedula) {
      const cedula = parseInt(params.cedula)
      if (isNaN(id_examen)) {
        buscarTipo_Examen()
        buscarExamen()
      } else {
        buscarTipo_Examen()
        buscarExamen(cedula)
      }
    } else {
      buscarTipo_Examen()
      buscarExamen()
    }
  }

  // Funcion para buscar los examenes para las opciones 
  const buscarTipo_Examen = async () => {
    try {
      const res = await listTipoExamen();
      const data = await res.json();
      setTipo_Examenes(data.tipo_examen)

    } catch (error) {
      console.log(error);
    }
  }
  // funcion para la bususque de los examenes carga inicial
  const buscarExamen = async (paciente = 0) => {
    try {
      const res = await listExamen({ indice: 1, paciente: paciente });
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
  // funion para el cambio de estado entre terminados incompletos o todos
  const cambioEstado = async (estado, elemento) => {
    const tipo = parseInt(document.querySelector("#Examen").value)
    const fechaInicio = document.querySelector("#Desde").value ? document.querySelector("#Desde").value : null
    const fechaFin = document.querySelector("#Hasta").value ? document.querySelector("#Hasta").value : null
    const cedulaPaciente = examenes.paciente
    try {
      const res = await listExamen({ categoria: tipo, estado: estado, fecha_incial: fechaInicio, fecha_final: fechaFin, paciente: cedulaPaciente });
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
    if (estado === null) {
      setEstado({ todos: true, terminadas: false, incompletas: false })
      const estado_activo = document.querySelector(".estado")
      estado_activo.classList.toggle("estado")
      elemento.target.classList.add("estado")
      return
    }
    if (estado === true) {
      setEstado({ todos: false, terminadas: true, incompletas: false })
      const estado_activo = document.querySelector(".estado")
      estado_activo.classList.toggle("estado")
      elemento.target.classList.add("estado")
      return
    }
    if (estado === false) {
      setEstado({ todos: false, terminadas: false, incompletas: true })
      const estado_activo = document.querySelector(".estado")
      estado_activo.classList.toggle("estado")
      elemento.target.classList.add("estado")
      return
    }
  }
  // funion para el cambio de datos como fecha o tipo de examen
  const cambiarDate = async () => {
    const tipo = parseInt(document.querySelector("#Examen").value)
    const estado = devolverEstado()
    const fechaInicio = Boolean(document.querySelector("#Desde").value) ? document.querySelector("#Desde").value : null
    const fechaFin = Boolean(document.querySelector("#Hasta").value) ? document.querySelector("#Hasta").value : null
    const cedulaPaciente = examenes.paciente
    try {
      const res = await listExamen({ categoria: tipo, estado: estado, fecha_incial: fechaInicio, fecha_final: fechaFin, paciente: cedulaPaciente });
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

  // funion encargada de devolver el estado activoactiualmente
  const devolverEstado = () => {
    if (estado.todos) {
      return null
    }
    if (estado.terminadas) {
      return true
    }
    if (estado.incompletas) {
      return false
    }
  }

  // funion encargada de avanzar
  const avanzar = async () => {
    const maximo = parseInt(examenes.total)
    const limite = parseInt(examenes.IndiceFinal)
    const actual = parseInt(examenes.indice)
    if (limite < maximo) {
      const tipo = parseInt(document.querySelector("#Examen").value)
      const estado = devolverEstado()
      const fechaInicio = document.querySelector("#Desde").value ? document.querySelector("#Desde").value : null
      const fechaFin = document.querySelector("#Hasta").value ? document.querySelector("#Hasta").value : null
      const indice = actual + 1
      const cedulaPaciente = examenes.paciente
      try {
        const res = await listExamen({ categoria: tipo, estado: estado, fecha_incial: fechaInicio, fecha_final: fechaFin, indice: indice, paciente: cedulaPaciente });
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
      const tipo = parseInt(document.querySelector("#Examen").value)
      const estado = devolverEstado()
      const fechaInicio = document.querySelector("#Desde").value ? document.querySelector("#Desde").value : null
      const fechaFin = document.querySelector("#Hasta").value ? document.querySelector("#Hasta").value : null
      const indice = actual - 1
      const cedulaPaciente = examenes.paciente
      try {
        const res = await listExamen({ categoria: tipo, estado: estado, fecha_incial: fechaInicio, fecha_final: fechaFin, indice: indice, paciente: cedulaPaciente });
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
    const estado_activo = document.querySelector(".estado")
    const estado_original = document.querySelector("#EstadoTodos")
    estado_activo.classList.remove("estado")
    estado_original.classList.add("estado")
    setEstado({ todos: true, terminadas: false, incompletas: false })
    const fechaInicio = document.querySelector("#Desde")
    const fechaFin = document.querySelector("#Hasta")
    fechaInicio.value = null
    fechaFin.value = null
    const tipo_examen = document.querySelector("#Examen")
    tipo_examen.value = 0

    // ejecucion de la busquedad
    if (Boolean(e.target.Cedula.value)) {
      navigate(`/Consulta/paciente/${e.target.Cedula.value}`)
      buscarExamen(e.target.Cedula.value)
    } else {
      navigate(`/Consulta`)
      buscarExamen()
    }
  }

  return (
    <main className="fondo_20 min-vh-100 d-flex flex-column align-items-center">
      <section className="d-flex justify-content-between w-100">
        <Menu />
        <User grande={false} />
      </section>

      <section className='w-95 d-flex flex-column vh-85 bg-white p-3 rounded mt-2'>
        <div className="w-100 d-flex barra">
          <form onSubmit={buscarPaciente} className='d-flex my-0 mx-auto w-80 border border-secondary-subtle rounded-pill' style={{ height: "35px" }}>
            <input type="number" placeholder='Cedula del Paciente' className='mx-3 border-0 w-80 buscador' id='Cedula' name='Cedula' min={1} />
            <button type="submit" className='w-20 border-0 rounded-pill bg-secondary-subtle '><img src={lupa} alt="buscar" /></button>
          </form>
        </div>
        <div className='d-flex mt-2 w-100 justify-content-between align-items-center'>
          <select onChange={cambiarDate} name="Examen" defaultValue="0" className=" px-1  form-select fs-6 " id="Examen" style={{ height: "38px", width: "230px" }}>
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
          <div className='d-flex fs-6  px-3'>
            <p className='m-0 mx-1  letra'>{`${examenes.IndiceInical}-${examenes.IndiceFinal} de ${examenes.total == null ? 0 : examenes.total}`}</p>
            <p onClick={retroceder} className='m-0 mx-1  cursor'><img src={flecha_izquierda} alt="flecha" /></p>
            <p onClick={avanzar} className='m-0 mx-1  cursor'><img src={flecha_derecha} alt="flecha" /></p>
          </div>
        </div>

        <div className='d-flex flex-wrap w-100 justify-content-center justify-content-xxl-between align-items-center mt-2 '>
          <div className="d-flex justify-content-around flex-wrap">
            <p id='EstadoTodos' onClick={(element) => { cambioEstado(null, element) }} className='cursor m-0 mt-3 mt-lg-0 py-2 px-5 letra estado' style={{ width: "230px" }} ><img className='me-2' width="25px" src={estado.todos ? todas_active : todas} />Todos</p>
            <p onClick={(element) => { cambioEstado(true, element) }} className='cursor m-0 mt-3 mt-lg-0 py-2 px-3 letra' style={{ width: "230px" }}><img className='me-2' width="25px" src={estado.terminadas ? bien_active : bien} /> Terminados</p>
            <p onClick={(element) => { cambioEstado(false, element) }} className='cursor m-0 mt-3 mt-lg-0 py-2 px-3 letra' style={{ width: "230px" }}><img className='me-2' width="25px" src={estado.incompletas ? mal_active : mal} /> Incompletos</p>
          </div>
          <div className='d-flex px-3 align-items-center justify-content-around buscardorFecha'>
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
                <Link_Examen key={element.id} informacion={element} direccion={`/Examen/${element.id}`} />
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
  );
}

export default Consulta