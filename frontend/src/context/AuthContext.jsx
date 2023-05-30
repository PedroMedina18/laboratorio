import { createContext, useState, useEffect } from "react";
import {codificacion, descodificacion} from "../js/Funciones.js"


export const AuthContext = createContext();

export function AuthContextProvider({ children }) {

  // DATOS DEL USUARIO
  const initialState = { state: false, usuario: null}
  // FUNCION PARA CARGAR DATOS DE LOGIN
  const [user, setLoginUser] = useState(initialState)

  // OK. ESTA SON LAS LISTAS EN DONDE SE GUARDA LOS LISTADOS QUE DEVUELVE LA BASE DE DATOS Y LA QUE SE MOSTRARA
  const [datos, setDatos]=useState({pacientes:null, tipoExamen:null, muestraExamen:null})
  
  // OK. ESTA SON LAS LISTAS DIGAMOS DE RESERVA PARA EVITAR REALIZAR UNA SEGUNDA 
  // CONSULTA QUE PUEDE TARDAR AQUI SE GUARDA TIPO CACHE DE TAL FORMA QUE LA REALIZAR UNA BUSQUEDAD
  // MEDIANTE EL BUSCADOR DE LOS CONTENEDORES SEA ESTAS LISTAS QUE REVISE Y ACTULICE LA LISTA PRINCIPAL 
  const [list, setList] = useState({listExamen:null, listPaciente:null, listMuestraOne:null, listMuestraTwo:null})
  


  // PARA QUE TODOS LOS CAMPOS DE CARGA AUTOMATICA ESTEN EN BLANCO
  const initialDates = { id:"", cedula: "", nombre: "", edad: "", telefono: "", sexo: "", correo: "", codigo:"", examen:"", fecha:"" }
  
  // FUNCION PARA LA CARGA DE DATOS AUTOMATICOS SE UTILIZA PRINCIPALMENTE EN EL REGISTRO DE EXAMENES Y MUESTRAS
  const [valores, setValores] = useState(initialDates)



  // ESTO ES PARA EL RECUADRO DE LA SECCION DE REGISTRO DE EXAMENES
  const CargaInicial={examenes:[], cantidad:5 }
  // Y SU STATE
  const [cargarExamenes, setCargarExamenes] = useState(CargaInicial)

  //STATE ESTA DESTINADO A GUARDAR LAOS DATOS BASICOS DE UN EXAMEN ES DECIR SU ESTADO, SI NECESITA O NO UNA MUESTRA Y OTRA SERIE DE DATOS PARA COMPLETARLOS
  const [informacion, setInformacion] = useState({estado:null, muestra_tipo:null, muestras:null, nombre_examen:null, id_tipo:null})

  // STATE DESTINADO PARA GUARDAR DETERMINADOS ERRORES DE ACCESO Y PERMISO
  const [errores, setErrores] = useState({ErrorCaptura:null})


  // FUNCION PARA CALCULA LA FECHA
  const calcularFecha = (fecha) => {
    const fechaActual = new Date()
    const añoActual = parseInt(fechaActual.getFullYear())
    const mesActual = parseInt(fechaActual.getMonth()) + 1
    const diaActual = parseInt(fechaActual.getDate())

    const añoNacimiento = parseInt(String(fecha).substring(0, 4))
    const mesNacimiento = parseInt(String(fecha).substring(5, 7))
    const diaNacimiento = parseInt(String(fecha).substring(6, 10))

    let edad = añoActual - añoNacimiento
    if (mesActual < mesNacimiento) {
      edad--
    } else if (mesActual === mesNacimiento) {
      if (diaActual < diaNacimiento) {
        edad--
      }
    }
    return edad
  }

  
  // funcion maxima
  // (EXM|PAS)?(\-?(\d{3})?){1,2}(\-?(\d{1,5})?)(E|O)?
  
  
  return (

    <AuthContext.Provider value={
      {
        user,
        valores,
        initialDates,
        list,
        cargarExamenes,
        CargaInicial, 
        datos,
        informacion,
        errores, 
        setErrores, 
        setInformacion, 
        setDatos,
        setCargarExamenes,
        setList,
        setLoginUser,
        setValores,
        calcularFecha,
        codificacion,
        descodificacion
      }
    }>
      {children}
    </AuthContext.Provider>

  )
}

