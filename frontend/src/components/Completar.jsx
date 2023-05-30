import Resonancia_RayosX from '../pages/Resonancia_RayosX'
import Examen_Heces from '../pages/Examen_Heces'
import Examen_Orina from '../pages/Examen_Orina'
import Examen_Estandar from '../pages/Examen_Estandar'
import { getExamen } from '../js/Servidor';
import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect, useContext } from 'react'
import { AuthContext } from "../context/AuthContext"

function Completar() {
    const { informacion } = useContext(AuthContext)

    const params = useParams();
    const navigate = useNavigate();
    useEffect(() => {
        if ((informacion.estado || informacion.nombre_examen || informacion.muestras_tipo || informacion.muestras) === null) {
            navigate("/Captura_Resultados")
        }
        if (Boolean(informacion.estado)) {
            navigate("/Captura_Resultados")
        }
    }, [])
    if (params.id) {
        const id_examen = parseInt(params.id)
        if (isNaN(id_examen)) {
            navigate("/Inicio")

        } else {

            if ((informacion.estado || informacion.nombre_examen || informacion.muestras_tipo || informacion.muestras) === null) {
                return (<></>)
            }

            if (Boolean(informacion.estado)) {
                return (<h1> Examen completado</h1>)
            }
            if (informacion.id_tipo === 17 || informacion.id_tipo === 18) {
                if (Boolean(informacion.muestras)) {
                    if (informacion.id_tipo === 17) {
                        return (<Examen_Orina IdExamen={id_examen} />)
                    }
                    if (informacion.id_tipo === 18) {
                        return (<Examen_Heces IdExamen={params.id} />)
                    }
                } else {
                    return (<></>)
                }
            } else {
                if (Boolean(informacion.muestra_tipo)) {
                    return (<Examen_Estandar IdExamen={params.id} nombre={informacion.nombre_examen} />)
                } else {
                    return (<Resonancia_RayosX IdExamen={id_examen} nombre={informacion.nombre_examen} />)
                }
            }
        }
    } else {
        navigate("/Inicio")
    }
}

export default Completar