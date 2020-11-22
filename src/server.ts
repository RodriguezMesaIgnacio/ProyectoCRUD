import { leerTeclado, leeNumero, leeDNI, leeFecha, leeYN } from './vistas/leerteclado'
import { Local, Locales, tLocal} from './models/Local'
import { Persona,  tPersona } from './models/Persona'
import { Ordenador } from './models/Ordenador'
import { db } from './database/database'
import { menu, menu2 } from './vistas/menu'

const main = async () => {
    let n: number
    do {
        n = await menu()
        switch(n){

            case 1:
                let l1 : Local
                let p1 : Persona
                try {
                    let direccion =  await leerTeclado('Introducir la dirección del nuevo Local')
                    let dni =  await leeDNI('Introducir DNI (NNNNNNNNL) del encargado')
                    let nombre = await leerTeclado('Introducir nombre del encargado')
                    let apellidos = await leerTeclado('Introducir apelidos del encargado')
                    let telefono = parseInt(await leeNumero('Indroducir teléfono del encargado'))
                    let fecha = new Date(await leeFecha('Introducir fecha de nacimiento (AAAA-MM-DD) del encargado'))
                    let sueldo = parseInt(await leerTeclado('Introducir sueldo del encargado'))
                    p1= new Persona(dni, nombre, apellidos, telefono, fecha,sueldo)

                    
                    let o : Array<Ordenador> = new Array()
                    let p : Array<Persona> = new Array()
                    l1=new Local(direccion, p1, o , p)
    
                    await db.conectarBD()
                    const dSchema={
                        _direccion : l1.direccion,
                        _encargado : l1.encargado,
                        _ordenadores : l1.ordenadores,
                        _empleados : l1.empleados,
                    }
                    const oSchema = new Locales(dSchema)
                    await oSchema.save()
                        .then( (doc) => console.log('Salvado Correctamente: '+ doc) )
                        .catch( (err: any) => console.log('Error: '+ err)) 
                    await db.desconectarBD()
                } catch (error) {
                    console.log(error)
                }

                break
            
            case 2:

                await db.conectarBD()
                let tl: any
                let query : any
                query = await Locales.find({})
                for (tl of query){
                    let encargado = new Persona(tl._encargado._dni, tl._encargado._nombre, tl._encargado._apellidos, 
                        tl._encargado._telefono, tl._encargado._fechaNacimiento, tl._encargado._sueldo)
                    let empleados : Array<Persona> = new Array()
                    for (let e of tl._empleados){
                        let te = new Persona(e._dni, e._nombre, e._apellidos, e._telefono, e._fechaNacimiento, e._sueldo)
                        empleados.push(te)
                    }
                    let ordenadores : Array<Ordenador> = new Array()
                    for (let o of tl._ordenadores){
                        let to = new Ordenador(o._nombre, o._precio, o._marca, o._fechaCompra, o._operativo)
                        ordenadores.push(to)
                    }
                    let l = new Local(tl._direccion, encargado, ordenadores, empleados)
                    console.log(l.imprimirLocal())
                }
                await db.desconectarBD()

                break
                
            case 3:
                let localCargado = null
                try {
                    let dir = await leerTeclado("Introduce la direccion del local")
                    await db.conectarBD()
                    let tl : any
                    let query = await Locales.find({})
                    for (tl of query){
                        if (dir==tl._direccion){
                            let encargado = new Persona(tl._encargado._dni, tl._encargado._nombre, tl._encargado._apellidos, 
                                tl._encargado._telefono, tl._encargado._fechaNacimiento, tl._encargado._sueldo)
                            let empleados : Array<Persona> = new Array()
                            for (let e of tl._empleados){
                                let te = new Persona(e._dni, e._nombre, e._apellidos, e._telefono, e._fechaNacimiento, e._sueldo)
                                empleados.push(te)
                            }
                            let ordenadores : Array<Ordenador> = new Array()
                            for (let o of tl._ordenadores){
                                let to = new Ordenador(o._nombre, o._precio, o._marca, o._fechaCompra, o._operativo)
                                ordenadores.push(to)
                            }
                            localCargado = new Local(tl._direccion, encargado, ordenadores, empleados)
                        }
                    }
                    await db.desconectarBD()
                } catch (error) {
                    console.log(error)
                }
                if (localCargado!=null){
                    let n2:number
                    do {
                        n2 = await menu2()
                        switch(n2){
                            case 1:

                                try {
                                    let dni =  await leeDNI('Introducir DNI (NNNNNNNNL)')
                                    let nombre = await leerTeclado('Introducir nombre del empleado')
                                    let apellidos = await leerTeclado('Introducir apelidos del empleado')
                                    let telefono = parseInt(await leeNumero('Indroducir teléfono del empleado'))
                                    let fecha = new Date(await leeFecha('Introducir fecha de nacimiento (AAAA-MM-DD) del empleado'))
                                    let sueldo = parseInt(await leerTeclado('Introducir sueldo del empleado'))
                                    let p1= new Persona(dni, nombre, apellidos, telefono, fecha,sueldo)
                                    localCargado.addEmpleado(p1)
                                } catch(error){
                                    console.log(error)
                                }
                                console.log(`\n Estos son los empleados del local ${localCargado.imprimirLocal()}:`)
                                console.log('**************************')
                                localCargado.imprimirEmpleados()

                                await db.conectarBD()
                                await Locales.findOneAndUpdate(
                                    {_direccion:localCargado.direccion},
                                    {
                                        _direccion:localCargado.direccion,
                                        _encargado:localCargado.encargado,
                                        _ordenadores:localCargado.ordenadores,
                                        _empleados:localCargado.empleados
                                    },{
                                      runValidators:true  
                                    }
                                )
                                .catch((err)=> console.log('ERROR: '+err))
                                await db.desconectarBD()

                                break
                            case 2: 

                                console.log(`\n Estos son los empleados del local ${localCargado.imprimirLocal()}:`)
                                console.log('**************************')
                                localCargado.imprimirEmpleados()

                                break
                            
                            case 3:

                                try {
                                    let nombre =  await leerTeclado('Introducir nombre del PC')
                                    let precio =  parseInt(await leeNumero('Introducir precio del PC'))
                                    let marca = await leerTeclado('Introducir marca del PC')
                                    let fechaCompra = new Date(await leeFecha('Indroducir fecha de compra del PC'))
                                    let operativo = await leeYN('Está el PC operativo [Y-N]')
                                    let o:boolean
                                    if (operativo=='Y'){
                                        o=true
                                    } else {
                                        o=false
                                    }
                                    let o1= new Ordenador(nombre,precio, marca, fechaCompra,o)
                                    localCargado.addOrdenador(o1)
                                } catch(error){
                                    console.log(error)
                                }
                                console.log(`\n Estos son los ordenadores del local ${localCargado.imprimirLocal()}:`)
                                console.log('**************************')
                                localCargado.imprimirOrdenadores()

                                await db.conectarBD()
                                await Locales.findOneAndUpdate(
                                    {_direccion:localCargado.direccion},
                                    {
                                        _direccion:localCargado.direccion,
                                        _encargado:localCargado.encargado,
                                        _ordenadores:localCargado.ordenadores,
                                        _empleados:localCargado.empleados
                                    },{
                                      runValidators:true  
                                    }
                                )
                                .catch((err)=> console.log('ERROR: '+err))
                                await db.desconectarBD()

                                break

                            case 4:

                                console.log(`\n Estos son los ordenadores del local ${localCargado.imprimirLocal()}:`)
                                console.log('**************************')
                                localCargado.imprimirOrdenadores()

                                break
                            
                            case 5:

                                console.log(`\n Este el sueldo medio del local ${localCargado.imprimirLocal()}:`)
                                console.log('**************************')
                                console.log(localCargado.sueldoMedio()+'€')

                                break

                            case 0:
                                console.log('SALIENDO DEL LOCAL SELECCIONADO')
                                break
                            default:
                                console.log("Opción incorrecta")
                                break    
                        }
                    } while (n2!=0);
                } else {
                    console.log('No existe local con esa dirección')
                }
                break
            
            case 4:
                let dir = await leerTeclado("Dirección del local que desea eliminar")
                await db.conectarBD()
                await Locales.findOneAndDelete(
                    {_direccion:dir},
                    (err: any, doc) => {
                        if(err) console.log(err)
                        else{
                            if (doc == null) console.log(`No encontrado`)
                            else console.log('Borrado correcto: '+ doc)
                        }
                    }
                )
                await db.desconectarBD()
                
                break
            
            case 0:
                console.log('\n--ADIÓS--')
                break

            default:
                console.log("Opción incorrecta")
                break
            
        }
    } while (n!=0);



}
main()