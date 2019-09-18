'use strict';

const fs = require('fs');
const fsPromises = fs.promises;

const conn = require('')

const file = '../data/anuncios.json';

// console.log(fs.readFileSync(file, 'utf8'));
// const anuncios = fs.readFileSync(file, 'utf8');
// console.log(anuncios);

async function readInsert(filename) {
    let filehandle = null;
    try {
        filehandle = await fsPromises.open(filename);
        const data = await fsPromises.readFile(filename, 'utf8');
        console.log(data);    
    } catch(err) {
        console.log('Error', err);   
        return; 
    } finally {
        if (filehandle) {
            await filehandle.close();
            console.log('Cierro archivo');
        }
    }
}

console.log('\n * Inicio * \n');
readInsert(file);