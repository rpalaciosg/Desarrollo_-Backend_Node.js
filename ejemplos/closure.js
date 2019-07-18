'use strict';

// esta funcion devuelve un objeto construido en su forma general y devulve
// la funcion retornada dentro de la funcion en variable porDos esta en otro contexto es un closure

function crear(numero) {
    return {
        porDos: function() {
            const resultado = numero * 2;
            console.log('el numero es', resultado);
            return resultado;
        }
    };
}

const calculador4 = crear(4);
const calculador6 = crear(6);

// console.log(calculador4.porDos());
// console.log(calculador6.porDos());


// - los métodos creados con closures no pierden nunca el acceso al objeto propietario
//setTimeout(calculador6.porDos, 2000);


// en esta prueba aun pasando el objeto a otro seguimos teniendo el valor del objeto que pedimos prestado.
// esto por que los closures no pierden el contexto jamas en su vida
const otroObjeto = {
    porDos: calculador4.porDos
};

otroObjeto.porDos();