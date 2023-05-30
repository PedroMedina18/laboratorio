import Membrete from "../components/MembreteExmamen"

function Pdf({ IdExamen, nombreExamen, campos }) {
    {
        if (nombreExamen === "Examen De Orina") {
            return (
                <div className="desaparecer w-100" >
                    <div id="documentPDFOrina" className=" w-100 ">
                        <Membrete IdExamen={IdExamen} hoy={true} />
                        <h2 className='text-center my-2'>{nombreExamen}</h2>
                        <div className='d-flex bg-secondary-subtle border border-dark justify-content-between px-2'>
                            <p className='m-0 letra' style={{ width: "120px" }}>Analisis</p>
                            <p className='my-0 letra ' style={{ width: "150px", marginLeft: "30px" }}>Resultado</p>
                            <p className='m-0 letra' style={{ width: "50px" }}>Unidades</p>
                            <p className='m-0 letra' style={{ width: "180px" }}>Valor Referencial</p>
                        </div>
                        <div>
                            <h2 className="text-center">Macroscopio</h2>
                            {campos.valoresOne ? (

                                campos.valoresOne.map((element, index) => (
                                    <div key={index} className='d-flex  justify-content-between px-2 my-2'>
                                        <label htmlFor="" className='fw-bold' style={{ width: "120px" }}>{element.campo}</label>
                                        <p className='m-0 letra' style={{ width: "150px", height: "30px" }}>{element.resultado}</p>
                                        <p className='m-0 letra' style={{ width: "50px" }}>{element.unidad}</p>
                                        <p className='m-0 letra' style={{ width: "180px" }}>{element.valor_referencial}</p>
                                    </div>
                                ))
                            ) : <></>}
                            <h2 className="text-center">Quimico</h2>
                            {campos.valoresTwO ? (

                                campos.valoresTwO.map((element, index) => (
                                    <div key={index} className='d-flex  justify-content-between px-2 my-2'>
                                        <label htmlFor="" className='fw-bold' style={{ width: "120px" }}>{element.campo}</label>
                                        <p className='m-0 letra' style={{ width: "150px", height: "30px" }}>{element.resultado}</p>
                                        <p className='m-0 letra' style={{ width: "50px" }}>{element.unidad}</p>
                                        <p className='m-0 letra' style={{ width: "180px" }}>{element.valor_referencial}</p>
                                    </div>
                                ))
                            ) : <></>}
                            <h2 className="text-center">Microscópico</h2>
                            {campos.valoresTree ? (

                                campos.valoresTree.map((element, index) => (
                                    <div key={index} className='d-flex  justify-content-between px-2 my-2'>
                                        <label htmlFor="" className='fw-bold' style={{ width: "120px" }}>{element.campo}</label>
                                        <p className='m-0 letra' style={{ width: "150px", height: "30px" }}>{element.resultado}</p>
                                        <p className='m-0 letra' style={{ width: "50px" }}>{element.unidad}</p>
                                        <p className='m-0 letra' style={{ width: "180px" }}>{element.valor_referencial}</p>
                                    </div>
                                ))
                            ) : <></>}
                        </div>
                        <div className='hr'></div>
                        <div className="w-100">
                            <h2 className="text-center">Observaciones</h2>
                            {campos.observaciones ?
                                (
                                    <div className="w-100" style={{ wordWrap: "break-word" }}>
                                        <p className='m-0 letra text-justify'>{campos.observaciones}</p>
                                    </div>
                                )
                                :
                                (<></>)
                            }
                        </div>
                    </div>
                </div>

            )
        }
        if (nombreExamen === "Examen De Heces") {
            return (
                <div className="desaparecer w-100" >
                    <div id="documentPDFHeces" className=" w-100 ">
                        <Membrete IdExamen={IdExamen} hoy={true} />
                        <h2 className='text-center my-2'>{nombreExamen}</h2>
                        <h3 className='ms-3 fw-bold my-3'>Examen Macroscópico</h3>
                        <div className="mx-2 w-100 d-flex flex-wrap">
                            {campos.valoresOne ? (
                                campos.valoresOne.map((element, index) => (
                                    <div key={index} className='d-flex align-items-center my-1 campo_valor mx-1 justify-content-between' style={{ width: "420px" }}>
                                        <label className='m-0 fw-bold '>{element.campo}</label>
                                        <p className='m-0 letra' style={{ width: "200px" }}>{element.resultado}</p>
                                    </div>
                                ))
                            ) : <></>}
                        </div>
                        <h3 className='ms-3 m-0 my-3 fw-bold'>Examen Microscópico</h3>
                        <div className="mx-2 w-100 d-flex flex-wrap">
                            {campos.valoresTwO ? (
                                campos.valoresTwO.map((element, index) => (
                                    <div key={index} className='d-flex align-items-center my-1 campo_valor mx-1 justify-content-between' style={{ width: "420px" }}>
                                        <label className='m-0 fw-bold '>{element.campo}</label>
                                        <p className='m-0 letra' style={{ width: "200px" }}>{element.resultado}</p>
                                    </div>
                                ))
                            ) : <></>}
                        </div>
                        <div className='hr'></div>
                        <div className="w-100">
                            <h3 className='fw-bold text-center'>Examen Parasitológico</h3>
                            {campos.valoresTree ?
                                (
                                    <div className='d-flex align-items-center my-2 w-100'>
                                        <p id="valor_13" className='m-0 letra text-justify'>{campos.valoresTree}</p>
                                    </div>
                                )
                                :
                                (<></>)
                            }
                            <h3 className='fw-bold text-center'>Observaciones</h3>
                            {campos.observaciones ?
                                (
                                    <div className='d-flex align-items-center my-2 w-100'>
                                        <p id="valor_13" className='m-0 letra text-justify'>{campos.observaciones}</p>
                                    </div>
                                )
                                :
                                (<></>)
                            }
                        </div>
                    </div>
                </div>

            )
        } else {
            return (
                <div className=" desaparecer w-100" >
                    <div id="documentPDF" className=" w-100 ">
                        <Membrete IdExamen={IdExamen} hoy={true} />
                        <h2 className='text-center my-2'>{nombreExamen}</h2>
                        <div className='d-flex bg-secondary-subtle border border-dark justify-content-between px-2'>
                            <p className='m-0 letra' style={{ width: "120px" }}>Analisis</p>
                            <p className='my-0 letra ' style={{ width: "150px", marginLeft: "30px" }}>Resultado</p>
                            <p className='m-0 letra' style={{ width: "50px" }}>Unidades</p>
                            <p className='m-0 letra' style={{ width: "180px" }}>Valor Referencial</p>
                        </div>
                        <div>
                            {campos.valores ? (

                                campos.valores.map((element, index) => (
                                    <div key={index} className='d-flex  justify-content-between px-2 my-2'>
                                        <label htmlFor="" className='fw-bold' style={{ width: "120px" }}>{element.campo}</label>
                                        <p className='m-0 letra' style={{ width: "150px", height: "30px" }}>{element.resultado}</p>
                                        <p className='m-0 letra' style={{ width: "50px" }}>{element.unidad}</p>
                                        <p className='m-0 letra' style={{ width: "180px" }}>{element.valor_referencial}</p>
                                    </div>
                                ))
                            ) : <></>}
                        </div>
                        <div className='hr'></div>
                        <div className="w-100">
                            <h2 className="text-center">Observaciones</h2>
                            {campos.observaciones ?
                                (
                                    <div className="w-100" style={{ wordWrap: "break-word" }}>
                                        <p className='m-0 letra text-justify'>{campos.observaciones}</p>
                                    </div>
                                )
                                :
                                (<></>)
                            }
                        </div>
                    </div>
                </div>

            )
        }

    }

}

export default Pdf