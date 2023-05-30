import aceptar from "../assets/iconos/aceptar.svg"

function Aceptar({identificador}) {
    const desaparecer=()=>{
        const alerta=document.querySelector(`#${identificador}`)
        alerta.classList.toggle("show_paciente")
    }
    return (
        <div id={identificador} className='container_superior'>
            <div  className=" aceptar vh-60 d-flex flex-column text-center py-3 px-2 justify-content-center align-items-center alert alert-primary" role="alert">
                <img
                    className="me-3"
                    src={aceptar}
                    alt="alerta"
                    width="80px" />
                <p className="my-5 text-primary fw-bold fs-1">Confirmar la solicitud</p>
                <div className="d-flex justify-content-around w-100">
                    <button onClick={()=>desaparecer()} type="button" className="w-40 btn btn-danger btn-lg fw-bold">Rechazar</button>
                    <button type="submit" className="w-40 btn btn-primary btn-lg fw-bold">Aceptar</button>
                </div>
            </div>
        </div>
    )
}

export default Aceptar