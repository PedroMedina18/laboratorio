import alerta from '../assets/iconos/alertamensage.svg'


function Alert({ messageErrorm, id }) {
    
    const desaparecer = (identificador) => {
        const alerta = document.querySelector(`#${identificador}`)
        alerta.classList.toggle("show_paciente")
    }

    return (
        <div id={id} className="not_show position-fixed z-1 bottom-0 end-0 alerta d-flex flex-column text-center py-3 px-2 justify-content-center align-items-center alert alert-danger mb-5" role="alert">
            <img
                className="me-3"
                src={alerta}
                alt="alerta"
                width="50px" />
            <p className="m-0 text-danger fw-bold fs-4">{messageErrorm}</p>
            <button onClick={() => { desaparecer(id) }} type="button" className="w-100 btn btn-danger fw-bold mt-2">Aceptar</button>
        </div>
    )
}

export default Alert