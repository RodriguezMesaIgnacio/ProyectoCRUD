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
const leerteclado_1 = require("./vistas/leerteclado");
const Local_1 = require("./models/Local");
const Persona_1 = require("./models/Persona");
const Ordenador_1 = require("./models/Ordenador");
const database_1 = require("./database/database");
const menu_1 = require("./vistas/menu");
const main = () => __awaiter(void 0, void 0, void 0, function* () {
    let n;
    do {
        n = yield menu_1.menu();
        switch (n) {
            case 1:
                let l1;
                let p1;
                try {
                    let direccion = yield leerteclado_1.leerTeclado('Introducir la dirección del nuevo Local');
                    let dni = yield leerteclado_1.leeDNI('Introducir DNI (NNNNNNNNL) del encargado');
                    let nombre = yield leerteclado_1.leerTeclado('Introducir nombre del encargado');
                    let apellidos = yield leerteclado_1.leerTeclado('Introducir apelidos del encargado');
                    let telefono = parseInt(yield leerteclado_1.leeNumero('Indroducir teléfono del encargado'));
                    let fecha = new Date(yield leerteclado_1.leeFecha('Introducir fecha de nacimiento (AAAA-MM-DD) del encargado'));
                    let sueldo = parseInt(yield leerteclado_1.leerTeclado('Introducir sueldo del encargado'));
                    p1 = new Persona_1.Persona(dni, nombre, apellidos, telefono, fecha, sueldo);
                    let o = new Array();
                    let p = new Array();
                    l1 = new Local_1.Local(direccion, p1, o, p);
                    yield database_1.db.conectarBD();
                    const dSchema = {
                        _direccion: l1.direccion,
                        _encargado: l1.encargado,
                        _ordenadores: l1.ordenadores,
                        _empleados: l1.empleados,
                    };
                    const oSchema = new Local_1.Locales(dSchema);
                    yield oSchema.save()
                        .then((doc) => console.log('Salvado Correctamente: ' + doc))
                        .catch((err) => console.log('Error: ' + err));
                    yield database_1.db.desconectarBD();
                }
                catch (error) {
                    console.log(error);
                }
                break;
            case 2:
                yield database_1.db.conectarBD();
                let tl;
                let query;
                query = yield Local_1.Locales.find({});
                for (tl of query) {
                    let encargado = new Persona_1.Persona(tl._encargado._dni, tl._encargado._nombre, tl._encargado._apellidos, tl._encargado._telefono, tl._encargado._fechaNacimiento, tl._encargado._sueldo);
                    let empleados = new Array();
                    for (let e of tl._empleados) {
                        let te = new Persona_1.Persona(e._dni, e._nombre, e._apellidos, e._telefono, e._fechaNacimiento, e._sueldo);
                        empleados.push(te);
                    }
                    let ordenadores = new Array();
                    for (let o of tl._ordenadores) {
                        let to = new Ordenador_1.Ordenador(o._nombre, o._precio, o._marca, o._fechaCompra, o._operativo);
                        ordenadores.push(to);
                    }
                    let l = new Local_1.Local(tl._direccion, encargado, ordenadores, empleados);
                    console.log(l.imprimirLocal());
                }
                yield database_1.db.desconectarBD();
                break;
            case 3:
                let localCargado = null;
                try {
                    let dir = yield leerteclado_1.leerTeclado("Introduce la direccion del local");
                    yield database_1.db.conectarBD();
                    let tl;
                    let query = yield Local_1.Locales.find({});
                    for (tl of query) {
                        if (dir == tl._direccion) {
                            let encargado = new Persona_1.Persona(tl._encargado._dni, tl._encargado._nombre, tl._encargado._apellidos, tl._encargado._telefono, tl._encargado._fechaNacimiento, tl._encargado._sueldo);
                            let empleados = new Array();
                            for (let e of tl._empleados) {
                                let te = new Persona_1.Persona(e._dni, e._nombre, e._apellidos, e._telefono, e._fechaNacimiento, e._sueldo);
                                empleados.push(te);
                            }
                            let ordenadores = new Array();
                            for (let o of tl._ordenadores) {
                                let to = new Ordenador_1.Ordenador(o._nombre, o._precio, o._marca, o._fechaCompra, o._operativo);
                                ordenadores.push(to);
                            }
                            localCargado = new Local_1.Local(tl._direccion, encargado, ordenadores, empleados);
                        }
                    }
                    yield database_1.db.desconectarBD();
                }
                catch (error) {
                    console.log(error);
                }
                if (localCargado != null) {
                    let n2;
                    do {
                        n2 = yield menu_1.menu2();
                        switch (n2) {
                            case 1:
                                try {
                                    let dni = yield leerteclado_1.leeDNI('Introducir DNI (NNNNNNNNL)');
                                    let nombre = yield leerteclado_1.leerTeclado('Introducir nombre del empleado');
                                    let apellidos = yield leerteclado_1.leerTeclado('Introducir apelidos del empleado');
                                    let telefono = parseInt(yield leerteclado_1.leeNumero('Indroducir teléfono del empleado'));
                                    let fecha = new Date(yield leerteclado_1.leeFecha('Introducir fecha de nacimiento (AAAA-MM-DD) del empleado'));
                                    let sueldo = parseInt(yield leerteclado_1.leerTeclado('Introducir sueldo del empleado'));
                                    let p1 = new Persona_1.Persona(dni, nombre, apellidos, telefono, fecha, sueldo);
                                    localCargado.addEmpleado(p1);
                                }
                                catch (error) {
                                    console.log(error);
                                }
                                console.log(`\n Estos son los empleados del local ${localCargado.imprimirLocal()}:`);
                                console.log('**************************');
                                localCargado.imprimirEmpleados();
                                yield database_1.db.conectarBD();
                                yield Local_1.Locales.findOneAndUpdate({ _direccion: localCargado.direccion }, {
                                    _direccion: localCargado.direccion,
                                    _encargado: localCargado.encargado,
                                    _ordenadores: localCargado.ordenadores,
                                    _empleados: localCargado.empleados
                                }, {
                                    runValidators: true
                                })
                                    .catch((err) => console.log('ERROR: ' + err));
                                yield database_1.db.desconectarBD();
                                break;
                            case 2:
                                console.log(`\n Estos son los empleados del local ${localCargado.imprimirLocal()}:`);
                                console.log('**************************');
                                localCargado.imprimirEmpleados();
                                break;
                            case 3:
                                try {
                                    let nombre = yield leerteclado_1.leerTeclado('Introducir nombre del PC');
                                    let precio = parseInt(yield leerteclado_1.leeNumero('Introducir precio del PC'));
                                    let marca = yield leerteclado_1.leerTeclado('Introducir marca del PC');
                                    let fechaCompra = new Date(yield leerteclado_1.leeFecha('Indroducir fecha de compra del PC'));
                                    let operativo = yield leerteclado_1.leeYN('Está el PC operativo [Y-N]');
                                    let o;
                                    if (operativo == 'Y') {
                                        o = true;
                                    }
                                    else {
                                        o = false;
                                    }
                                    let o1 = new Ordenador_1.Ordenador(nombre, precio, marca, fechaCompra, o);
                                    localCargado.addOrdenador(o1);
                                }
                                catch (error) {
                                    console.log(error);
                                }
                                console.log(`\n Estos son los ordenadores del local ${localCargado.imprimirLocal()}:`);
                                console.log('**************************');
                                localCargado.imprimirOrdenadores();
                                yield database_1.db.conectarBD();
                                yield Local_1.Locales.findOneAndUpdate({ _direccion: localCargado.direccion }, {
                                    _direccion: localCargado.direccion,
                                    _encargado: localCargado.encargado,
                                    _ordenadores: localCargado.ordenadores,
                                    _empleados: localCargado.empleados
                                }, {
                                    runValidators: true
                                })
                                    .catch((err) => console.log('ERROR: ' + err));
                                yield database_1.db.desconectarBD();
                                break;
                            case 4:
                                console.log(`\n Estos son los ordenadores del local ${localCargado.imprimirLocal()}:`);
                                console.log('**************************');
                                localCargado.imprimirOrdenadores();
                                break;
                            case 5:
                                console.log(`\n Este el sueldo medio del local ${localCargado.imprimirLocal()}:`);
                                console.log('**************************');
                                console.log(localCargado.sueldoMedio() + '€');
                                break;
                            case 0:
                                console.log('SALIENDO DEL LOCAL SELECCIONADO');
                                break;
                            default:
                                console.log("Opción incorrecta");
                                break;
                        }
                    } while (n2 != 0);
                }
                else {
                    console.log('No existe local con esa dirección');
                }
                break;
            case 4:
                let dir = yield leerteclado_1.leerTeclado("Dirección del local que desea eliminar");
                yield database_1.db.conectarBD();
                yield Local_1.Locales.findOneAndDelete({ _direccion: dir }, (err, doc) => {
                    if (err)
                        console.log(err);
                    else {
                        if (doc == null)
                            console.log(`No encontrado`);
                        else
                            console.log('Borrado correcto: ' + doc);
                    }
                });
                yield database_1.db.desconectarBD();
                break;
            case 0:
                console.log('\n--ADIÓS--');
                break;
            default:
                console.log("Opción incorrecta");
                break;
        }
    } while (n != 0);
});
main();
