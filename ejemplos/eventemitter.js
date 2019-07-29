'use strict';

// crear un emisor de eventos
const EventEmitter = require('events');

const emisor = new EventEmitter();

const EVENT_LLAMADA_TELEFONO = 'llamada de teléfono';

// actuar ante eventos, nos suscribimos a este evento
emisor.on(EVENT_LLAMADA_TELEFONO, info => {
    if (info.llamante === 'madre'){
        return;
    }
    console.log('ring ring');
});

// suscribirme solo a la primera vez que salte el evento
emisor.once(EVENT_LLAMADA_TELEFONO, () => {
    console.log('brrr brrr');
});

// emitir eventos - nos suscribimos a esos eventos
emisor.emit(EVENT_LLAMADA_TELEFONO, { llamante: 'madre'});
emisor.emit(EVENT_LLAMADA_TELEFONO, { llamante: 'madre'});
