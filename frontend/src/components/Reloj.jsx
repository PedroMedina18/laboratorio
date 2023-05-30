import React, { useEffect, useState } from "react";
function Reloj({ grande,  }) {

  const diasDeSemana = [
    "Domingo",
    "Lunes",
    "Martes",
    "Miercoles",
    "Jueves",
    "Viernes",
    "Sabado",
  ];
  const meses = [
    "Enero",
    "Febrero",
    "Marzo",
    "Abril",
    "Mayo",
    "Junio",
    "Agosto",
    "Septiembre",
    "Octubre",
    "Noviembre",
    "Diciembre",
  ];


  const fecha = new Date();

  let horas = fecha.getHours();
  let minutos = fecha.getMinutes();
  let diaSemana = fecha.getDay();
  let dia = fecha.getDate();
  let mes = fecha.getMonth();
  let año = fecha.getFullYear();
  let periodo = null;

  if (horas >= 12) {
    horas = horas - 12;
    periodo = "PM";
  } else {
    horas = horas;
    periodo = "AM";
  }
  if (horas == 0) {
    horas = 12;
  }
  const [tiempo, settiempo] = useState({
    diaSemana: diasDeSemana[diaSemana],
    dia: dia,
    mes: meses[mes],
    año: año,
    hora: horas,
    minutos: minutos < 10 ? "0" + minutos : minutos,
    periodo: periodo,
  });

  const actualizar = () => {
    const fecha = new Date();

    let horas = fecha.getHours();
    let minutos = fecha.getMinutes();
    let diaSemana = fecha.getDay();
    let dia = fecha.getDate();
    let mes = fecha.getMonth();
    let año = fecha.getFullYear();
    let periodo = null;
    
    if (horas >= 12) {
      horas = horas - 12;
      periodo = "PM";
    } else {
      horas = horas;
      periodo = "AM";
    }
    if (horas == 0) {
      horas = 12;
    }

    settiempo({
      diaSemana: diasDeSemana[diaSemana],
      dia: dia,
      mes: meses[mes],
      año: año,
      hora: horas,
      minutos: minutos < 10 ? "0" + minutos : minutos,
      periodo: periodo,
    });
  };

  useEffect(() => {
    const TimerId = setInterval(actualizar, 1000);
    return function cleanup() {
      clearInterval(TimerId)
    }
  }, []);

  {
    if (grande === true) {
      return (
        <div className=" d-flex flex-column align-items-star mb-3 ms-3" >
          <div id="fecha" className="fecha d-flex flex-column">
            <p className="fs-1 fw-bold me-1 mb-0">{tiempo.diaSemana}</p>
            <div className="d-flex">
              <p className="fs-2 fw-bold me-1 mb-0">{`${tiempo.dia} de ${tiempo.mes} del ${tiempo.año}`} </p>
            </div>
          </div>
          <div id="reloj" className="reloj d-flex me-5">
            <p className="fs-3 fw-bold me-1 mb-0">{`${tiempo.hora}:${tiempo.minutos} ${tiempo.periodo}`}</p>
          </div>
        </div>
      );
    } else {
      return (
        <div className=" d-flex  align-items-star mb-1 ms-3" >
          <div id="fecha" className="fecha d-flex">
            <p className="fs-6 fw-bold me-1 mb-0">{tiempo.diaSemana}</p>
            <p className="fs-6 fw-bold me-1 mb-0">{tiempo.dia}</p>
            <p className="fs-6 fw-bold me-1 mb-0">de</p>
            <p className="fs-6 fw-bold me-1 mb-0">{tiempo.mes}</p>
            <p className="fs-6 fw-bold me-1 mb-0">del</p>
            <p className="fs-6 fw-bold me-1 mb-0">{tiempo.año}</p>
          </div>
          <div id="reloj" className="reloj d-flex me-5">
            <p className="fs-6 fw-bold mb-0">{tiempo.hora}</p>
            <p className="fs-6 fw-bold mb-0">:</p>
            <p className="fs-6 fw-bold me-1 mb-0">{tiempo.minutos}</p>
            <p className="fs-6 fw-bold me-1 mb-0">{tiempo.periodo}</p>
          </div>
        </div>
      );
    }
  }

}

export default Reloj;
