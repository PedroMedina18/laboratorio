import lupa from "../assets/iconos/loupe.png";
import guardar from "../assets/iconos/registro.png";
import { listTipoExamen } from '../js/Servidor';
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/AuthContext"
import FilaInactiva from "./FilaInactiva";
import FilaActiva from "./FilaActiva";

// COMPONENTE ENCARGADO DE LOS EXAMENES EN LA SECCION DE EGISTRO DE EXAMENES
function DatosExamen() {
  const { setDatos, datos, codificacion, list, setList, cargarExamenes, CargaInicial, setCargarExamenes } = useContext(AuthContext)

  useEffect(() => {
    setCargarExamenes(CargaInicial)
  }, [])

  const buscarExamenes = async () => {
    try {
      const res = await listTipoExamen();
      const data = await res.json();
      data.tipo_examen.forEach(element => {
        const condigo = codificacion("EXM", element.id, element.muestra)
        element.id = condigo
      });
      setDatos({
        ...datos,
        tipoExamen: data.tipo_examen
      });
      setList({
        ...list,
        listExamen: data.tipo_examen
      }
      )

    } catch (error) {
      console.log(error);
    }
  }
  // PARA DESPLEGAR EL CONTENEDOR PARA LA BUSQUEDAD DE LOS EXAMENES QUE SE PUEDEN REGISTRAR
  const desplegar = () => {
    buscarExamenes()
    const show = document.querySelector("#ContainerS_Examen")
    const container = document.getElementById("Container_Examen")
    show.classList.toggle("show_paciente")
    container.classList.toggle("show_container")
  }
  // ESTE CONSTRUCTOR SE ENCARGA ES DE CONSTRUIR LAS FILAS DE LA TABLA DE EXAMENES
  const constructor = (cantidad) => {
    let array = [];
    for (let index = 1; index <= cantidad; index++) {
      array.push(
        <FilaInactiva key={index} />
      );
    }
    return array;
  }
  // ESTA FUNCION SE ENCARGA DE COMPROBAR QUE LOS DATOS DE ALGUN PACIENTE SE HAYAN SELECCIONADO Y QUE COMO MINIMO ESTE 1 EXAMEN PARA REGISTRAR 
  const comprobar = () => {
    if (!(document.querySelector(`#paciente`).value)) {
      const alerta = document.querySelector(`#alertaPaciente`)
      alerta.classList.toggle("show_paciente")
      setTimeout(() => {
        alerta.classList.remove("show_paciente")
      }, 3000);
      return
    }
    if (!(cargarExamenes.examenes.length)) {
      const alerta = document.querySelector(`#alertaExamen`)
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
    <section className="bg-white mt-2 p-2 w-95">
      <h4 className="mx-auto fs-2 text-dark fw-semibold mb-1 text-center">
        Examenes
      </h4>
      <div className=" my-1 w-100 d-flex justify-content-center ">
        <button onClick={desplegar} type="button" className="mx-5 py-1 px-4 fw-bold bAgregar">
          {" "}
          <img
            className="me-2"
            width="50px"
            height="50px"
            src={lupa}
            alt="agregar"
          />{" "}
          <span className='d-none d-lg-flex'>Buscar Examen</span>
        </button>
        <button onClick={comprobar} type="button" className="mx-5 py-1 px-4 fw-bold bGuardar">
          <img
            className="me-2"
            width="50px"
            height="50px"
            src={guardar}
            alt="guardar"
          />
          <span className='d-none d-lg-flex'>Registrar</span>
        </button>
      </div>
      <div className="tabla">
        <table className="mt-2" style={{width:"1200px"}}>
          <thead className=" text-center">
            <tr>
              <th className="border fs-5 border-dark th-1">Codigo</th>
              <th className="border fs-5 border-dark th-2">Examen</th>
              <th className="border fs-5 border-dark th-3">
                Fecha de Registro
              </th>
              <th className="border fs-5 border-dark th-4">Estado</th>
              <th className="th-5"></th>
            </tr>
          </thead>
          {
            cargarExamenes.examenes.length === 0 ? (<></>) : (
              cargarExamenes.examenes.map((examen) => (
                <FilaActiva key={examen.id} codigo={examen.codigo} nombre={examen.nombre}
                  fecha={examen.fecha} estado={examen.estado} indice={examen.id} mensaje={examen.description}/>
              ))
            )
          }
          {constructor(cargarExamenes.cantidad)}
        </table>
      </div>
    </section>
  )
}

export default DatosExamen