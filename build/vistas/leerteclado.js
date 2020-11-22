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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.leeYN = exports.leeFecha = exports.leeDNI = exports.leeNumero = exports.leerTeclado = void 0;
const readline_1 = __importDefault(require("readline"));
let readlineI;
let leeLinea = (prompt) => {
    readlineI = readline_1.default.createInterface({
        input: process.stdin,
        output: process.stdout,
    });
    return new Promise((resuelta, rechazada) => {
        readlineI.question(`${prompt}: `, (cadenaEntrada) => {
            resuelta(cadenaEntrada);
        });
    });
};
exports.leerTeclado = (prompt) => __awaiter(void 0, void 0, void 0, function* () {
    let valor;
    valor = yield leeLinea(prompt);
    readlineI.close();
    return valor;
});
exports.leeNumero = (prompt) => __awaiter(void 0, void 0, void 0, function* () {
    let num;
    num = yield leeLinea(prompt);
    readlineI.close();
    let t = Array.from(num);
    let esNumero = true;
    t.forEach(e => {
        if (!e.charAt(0).match(/[0-9]/)) {
            esNumero = false;
        }
    });
    if (!esNumero) {
        throw 'ERROR no ha introducido un número válido';
    }
    else {
        return num;
    }
});
exports.leeDNI = (prompt) => __awaiter(void 0, void 0, void 0, function* () {
    let dni;
    dni = yield leeLinea(prompt);
    readlineI.close();
    if (dni.length != 9 || !dni.charAt(0).match(/[0-9]/) || !dni.charAt(1).match(/[0-9]/) || !dni.charAt(2).match(/[0-9]/)
        || !dni.charAt(3).match(/[0-9]/) || !dni.charAt(4).match(/[0-9]/) || !dni.charAt(5).match(/[0-9]/) || !dni.charAt(6).match(/[0-9]/)
        || !dni.charAt(7).match(/[0-9]/) || !dni.charAt(7).match(/[0-9]/)) {
        throw 'ERROR el DNI no tiene el formato correcto NNNNNNNNX en mayúsculas';
    }
    else {
        return dni;
    }
});
exports.leeFecha = (prompt) => __awaiter(void 0, void 0, void 0, function* () {
    let fecha;
    fecha = yield leeLinea(prompt);
    readlineI.close();
    if (fecha.length != 10 || !fecha.charAt(0).match(/[0-9]/) || !fecha.charAt(1).match(/[0-9]/) || !fecha.charAt(2).match(/[0-9]/)
        || !fecha.charAt(3).match(/[0-9]/) || !fecha.charAt(4).match(/-/) || !fecha.charAt(5).match(/[0-9]/) || !fecha.charAt(6).match(/[0-9]/)
        || !fecha.charAt(7).match(/-/) || !fecha.charAt(8).match(/[0-9]/) || !fecha.charAt(9).match(/[0-9]/)) {
        throw 'ERROR la fecha no tiene el formato correcto AAAA-MM-DD';
    }
    else {
        return fecha;
    }
});
exports.leeYN = (prompt) => __awaiter(void 0, void 0, void 0, function* () {
    let yn;
    yn = yield leeLinea(prompt);
    let letras = /Y|N/;
    readlineI.close();
    if (yn.length != 1 || !yn.charAt(0).match(letras)) {
        throw 'ERROR introduce Y para si y N para no';
    }
    else {
        return yn;
    }
});
