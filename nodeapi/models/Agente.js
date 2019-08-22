'use strict';

const mongoose = require('mongoose');

// definimos un esquema
const agenteSchema = mongoose.Schema({
    name: String,
    age: Number
    //https://mongoosejs.com/docs/schematypes.html
    // email: {
    //     type: String,
    //     index: true,
    //     unique: true,
    //     default: ''
    // }
}
//, {collection: 'agentes'} // para saltarse la pluralización
 );

 // En los métodos de modelos de mongoose no usar arrow function (perdemos el this a la instancia)
agenteSchema.statics.list = function({filter, skip, limit, fields, sort}) {
    const query = Agente.find(filter);
    query.skip(skip);
    query.limit(limit);
    query.select(fields);
    query.sort(sort);
    return query.exec();
}
// Cuando se pasa un objeto js hace destructuring

// Creamos el modelo de agente
const Agente = mongoose.model('Agente', agenteSchema);

module.exports = Agente;