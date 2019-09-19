'use strict';

const fs = require('fs');
const fsPromises = fs.promises;
const conn = require('./connectMongoose');
const Agente = require('../models/Agente');

const file = '../data/anuncios.json';


const data = JSON.parse(fs.readFileSync(file, 'utf-8'));

async function cargarAgentes() {     
    // data.forEach( (a,i) => {
    //     a.anuncios[i];
    //     await Agente.insertMany()
    // });
    try {
       await Agente.insertMany(data.anuncios);
       console.log('Datos cargados.!', data.anuncios);
       process.exit();
    } catch (err) {
        console.log('Error al cargar datos', e);
        process.exit();
    }
}

// Idea de crear los indice en la base, ver si es correcto crearlos aqui o en el esquema
async function crearIndices() { 
    // Agente.index({})
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
    console.log('Base de datos borrada!', resDel.ok, resDel.deletedCount);

    console.log('Cargando agentes.json!');
    await cargarAgentes();
    console.log('Terminado..!');
    conn.close();
    process.exit();
});