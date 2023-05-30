import React from 'react'
import x from "../assets/iconos/x.svg";

function InputFile({ indice, eliminar}) {
    
    return (
        <div className='d-flex  justify-content-evenly align-items-center p-2 my-2 '>
            <label htmlFor={`nombre_${indice}`} className='fw-bold fs-5'>Nombre</label>
            <input type="text" placeholder='Agregue un nombre de identificacion' className='form-control border border-secondary' id={`nombre_${indice}`} style={{ width: "300px", height: "30px" }} />
            <input type="file" className='form-control border border-secondary' id={`inputfile_${indice}`} style={{ width: "400px" }} required />
            <img
                className="cursor accion"
                width="40px"
                height="30px"
                src={x}
                alt="eliminar"
                onClickCapture={eliminar}
            />
        </div>
    )
}

export default InputFile