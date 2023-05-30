import lading from '../assets/iconos/loading.png' 

function Carga() {
    return (
        <div className='container_superior z-3' id="pagina_carga">
            <img src={lading} alt="cargando"  width="200px" height="200px"/>
        </div>
    )
}

export default Carga