'use strict';

const fs = require('fs');

// funcion que retorna una promesa
const sleep = ms => new Promise(resolve => setTimeout(resolve, ms));


const writeFile = (nombreFichero, contenido) => new Promise ((resolve, reject) => {
    fs.writeFile(nombreFichero, contenido, (err) =>{
        if (err) {
            reject(err);
            return;
        }
        resolve();
    });
});

// para usar el await debo ponerlo dentro de una funcion async
async function main() {
    console.log('empiezo');
    await sleep(2000); // espera a que termine esta promesa
    console.log('sigo');
    await sleep(2000);
    console.log('sigo');
    await sleep(2000);
    console.log('sigo');
    await sleep(2000);
}

// main();

async function main1() {
    console.log('empiezo');
    for(let i=0; i<5;i++){
        await sleep(200); // espera a que termine esta promesa    
        console.log('sigo');
    }

    // JSON.parse('asdas');

    // try{
    //     await writeFile('/////Pepe.txt', 'hola');    
    // } catch(err) {
    //     console.log('fallo el writeFile');
    // }

    await writeFile('/////Pepe.txt', 'hola')
        .catch(err => {
            console.log('fallo el write file');
        });
    console.log('sigo then');
    
    console.log('terminado');
}

// sin un await dentro la promesa principal da error asi los capturamos o estionamos
// y con un único .catch() capturo tanto errores asincronos como sincronos.
main1().catch(err => {
    console.log('Hubo un error', err);
});
