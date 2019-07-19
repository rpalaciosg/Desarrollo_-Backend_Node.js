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


// Herencia de persona ---------------------------------------------------------

// constructor de agentes
function Agente(nombre) {
    // heredar el constructor de personas
    Persona.call(this, nombre);
}

// heredamos sus propiedades y métodos con estas 2 líneas
Agente.prototype = Object.create(Persona.prototype);
Agente.prototype.constructor = Agente; // restituye el constructor ya que en línea anterior lo pisa un constructor personas

const smith = new Agente('Smith');

smith.saluda();

console.log(
    smith instanceof Agente, // smith es una instancia de agente
    smith instanceof Persona,
    smith instanceof Object
);