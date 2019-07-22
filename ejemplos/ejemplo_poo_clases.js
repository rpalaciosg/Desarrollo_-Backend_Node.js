'use strict';

class Persona {
    constructor (nombre, apellido, edad) {
        this.nombre = nombre;
        this.apellido = apellido;
        this.edad = edad;
        this.pregunta = '¿Como estás?';
    }

    saludar() {
        console.log(`Hola, soy ${this.nombre} ${this.apellido}`);
    }

    preguntar (pregunta = '') {
        if (pregunta === '') pregunta = this.pregunta;
        console.log(pregunta);
    }
}

const persona = new Persona('Celia', 'Ordoñez','27');
persona.saludar();
persona.preguntar();


class Ingeniero extends Persona {
    constructor (nombre, apellido, edad, especialidad) {
        super(nombre, apellido, edad);
        this.especialidad = especialidad;
        this.profesion = 'ingeniero';
    }
}

let richard = new Ingeniero('Richard', 'Palacios', '28', 'Software');
console.log(richard);
richard.saludar();
richard.preguntar();
richard.preguntar('¿Como haces un API?');