import { leerTeclado, leeNumero, leeDNI, leeFecha, leeYN } from './vistas/leerteclado'
import { Local, Locales} from './models/Local'
import { Persona } from './models/Persona'
import { Ordenador } from './models/Ordenador'
import { db } from './database/database'
import { menu, menu2, menu3 } from './vistas/menu'

const main = async () => {
    let n: number
    do {
        n = await menu()
        switch(n){

            case 1:
                let l1 : Local
                let p1 : Persona
                try {
                    let nombreL= await leerTeclado('Introduce el nombre del nuevo Local')
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
                    l1=new Local(nombreL, direccion, p1, o , p)
    
                    await db.conectarBD()
                    const dSchema={
                        _nombre : l1.nombre,
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
                        to.ultActualizacion=o._ultActualizacion
                        ordenadores.push(to)
                    }
                    let l = new Local(tl._nombre, tl._direccion, encargado, ordenadores, empleados)
                    console.log(l.imprimirLocal())
                }
                await db.desconectarBD()

                break
                
            case 3:
                let localCargado = null
                try {
                    let nombre = await leerTeclado("Introduce el nombre del local")
                    await db.conectarBD()
                    let tl : any
                    let query = await Locales.find({})
                    for (tl of query){
                        if (nombre==tl._nombre){
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
                                to.ultActualizacion=o._ultActualizacion
                                ordenadores.push(to)
                            }
                            localCargado = new Local(tl._nombre, tl._direccion, encargado, ordenadores, empleados)
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
                                        _nombre:localCargado.nombre,
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
                                        _nombre:localCargado.nombre,
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

                                console.log(`\n Este es el sueldo medio del local ${localCargado.imprimirLocal()}:`)
                                console.log('**************************')
                                console.log(localCargado.sueldoMedio()+'€')

                                break

                            case 6:

                                console.log(`\n Este es la edad media del local ${localCargado.imprimirLocal()}:`)
                                console.log('**************************')
                                console.log(localCargado.edadMedia()+' años')

                                break
                            
                            case 7:

                                let i=localCargado.reparar()
                                for (let n of i){
                                    console.log(`El ${n.nombre} debe ser reparado`)
                                }
                                break

                            case 8:

                                if (localCargado.ordenadores.length==0){
                                    console.log('No existen ordenadores en este local')
                                } else {
                                    let pc=await leerTeclado('Introduzca el nombre del PC')
                                    let index:number=-1
                                    for(let o of localCargado.ordenadores){
                                        if(o.nombre==pc){
                                            index=localCargado.ordenadores.indexOf(o)
                                         }
                                    }
                                    if(index!=-1){
                                        let n3:number
                                        let pc=localCargado.ordenadores[index]
                                        do {
                                            n3 = await menu3()
                                            switch (n3){

                                                case 1:
                                                    console.log(pc.reparar())
                                                    break
                                                
                                                case 2:
                                                    let v = parseInt( await leeNumero('Introduce el nuevo valor del PC'))
                                                    pc.precio=v
                                                    break
                                                case 0:
                                                    console.log('SALIENDO DEL PC SELECCIONADO')
                                                    break
                                                default:
                                                    console.log('Opción incorrecta')
                                                    break

                                            }
                                        } while (n3!=0); 
                                    } else {
                                        console.log('No existe un PC con ese nombre')
                                    }
                                }

                                await db.conectarBD()
                                await Locales.findOneAndUpdate(
                                    {_direccion:localCargado.direccion},
                                    {
                                        _nombre:localCargado.nombre,
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
                            
                            case 9: 
                                let fecha=new Date(await leeFecha('Introduce la fecha límite de los ordenadores a revisar'))
                                let o = localCargado.revisar(fecha)
                                for (let i of o){
                                    console.log(`El ${i.nombre} se actualizo por ultima vez ${i.ultActualizacion} y debería ser revisado`)
                                }
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