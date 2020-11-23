import { leerTeclado } from './leerteclado'

export const menu = async () => {
    let n: number
    console.log('\n')
    console.log('1.- CREAR LOCAL')
    console.log('2.- LISTAR LOCALES')
    console.log('3.- SELECCIONAR LOCAL')
    console.log('4.- BORRAR LOCAL')
    console.log('0.- SALIR')
    n = parseInt( await leerTeclado('--OPCIÓN--') )
    return n
}

export const menu2 = async () => {
    let n: number
    console.log('\n')
    console.log('1.- AÑADIR EMPLEADO')
    console.log('2.- LISTAR EMPLEADOS')
    console.log('3.- AÑADIR ORDENADOR')
    console.log('4.- LISTAR ORDENADORES')
    console.log('5.- SUELDO MEDIO DE LOS EMPLEADOS')
    console.log('6.- EDAD MEDIA DE LOS EMPLEADOS')
    console.log('7.- ORDENADORES QUE DEBEN SER REPARADOS')
    console.log('8.- SELECCIONAR ORDENADOR')
    console.log('9.- ORDENADORES A REVISAR')
    console.log('0.- SALIR')
    n = parseInt( await leerTeclado('--OPCIÓN--') )
    return n
}

export const menu3 = async () => {
    let n: number
    console.log('\n')
    console.log('1.- ARREGLAR PC')
    console.log('2.- CAMBIAR VALOR DEL PC')
    console.log('0.- SALIR')
    n = parseInt( await leerTeclado('--OPCIÓN--') )
    return n
}