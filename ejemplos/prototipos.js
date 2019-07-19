'use strict';

// definimos una función constructora de objetos

function Persona(nombre) {
    this.nombre = nombre;    
}

// construir objeto
const luis = new Persona('Luis');
const pepe = new Persona('Pepe');
const manolo = new Persona('Manolo');

// console.log(Persona.prototype);

// El prototipo está en el constructor del prototipo
Persona.prototype.saluda = function() {
    console.log('Hola, me llamo', this.nombre);
}

luis.saluda();
// pepe.saluda();
// manolo.saluda();