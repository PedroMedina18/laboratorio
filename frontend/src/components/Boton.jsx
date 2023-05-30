import { Link } from "react-router-dom";
function Boton({ img, nombre, direccion }) {
  return (
    <Link className="Boton_Inicio d-flex align-items-center justify-content-center p-2 overflow-hidden m-3 text-decoration-none text-black cursor" to={direccion}>
      <img src={img} alt={nombre} />
      <p className=" fw-bold mb-0 text-nowrap ms-1">{nombre}</p>
    </Link>
  )
}

export default Boton