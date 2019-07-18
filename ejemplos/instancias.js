'use strict';

// creamos una función para usarla como constructor de objetos
function Fruta(nombre) {
    // this es el objeto que se está creando 
    this.nombre = nombre;

    this.setNombre = function(valor) {
        this.nombre = valor;
    }

    this.getNombre = function() {
        return this.nombre;
    }
}

const limon = new Fruta('limon');

console.log(limon.nombre);