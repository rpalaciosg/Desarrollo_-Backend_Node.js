'use strict';

const axios = require('axios');

axios.get('http://localhost:3000/apiv1/agentes').then( httpResponse => {
    if (!httpResponse.data.success) { 
        //..hacer lo que el cliente quiera hacer en caso de error
        return;//porque no quiero que se ejecute los de abajo
    }
    console.log(httpResponse.data.results[3]);
}).catch(err=> {
    console.log('Error:', err);
});