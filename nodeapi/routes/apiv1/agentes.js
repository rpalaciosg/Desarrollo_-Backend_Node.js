'use strict';

const express = require('express');
const router = express.Router(); // Es un constructor que funciona con closures, ya que si se usa sin new es que usa closures.

const Agente = require('../../models/Agente');
//const Agente = mongoose.models.Agente() se podría también cargar el modelo primero cargando mongoose

router.get('/', async (req, res, next) => {

    //Agente.find().then este es thenable (es un objeto que simula ser una promesa pero no lo es)
    // listar Agentes con callbacks
    // Agente.find().exec((err, agentes) => {
    //     if (err) {
    //         next(err); // next pasandole algo va o escala error al gestor de errores en app.js
    //         return; // es xq no quiero que se ejecute lo siguiente, y termine ejecución aquí
    //     }
    //     res.json({ success: true, agentes: agentes});
    // });

    // usando promesas usando el await
    try{
        const agentes = await Agente.find().exec();
        res.json({ success: true, agentes: agentes });    
    } catch (err) {
        next(err);
    }
    
});

module.exports = router;