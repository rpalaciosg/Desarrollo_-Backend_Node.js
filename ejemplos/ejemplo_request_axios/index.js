'use strict';

const axios = require('axios');

//Se puede hacer de diferentes formas, puedo construir un objeto de opciones y despues dárselo o bien decirle de forma simplificada 
// que quiero hacer una peticion GET, vamos a hacer una peticion a el api de startworks.

//axios.get('https://swapi.co/api/starships/2/').then( httpResponse => {
axios.get('http://localhost:3000/apiv1/agentes').then( httpResponse => {
    if (!httpResponse.data.success) { 
        //..hacer lo que el cliente quiera hacer en caso de error
        return;//porque no quiero que se ejecute los de abajo
    }
    console.log(httpResponse.data.results[3]);
}).catch(err=> {
    console.log('Error:', err);
});

// Uso .then porque me devuelve una promesa. puedo ponerle un await adelante pero tendria que crear una función.