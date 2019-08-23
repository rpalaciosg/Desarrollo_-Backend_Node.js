'use strict';

const express = require('express');
const router = express.Router(); // Es un constructor que funciona con closures, ya que si se usa sin new es que usa closures.

const Agente = require('../../models/Agente');
//const Agente = mongoose.models.Agente() se podría también cargar el modelo primero cargando mongoose

/**
 * GET /agentes
 * Devuelve una lista de agentes
 * http://localhost:3000/apiv1/agentes?limit=2&skip=2&fields=name age -_id
 */
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

        const name = req.query.name;
        const age = req.query.age;
        const skip = parseInt(req.query.skip);
        const limit = parseInt(req.query.limit);
        const fields = req.query.fields;
        const sort = req.query.sort;

        // si quiero hacer una busqueda fulltext

        const filter = {};

        if (name) {
            filter.name = name;
        }

        console.log(typeof age);

        if (typeof age !== 'undefined') filter.age = age;

        const agentes = await Agente.list({filter: filter, skip, limit, fields, sort});

        res.json({ success: true, results: agentes });    
    } catch (err) {
        next(err);
    }
});

/**
 * GET /agentes:id
 * Obtiene un agente
 */
router.get('/:id', async (req, res, next) => {
    try{
        const _id = req.params.id;

        const agente = await Agente.findById(_id).exec();
        if (!agente) {
            res.status(404).json({success: false});
            return;
        }
        res.json({success: true, result: agente });
    } catch (err) {
        next(err);
    }
});

/**
 * POST /agents
 * Crear un agente
 */

router.post('/', async(req, res, next) => {
    try {
       //console.log(req.body);
       const data = req.body;
       const agente = new Agente(data);

       const agenteGuardado = await agente.save();

       res.json({ success: true, result: agenteGuardado });
    } catch(err) {
        next(err);
    }
});

/**
 * PUT /agentes:id
 * Actualiza un agente
 */

 router.put('/:id', async(req, res, next) => {
     try {
         const _id = req.params.id;
         const data = req.body;

         //  const agenteGuardado = await Agente.findByIdAndUpdate({_id: _id}, data).exec();//devuelve objeto antes de guardar
         const agenteGuardado = await Agente.findOneAndUpdate({_id: _id}, data, {new: true}).exec();
         //new:true --> hace que retorne la versión del agente guardada en la base de datos.
         res.json({success: true, result: agenteGuardado});
     } catch (err) {
         next(err);
     }
 });

/**
 * DELETE /agentes:id
 * Elimina un agente
 */
router.delete('/:id', async (req, res, next) => {
    try {
        const _id = req.params.id;

        // await Agente.remove({_id: _id}).exec();
        await Agente.deleteOne({_id: _id}).exec();

        res.json({success: true});

    } catch (err) {
        next(err);
    }
});
module.exports = router;