'use strict'

// constructor de objetos
function Coche(ruedas) {
    this.ruedas = ruedas;
    this.cuantasRuedas = function() {
        console.log('tiene', this.ruedas, 'ruedas');
    }
}

const todoterreno = new Coche(4);

// - donde estén los parentesis () lo que hay a la izquierda del punto en esa instruccion es el this
// - en este caso es el todoterreno
//todoterreno.cuantasRuedas();

// - en este caso nos da undefined porque se pierde el this
// - este método se usó como callback por so no se pone parentesis, si se pone parentesesis, no puede acceder 
// - al objeto original
//setTimeout(todoterreno.cuantasRuedas, 2000);

setTimeout(todoterreno.cuantasRuedas.bind(todoterreno), 2000);

//const otraVariable = todoterreno.cuantasRuedas;

// - en este caso si seguimos la regla de oro de que donde esten los parentesis () lo que hay a la izquiera del punto
// - es el this en este caso como no hay ni punto ni nada, no hay this.
//otraVariable();

// - PAra no perder el this usamos bind
// const otraVariable = todoterreno.cuantasRuedas.bind(todoterreno);

// otraVariable();