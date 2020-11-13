"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const main = () => __awaiter(void 0, void 0, void 0, function* () {
    //  INTRODUCIR PERSONA    INTRODUCIR PERSONA    INTRODUCIR PERSONA    INTRODUCIR PERSONA    INTRODUCIR PERSONA    INTRODUCIR PERSONA  
    // let dni =  await leerTeclado('DNI')
    // let nombre = await leerTeclado('Nombre')
    // let apellidos = await leerTeclado('Apellidos')
    // let telefono = parseInt(await leerTeclado('Telefono'))
    // let fecha = new Date(await leerTeclado('fecha formato AAAA-MM-DD'))
    // let sueldo = parseInt(await leerTeclado('Sueldo'))
    // p1= new Persona(dni, nombre, apellidos, telefono, fecha,sueldo)
    // await db.conectarBD()
    // const dSchema={
    //     _dni : p1.dni,
    //     _nombre : p1.nombre,
    //     _apellidos : p1.apellidos,
    //     _telefono : p1.telefono,
    //     _fechaNacimiento : p1.fechaNacimiento,
    //     _sueldo : p1.sueldo
    // }
    // const oSchema = new Personas(dSchema)
    // await oSchema.save()
    //     .then( (doc) => console.log('Salvado Correctamente: '+ doc) )
    //     .catch( (err: any) => console.log('Error: '+ err)) 
    // await db.desconectarBD()  
    //         BUSCAR POR DNI  BUSCAR POR DNI  BUSCAR POR DNI  BUSCAR POR DNI  BUSCAR POR DNI  BUSCAR POR DNI
    // await db.conectarBD()
    // await Personas.findOne(
    //     {_dni:"4"},
    //     (error, p: any) => {
    //         if (error) console.log(error)
    //         else {
    //             if (p==null) console.log('No existe persona con ese DNI')
    //             else {
    //                 console.log(p)
    //                 p1= new Persona(p._dni, p._nombre, p._apellidos, p._telefono, p._fechaNacimiento, p._sueldo)
    //                 console.log(p1.imprimirPersona())
    //                 console.log(p1.edad())
    //             }
    //         }
    //     }
    // )  
    // await db.desconectarBD()
    //   INTRODUCIR LOCAL    INTRODUCIR LOCAL   INTRODUCIR LOCAL   INTRODUCIR LOCAL   INTRODUCIR LOCAL 
    // let l1 : Local
    // let p1 : Persona
    // let dni =  await leerTeclado('DNI')
    // let nombre = await leerTeclado('Nombre')
    // let apellidos = await leerTeclado('Apellidos')
    // let telefono = parseInt(await leerTeclado('Telefono'))
    // let fecha = new Date(await leerTeclado('fecha formato AAAA-MM-DD'))
    // let sueldo = parseInt(await leerTeclado('Sueldo'))
    // p1= new Persona(dni, nombre, apellidos, telefono, fecha,sueldo)
    // let direccion =  await leerTeclado('Dir')
    // let encargado = p1
    // let o : Array<Ordenador> = new Array()
    // o.push(new Ordenador("O1",45, "Asus", new Date('2000-02-11'), true))
    // o.push(new Ordenador("O2",45, "Asus", new Date('2000-02-11'), true))
    // o.push(new Ordenador("O3",45, "Asus", new Date('2000-02-11'), true))
    // let p : Array<Persona> = new Array()
    // l1=new Local(direccion, encargado, o , p)
    // await db.conectarBD()
    // const dSchema={
    //     _direccion : l1.direccion,
    //     _encargado : l1.encargado,
    //     _ordenadores : l1.ordenadores,
    //     _empleados : l1.empleados,
    // }
    // const oSchema = new Locales(dSchema)
    // await oSchema.save()
    //     .then( (doc) => console.log('Salvado Correctamente: '+ doc) )
    //     .catch( (err: any) => console.log('Error: '+ err)) 
    // await db.desconectarBD()
    //  CARGAR LOCAL Y VER ORDENADORES
    // await db.conectarBD()
    // await Locales.findOne(
    //     {_direccion:'5'},
    //     (error, l: any) => {
    //         if (error) console.log(error)
    //         else {
    //             if (l==null) console.log('No existe local con esa dirección')
    //             else {
    //                 let o : tOrdenador
    //                 for (o of l._ordenadores){
    //                     let o1 = new Ordenador(o._nombre, o._precio, o._marca, o._fechaCompra, o._operativo)
    //                     console.log(o1.imprimirOrdenador())
    //                 }
    //             }
    //         }
    //     }
    // )  
    // await db.desconectarBD()
});
main();
