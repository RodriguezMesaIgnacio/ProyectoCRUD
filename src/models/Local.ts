import {Schema, model} from 'mongoose'
import { Ordenador, ordenadorSchema } from './Ordenador'
import { Persona, personaSchema } from './Persona'

export class Local{
    private _direccion : string
    private _encargado : Persona
    private _ordenadores : Array<Ordenador>
    private _empleados : Array<Persona>

    constructor(direccion:string, encargado:Persona, ordenadores:Array<Ordenador>, empleados:Array<Persona>){
        this._direccion=direccion
        this._encargado=encargado
        this._ordenadores=ordenadores
        this._empleados=empleados
    }

    get direccion(){
        return this._direccion
    }

    set direccion(direccion:string){
        this._direccion=direccion
    }

    get encargado(){
        return this._encargado
    }

    set encargado(encargado:Persona){
        this._encargado=encargado
    }

    get ordenadores(){
        return this._ordenadores
    }

    set ordenadores(ordenadores:Array<Ordenador>){
        this._ordenadores=ordenadores
    }

    get empleados(){
        return this._empleados
    }

    set empleados(empleados:Array<Persona>){
        this._empleados=empleados
    }

    imprimirOrdenadores(){
        for (let o of this._ordenadores){
            console.log(o.imprimirOrdenador())
        }
    }

    imprimirEmpleados(){
        for(let e of this._empleados){
            console.log(e.imprimirPersona())
        }
    }

    addOrdenador(o:Ordenador){
        this._ordenadores.push(o)
    }

    addEmpleado(e:Persona){
        this._empleados.push(e)
    }

    sueldoMedio(){
        let total=0
        let empleados=0
        for (let e of this._empleados){
            empleados++
            total=total+e.sueldo
        }
        return total/empleados
    }

    imprimirLocal(){
        return `Local con dirección ${this.direccion} y encargado ${this._encargado.nombre} ${this._encargado.apellidos} con DNI ${this._encargado.dni}`
    }

}

export type tLocal = {
    _direccion : string
    _encargado : Persona
    _ordenadores : Array<Ordenador>
    _empleados : Array<Persona>
}

const localSchema = new Schema({
    _direccion: {type: String, unique: true},
    _encargado: {type: personaSchema, unique: true},
    _ordenadores: {type: [ordenadorSchema]},
    _empleados: {type: [personaSchema]}
})

export const Locales = model('Locales', localSchema)