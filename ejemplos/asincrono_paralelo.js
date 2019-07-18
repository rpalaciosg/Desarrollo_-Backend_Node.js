'use strict';

console.log('empiezo');

// función que escribe un texto en la consola tras dos segundos.
function escribeTras2Segundos(texto, callback) {
    setTimeout(function() {
        console.log(texto);
        callback();
    }, 2000)
}
// si usamos un bucle for, while, etc, lazamos todas las iteraciones en paralelo
// porque cada vuelta no espera a que termine la anterior.
for (let n=0; n<5; n++) {
    console.log(n);
    escribeTras2Segundos('Texto1', function (){
        console.log('termino');
    });
}

console.log('fin');


