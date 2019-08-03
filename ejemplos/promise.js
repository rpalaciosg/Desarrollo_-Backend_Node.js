'use strict';
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

// obtener la promesa
const promesa = sleep(2000);

console.log(promesa);

// consumir la promesa
promesa.then((algo)=>{
    console.log('la promesa se completó', algo);    
}).then(()=>{
    return sleep(2000).then(()=>{// pongo return para que el then de afuera retorne la promesa que devuelve el then de sleep.
        console.log('otra cosa');
        // throw new Error('chungo');
    });
}) // .then devuelve una promesa, que podemos consumir con otro .then()
.then(()=>{
    return sleep(2000).then(()=>{// pongo return para que el then de afuera retorne la promesa que devuelve el then de sleep.
        console.log('otra cosa1');// si no pongo el return  lo que van a hacer es que se van a resolver en paralelo no esperando
    });
}).then(()=>{
    return sleep(2000).then(()=>{// pongo return para que el then de afuera retorne la promesa que devuelve el then de sleep.
        console.log('otra cosa2');
    });
}).then(()=>{
    return sleep(2000).then(()=>{// pongo return para que el then de afuera retorne la promesa que devuelve el then de sleep.
        console.log('otra cosa3');
    });
}).then(()=>{
    return sleep(2000).then(()=>{// pongo return para que el then de afuera retorne la promesa que devuelve el then de sleep.
        console.log('otra cosa4');
    });
})
.catch(err => {
    console.log('promesa rechazada', err);
});