import x from "../assets/iconos/x.svg";
import chequeado from "../assets/iconos/chequeado.svg";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext"
import { useContext } from 'react'
import { getExamen } from '../js/Servidor';

// componente de los links de los examenes

function Link_Examen({ defect = true, informacion, direccion }) {
    const { setInformacion } = useContext(AuthContext)
    const navigate = useNavigate();

    const guardar = async (id) => {
        const res = await getExamen(id);
        const data = await res.json();
        if (data.Examen == null) {
            console.log("error")
        } else {
            
            if (Boolean(data.Examen.muestra) && !(data.Muestras.length)) {
                const alerta = document.querySelector(`#alertaCapture`)
                alerta.classList.toggle("show_paciente")
                setTimeout(() => {
                    alerta.classList.remove("show_paciente")
                }, 3000);
                
            }else{
                setInformacion(
                    { estado: data.Examen.estado, 
                    muestra_tipo: data.Examen.muestra, 
                    muestras: data.Muestras.length, 
                    nombre_examen: data.Examen.nombre, 
                    id_tipo:data.Examen.id_tipo_examen })
                navigate(`/Completar/${id}`)
            }
        }
    }

    if (defect) {
        return (
            <Link className='w-100 border-top border-secondary-subtle px-3 d-flex justify-content-between align-items-center links flex-fill' style={{ minHeight: "40px", minWidth:"980px" }} to={direccion}>
                <img
                    className="cursor"
                    width="50px"
                    height="35px"
                    src={Boolean(informacion.estado) ? chequeado : x}
                    alt="eliminar"
                />
                <p className='m-0 overflow-hidden ' style={{ width: "400px", maxHeight: "30px"}}>{`${informacion.nombres} ${informacion.apellidos}`}</p>
                <p className='m-0 text-center overflow-hidden' style={{ width: "130px", maxHeight: "30px"}}>{informacion.cedula}</p>
                <p className='m-0 text-center overflow-hidden' style={{ width: "300px", maxHeight: "30px"}}>{informacion.nombre}</p>
                <p className='m-0 text-end overflow-hidden' style={{ width: "130px", maxHeight: "30px"}}>{informacion.fecha_registro.slice(0, 10)}</p>
            </Link>
        )
    } else {
        return (
            <div onClick={() => { guardar(direccion) }} className='cursor w-100 border-top border-secondary-subtle px-3 d-flex justify-content-between align-items-center links flex-fill' style={{ minHeight: "40px", minWidth:"980px" }}>
                <img
                    className="cursor"
                    width="50px"
                    height="35px"
                    src={Boolean(informacion.estado) ? chequeado : x}
                    alt="eliminar"
                />
                <p className='m-0 overflow-hidden' style={{ width: "400px", maxHeight: "30px"}}>{`${informacion.nombres} ${informacion.apellidos}`}</p>
                <p className='m-0 text-center overflow-hidden' style={{ width: "130px", maxHeight: "30px"}}>{informacion.cedula}</p>
                <p className='m-0 text-center overflow-hidden' style={{ width: "300px", maxHeight: "30px"}}>{informacion.nombre}</p>
                <p className='m-0 text-end overflow-hidden' style={{ width: "130px", maxHeight: "30px"}}>{informacion.fecha_registro.slice(0, 10)}</p>
            </div>
        )
    }



}

export default Link_Examen