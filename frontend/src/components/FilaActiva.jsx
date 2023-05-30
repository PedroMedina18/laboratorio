import x from "../assets/iconos/x.svg";
import alerta from "../assets/iconos/alerta.svg";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext"

function FilaActiva({ codigo, nombre, fecha, estado, indice, mensaje }) {
    const { cargarExamenes, setCargarExamenes } = useContext(AuthContext)
    const eliminar = (index) => {
        let longitud= cargarExamenes.examenes.length
        if(longitud<=5){
            const numero=5-longitud
            longitud=longitud+numero
        }
        const array = cargarExamenes.examenes.filter(examen => examen.id !== index)
        setCargarExamenes({
            ...cargarExamenes,
            examenes: array,
            cantidad:longitud
        }
        )
    }

    return (
        <tbody  className="text-center">
            <tr>
                <td className="border fs-5 border-dark th-1">
                    <input
                        id={`codigo_${indice}`}
                        name={`codigo_${indice}`}
                        className="fs-5 w-100 px-2 text-center"
                        type="text"
                        value={codigo}
                        aria-label="Disabled input example"
                        disabled />
                </td>
                <td className="border fs-5 border-dark th-2">
                    <input
                        id={`nombre_${indice}`}
                        name={`nombre_${indice}`}
                        className="fs-5 w-100 px-2 text-center"
                        type="text"
                        value={nombre}
                        aria-label="Disabled input example"
                        disabled />
                </td>
                <td className="border fs-5 border-dark th-3">
                    <input
                        id={`fecha_${indice}`}
                        name={`fecha_${indice}`}
                        className="fs-5 w-100 px-2 text-center"
                        type="date"
                        value={fecha}
                        aria-label="Disabled input example"
                        disabled />
                </td>
                <td className="border fs-5 border-dark th-4">
                    <input
                        id={`estado_${indice}`}
                        name={`estado_${indice}`}
                        className="fs-5 w-100 px-2 text-center"
                        type="text"
                        value={estado}
                        aria-label="Disabled input example"
                        disabled />
                </td>
                <td className="th-5 d-flex align-items-center justify-content-around">
                    <img
                        className="cursor accion"
                        width="40px"
                        height="30px"
                        src={x}
                        alt="eliminar"
                        onClickCapture={() => { eliminar(indice) }}
                    />
                    <img
                        className="cursor"
                        width="40px"
                        height="30px"
                        src={alerta}
                        alt="alerta"
                        title={mensaje}
                    />
                </td>
            </tr>
        </tbody>
    )
}

export default FilaActiva