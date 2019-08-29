'use strict';

// 1. crear un emisor de eventos
// Lo creamos con mayúsculas xq es como importar una clase
// events es una librería, la cual podemos ver en la documentación de Node.js
const EventEmitter = require('events');

// crear el emisor de eventos
const emisor = new EventEmitter();


// constante identifcador del evento
const EVENT_LLAMADA_TELEFONO = 'llamada de teléfono';


// 2. Subscribirnos a eventos es decir actuar ante eventos
// esto también es conocido como eventHandler
// el on() hereda del eventEmitter.
// la informacion que envia el event emitter la recibimos con cualquier nombre en el eventHandler
emisor.on(EVENT_LLAMADA_TELEFONO, info => {
    if (info.llamante === 'madre'){
        return;
    }
    console.log('ring ring');
});

// me suscribo al mismo evento pero haciendo otra cosa
// aparte de on() puedo usar once() que significa subscribirse solo la primera vez que salte el evento.
// solo se va a ejecutar una sola vez
emisor.once(EVENT_LLAMADA_TELEFONO, () => {
    console.log('brrr brrr');
});

// 3. emitir eventos - nos suscribimos a esos eventos
// el string pasado al emit() es el identificador del evento y quien quiera suscribirse deberá utilizar esta constante.
// se emite 2 veces, y podemos usar el nombre que queramos
// podemos acompañarlos de información, cosa que es necesaria, y lo habitual es colocar un objeto con la información a enviar
emisor.emit(EVENT_LLAMADA_TELEFONO, { llamante: 'madre'});
emisor.emit(EVENT_LLAMADA_TELEFONO, { llamante: 'madre'});