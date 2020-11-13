"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Locales = exports.Local = void 0;
const mongoose_1 = require("mongoose");
const Ordenador_1 = require("./Ordenador");
const Persona_1 = require("./Persona");
class Local {
    constructor(direccion, encargado, ordenadores, empleados) {
        this._direccion = direccion;
        this._encargado = encargado;
        this._ordenadores = ordenadores;
        this._empleados = empleados;
    }
    get direccion() {
        return this._direccion;
    }
    set direccion(direccion) {
        this._direccion = direccion;
    }
    get encargado() {
        return this._encargado;
    }
    set encargado(encargado) {
        this._encargado = encargado;
    }
    get ordenadores() {
        return this._ordenadores;
    }
    set ordenadores(ordenadores) {
        this._ordenadores = ordenadores;
    }
    get empleados() {
        return this._empleados;
    }
    set empleados(empleados) {
        this._empleados = empleados;
    }
    imprimirOrdenadores() {
        for (let o of this._ordenadores) {
            console.log(o.imprimirOrdenador());
        }
    }
}
exports.Local = Local;
const localSchema = new mongoose_1.Schema({
    _direccion: { type: String, unique: true },
    _encargado: { type: Persona_1.personaSchema },
    _ordenadores: { type: [Ordenador_1.ordenadorSchema] },
    _empleados: { type: [Persona_1.personaSchema] }
});
exports.Locales = mongoose_1.model('Locales', localSchema);
