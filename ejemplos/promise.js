'use strict';

// usar los métodos de node que sean asincronos con promesas y no con callbacks
const fsPromise = require('fs').promises;
// fsPromise.open();
// fsPromise.readFile();

// función que retorna una promesa
function sleep(ms) {
    return new Promise((resolve, reject) => {
        // aquí va el código que hará resolverse o rechazarse la promesa
        setTimeout(() => {
            //Esto es una forma de controlar errores sincronos pero es mejor escalar el error 
            //a la función que está llamando a la promesa, esta promesa solo tendria que hacer solo una cosa.
            // try{
            //     JSON.parse('lkjlkjk');
            // } catch(err) {
            //     reject(err);
            // }
            resolve('algo');
            // reject(new Error('fatal'));
        }, ms);
    });
}

// version de una sola línea de la funcion de arriba
const sleep2 = ms => new Promise(resolve => setTimeout(resolve, ms));

// obtener la promesa
const promesa = sleep(2000);

console.log(promesa);

// consumir la promesa
promesa.then((algo)=>{
    console.log('la promesa se completó', algo); 
    return algo; // .then() devuelve una promesa, y si nosotros retornamos algo, esa promesa se 
                 // resuelve con ese algo.
}).then((algo)=>{
    return sleep(2000).then(()=>{// pongo return para que el then de afuera retorne la promesa que devuelve el then de sleep.
        console.log('otra cosa', algo);
        // throw new Error('chungo');
        return algo;
    });
}) // .then devuelve una promesa, que podemos consumir con otro .then()
.then((algo)=>{
    return sleep(2000).then(()=>{// pongo return para que el then de afuera retorne la promesa que devuelve el then de sleep.
        console.log('otra cosa1', algo);// si no pongo el return  lo que van a hacer es que se van a resolver en paralelo no esperando
        return algo;
    });
}).then((algo)=>{
    return sleep(2000).then(()=>{// pongo return para que el then de afuera retorne la promesa que devuelve el then de sleep.
        console.log('otra cosa2', algo);
        return algo;
    });
}).then((algo)=>{
    return sleep(2000).then(()=>{// pongo return para que el then de afuera retorne la promesa que devuelve el then de sleep.
        console.log('otra cosa3', algo);
        return algo;
    });
}).then((algo)=>{
    return sleep(2000).then(()=>{// pongo return para que el then de afuera retorne la promesa que devuelve el then de sleep.
        console.log('otra cosa4', algo);
        return algo;
    });
})
.catch(err => {
    console.log('promesa rechazada', err);
});

setTimeout(() => {
    // me suscribo a una promesa ya completada
    promesa.then(() => {
        console.log('promesa inicial completada');
    });
}, 10000);