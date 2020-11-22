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
exports.menu2 = exports.menu = void 0;
const leerteclado_1 = require("./leerteclado");
exports.menu = () => __awaiter(void 0, void 0, void 0, function* () {
    let n;
    console.log('\n');
    console.log('1.- CREAR LOCAL');
    console.log('2.- LISTAR LOCALES');
    console.log('3.- SELECCIONAR LOCAL');
    console.log('4.- BORRAR LOCAL');
    console.log('0.- SALIR');
    n = parseInt(yield leerteclado_1.leerTeclado('--OPCIÓN--'));
    return n;
});
exports.menu2 = () => __awaiter(void 0, void 0, void 0, function* () {
    let n;
    console.log('\n');
    console.log('1.- AÑADIR EMPLEADO');
    console.log('2.- LISTAR EMPLEADOS');
    console.log('3.- AÑADIR ORDENADOR');
    console.log('4.- LISTAR ORDENADORES');
    console.log('5.- SUELDO MEDIO DE LOS EMPLEADOS');
    console.log('0.- SALIR');
    n = parseInt(yield leerteclado_1.leerTeclado('--OPCIÓN--'));
    return n;
});
