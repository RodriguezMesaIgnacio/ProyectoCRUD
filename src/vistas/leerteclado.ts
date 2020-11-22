import readline from 'readline'
let readlineI: readline.Interface

let leeLinea = (prompt: string) =>  {
    readlineI = readline.createInterface({
        input: process.stdin,
        output: process.stdout,
    })
    return new Promise<string>( (resuelta: any, rechazada: any) => {
        readlineI.question(`${prompt}: `, (cadenaEntrada: string) => {
                resuelta (cadenaEntrada)
            }
        )
    })
}
export let leerTeclado = async (prompt: string) => {
    let valor: string
    valor = await leeLinea(prompt)
    readlineI.close()
    return valor
}

export let leeNumero = async (prompt: string) => {
    let num: string
    num = await leeLinea(prompt)
    readlineI.close()
    let t=Array.from(num)
    let esNumero=true
    t.forEach(e => {
        if (!e.charAt(0).match(/[0-9]/)){
            esNumero=false
        }
    });
    if (!esNumero){
        throw 'ERROR no ha introducido un número válido'
    } else {
        return num
    }
}

export let leeDNI = async (prompt: string) => {
    let dni: string
    dni = await leeLinea(prompt)
    readlineI.close()
    if(dni.length!=9 || !dni.charAt(0).match(/[0-9]/) || !dni.charAt(1).match(/[0-9]/) || !dni.charAt(2).match(/[0-9]/)
    || !dni.charAt(3).match(/[0-9]/) || !dni.charAt(4).match(/[0-9]/) || !dni.charAt(5).match(/[0-9]/)|| !dni.charAt(6).match(/[0-9]/)
    || !dni.charAt(7).match(/[0-9]/) || !dni.charAt(7).match(/[0-9]/)){
        throw 'ERROR el DNI no tiene el formato correcto NNNNNNNNX en mayúsculas'
    } else {
        return dni
    }
}

export let leeFecha = async (prompt: string) => {
    let fecha: string
    fecha = await leeLinea(prompt)
    readlineI.close()
    if(fecha.length!=10 || !fecha.charAt(0).match(/[0-9]/) || !fecha.charAt(1).match(/[0-9]/) || !fecha.charAt(2).match(/[0-9]/)
    || !fecha.charAt(3).match(/[0-9]/) || !fecha.charAt(4).match(/-/) || !fecha.charAt(5).match(/[0-9]/) || !fecha.charAt(6).match(/[0-9]/)
    || !fecha.charAt(7).match(/-/) || !fecha.charAt(8).match(/[0-9]/) || !fecha.charAt(9).match(/[0-9]/)){
        throw 'ERROR la fecha no tiene el formato correcto AAAA-MM-DD'
    } else {
        return fecha
    }
}

export let leeYN = async (prompt:string) => {
    let yn:string
    yn=await leeLinea(prompt)
    let letras:RegExp=/Y|N/
    readlineI.close()
    if(yn.length!=1 || !yn.charAt(0).match(letras)){
        throw 'ERROR introduce Y para si y N para no'
    } else {
        return yn
    }
}

