
const API_URL="http://127.0.0.1:8000/api/"

export const iniciarSeccion = async (data) => {
    return await fetch(`${API_URL}login/`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            "Usuario": String(data.Usuario.value).trim(),
            "Password": String(data.Password.value).trim(),
        })
    });
};

export const GuardarResultados = async (data) => {
    console.log(data)
    return await fetch(`${API_URL}resultados/`, {
        method: 'POST',
        
        body: data
    });
};

export const CompletarExamen = async (id, data) => {
    
    return await fetch(`${API_URL}examen/${id}/`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            "personal": data.personal,
            "cargo": data.cargo,
            "observaciones": data.observaciones
            
        })
    });
};


export const registerExamen = async (data) => {
    return await fetch(`${API_URL}examen/`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            "idPaciente":data.idPaciente,
            "cedula":data.cedula,
            "idExamen":data.idExamen,
            "nombre":data.nombre,
            "idPersonal":data.idPersonal
        })
    });
};

export const registerMuestra = async (data) => {
    return await fetch(`${API_URL}muestra_examen/`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            "idExamen":data.idExamen,
            "idMuestra":data.idMuestra,
            "idPersonal":data.idPersonal,
            "fecha_extraccion":data.fecha_extraccion,
            "lote":data.lote,
            "interno":data.interno,
            "numero":data.numero
        })
    });
};

export const delateExamen = async (id) => {
    return await fetch(`${API_URL}examen/${id}/`, {
        method: 'DELETE'
    });
};

export const listPacientes = async () => {
    return await fetch(`${API_URL}pacientes/`)
};

export const listTipoExamen = async () => {
    return await fetch(`${API_URL}tipo_examen/`)
};
export const listTipoMuestra = async () => {
    return await fetch(`${API_URL}tipo_muestra/`)
};

export const listValores_Examen = async (idExamen) => {
    return await fetch(`${API_URL}valores_examenes/${idExamen}/`)
};

export const listExamen = async ({indice=1, estado=null, categoria=0, fecha_incial=null, fecha_final=null, paciente=0}) => {
    return await fetch(`${API_URL}examen/${paciente}?indice=${indice}&estado=${estado}&idCategoria=${categoria}&fecha_inicial=${fecha_incial}&fecha_final=${fecha_final}`)
};

export const listExamenesIncompletos = async ({cargo=0, indice=1, categoria=0, fecha_incial=null, fecha_final=null, paciente=0}) => {
    return await fetch(`${API_URL}examen_cargo/cargo:${cargo}/paciente:${paciente}/?indice=${indice}&idCategoria=${categoria}&fecha_inicial=${fecha_incial}&fecha_final=${fecha_final}`)
};

export const listTipoExamen_Cargo = async (cargo=0) => {
    return await fetch(`${API_URL}tipo_examen_cargo/${cargo}/`)
};

export const listExamenMuestra = async () => {
    return await fetch(`${API_URL}muestra_examen/`)
};

export const getPaciente = async (id) => {
    return await fetch(`${API_URL}pacientes/${id}/`)
};

export const getExamen = async (id=0) => {
    return await fetch(`${API_URL}examen_informacion/${id}/`)
};
