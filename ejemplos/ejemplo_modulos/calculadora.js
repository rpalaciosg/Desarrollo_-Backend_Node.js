'use strict';

console.log('inicializo el módulo');

function suma(a, b) {
    return a + b;
}


function resta(a,b) {
    return a - b;
}

// otra forma de exportar
module.exports.multiply = function(a,b) {
    return a * b;    
}

//
module.exports.add = suma;
//sintaxis abreviada, con un alias de module.exports antes usado
exports.substract = resta;
