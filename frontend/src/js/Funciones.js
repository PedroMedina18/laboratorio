export const codificacion = (tipo, dato, muestra) => {
    let sample
    if (muestra) {
        sample = "E"
    } else {
        sample = "O"
    }
    const tipos_codigo = ["EXM", "PAC", "ORD"]

    for (let index = 0; index <= tipos_codigo.length; index++) {

        if (tipos_codigo[index] === tipo) {
            const date = String(dato)
            const longitud = date.length + 10

            if (dato <= 9) {
                const codigo = `${tipos_codigo[index]}-8${date}0-500-${longitud}100${sample}`
                return codigo
            }
            if (dato <= 99 && dato >= 10) {
                const codigo = `${tipos_codigo[index]}-8${date}-500-${longitud}100${sample}`
                return codigo
            }
            if (dato <= 999 && dato >= 100) {
                const codigo = `${tipos_codigo[index]}-${date}-500-${longitud}100${sample}`
                return codigo
            }
            if (dato <= 9999 && dato >= 1000) {
                const date1 = date.slice(0, 3)
                const date2 = date.slice(3, 4)
                const codigo = `${tipos_codigo[index]}-${date1}-${date2}00-${longitud}100${sample}`
                return codigo
            }
            if (dato <= 99999 && dato >= 10000) {
                const date1 = date.slice(0, 3)
                const date2 = date.slice(3, 5)
                const codigo = `${tipos_codigo[index]}-${date1}-${date2}0-${longitud}100${sample}`
                return codigo
            }
            if (dato <= 999999 && dato >= 100000) {
                const date1 = date.slice(0, 3)
                const date2 = date.slice(3, 6)
                const codigo = `${tipos_codigo[index]}-${date1}-${date2}-${longitud}100${sample}`
                return codigo
            }
            if (dato <= 9999999 && dato >= 1000000) {
                const date1 = date.slice(0, 3)
                const date2 = date.slice(3, 6)
                const date3 = date.slice(6, 7)
                const codigo = `${tipos_codigo[index]}-${date1}-${date2}-${longitud}${date3}00${sample}`
                return codigo
            }
            if (dato <= 9999999 && dato >= 10000000) {
                const date1 = date.slice(0, 3)
                const date2 = date.slice(3, 6)
                const date3 = date.slice(6, 8)
                const codigo = `${tipos_codigo[index]}-${date1}-${date2}-${longitud}${date3}0${sample}`
                return codigo
            }
            if (dato <= 99999999 && dato >= 100000000) {
                const date1 = date.slice(0, 3)
                const date2 = date.slice(3, 6)
                const date3 = date.slice(6, 9)
                const codigo = `${tipos_codigo[index]}-${date1}-${date2}-${longitud}${date3}${sample}`
                return codigo
            }

        }
    }
}
export const descodificacion = (codigo) => {
    
    const longitud = parseInt(codigo.slice(12, 14)) - 10
    if (longitud === 1) {
        const id = parseInt(codigo.slice(5, 6))
        return id
    }
    if (longitud === 2) {
        const id = parseInt(codigo.slice(5, 7))
        return id
    }
    if (longitud === 3) {
        const id = parseInt(codigo.slice(4, 7))
        return id
    }
    if (longitud === 4) {
        const id1 = codigo.slice(4, 7)
        const id2 = codigo.slice(8, 9)
        const id = parseInt(`${id1}${id2}`)
        return id
    }
    if (longitud === 5) {
        const id1 = codigo.slice(4, 7)
        const id2 = codigo.slice(8, 10)
        const id = parseInt(`${id1}${id2}`)
        return id
    }
    if (longitud === 6) {
        const id1 = codigo.slice(4, 7)
        const id2 = codigo.slice(8, 11)
        const id = parseInt(`${id1}${id2}`)
        return id
    }
    if (longitud === 7) {
        const id1 = codigo.slice(4, 7)
        const id2 = codigo.slice(8, 11)
        const id3 = codigo.slice(14, 15)
        const id = parseInt(`${id1}${id2}${id3}`)
        return id
    }
    if (longitud === 8) {
        const id1 = codigo.slice(4, 7)
        const id2 = codigo.slice(8, 11)
        const id3 = codigo.slice(14, 16)
        const id = parseInt(`${id1}${id2}${id3}`)
        return id
    }
    if (longitud === 8) {
        const id1 = codigo.slice(4, 7)
        const id2 = codigo.slice(8, 11)
        const id3 = codigo.slice(14, 17)
        const id = parseInt(`${id1}${id2}${id3}`)
        return id
    }
}