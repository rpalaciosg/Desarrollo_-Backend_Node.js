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
// llamar a una función con cada elemento de un array en serie, y al terminar llamar al callback de finalización
// también se usa la recursividad para hacer un bucle asincrono
function serie(arr, fn, callbackFinalizacion) {
    if (arr.length === 0) {
        callbackFinalizacion();
        return;
    }
    fn('texto' + arr.shift(), function() { //fn seria la llamada a escribeTras2Segundos
        serie(arr, fn, callbackFinalizacion);
    });
}

serie( [1,2,3,4,5], escribeTras2Segundos, function () {
    console.log('fin');    
});