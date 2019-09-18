'use strict';

const fs = require('fs');
const fsPromises = fs.promises;
const conn = require('./connectMongoose');
const Agente = require('../models/Agente');

const file = '../data/anuncios.json';

// console.log(fs.readFileSync(file, 'utf8'));
// const anuncios = fs.readFileSync(file, 'utf8');
// console.log(anuncios);


// async function readInsert(filename) {
//     let filehandle = null;
//     try {
//         filehandle = await fsPromises.open(filename);
//         const data = JSON.parse(await fsPromises.readFile(filename, 'utf-8'));
//         console.log(data);    
//     } catch(err) {
//         console.log('Error', err);   
//         return; 
//     } finally {
//         if (filehandle) {
//             await filehandle.close();
//             console.log('Cierro archivo');
//         }
//     }
// }

const data = JSON.parse(fs.readFileSync(file, 'utf-8'));
async function cargarAgentes() { 
    try {
       await Agente.insertMany(data);
       console.log('Datos cargados.!');
       process.exit();
    } catch (err) {
        console.log('Error al cargar datos', e);
        process.exit();
    }
}

console.log('\n * Inicio * \n');

// gestionar eventos de conexión
conn.on('error', err => {
    console.log('Error de conexión', err);
    process.exit(1); // podría hacerme un catálogo de códigos de error.
});

conn.once('open', async () => {
    console.log('Conectado a MongoDB en ', mongoose.connection.name);
    console.log('Limpiar Base de datos..!');
    const resDel = await Agente.deleteMany();
    console.log('Base de datos borrada!');

    console.log('Cargando agentes.json!');
    cargarAgentes();
});