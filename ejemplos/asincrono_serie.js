'use strict';

console.log('empiezo');

// función que escribe un texto en la consola tras dos segundos.
function escribeTras2Segundos(texto, callback) {
    setTimeout(function() {
        console.log(texto);
        callback();
    }, 2000)
}

// Bucle asíncrono en serie
// llamar a una función n veces en serie, y al terminar llamar al callback de finalización
// Se usa la recursividad para hacer un bucle asincrono
function serie(n, fn, callbackFinalizacion) {
    if (n == 0) {
        callbackFinalizacion();
        return;
    }
    n--;
    fn('texto' + n, function() { //fn seria la llamada a escribeTras2Segundos
        serie(n, fn, callbackFinalizacion);
    });
}

serie( 5, escribeTras2Segundos, function () {
    console.log('fin');    
});

console.log('fin');


