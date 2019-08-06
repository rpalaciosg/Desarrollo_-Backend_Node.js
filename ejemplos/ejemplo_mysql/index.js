'use strict';

// cargo driver de mysql
const mysql = require('mysql');

// creo una conexión
const conexion = mysql.createConnection('mysql://usuariocurso:us3r@didimo.es:3306/cursonode');

// conecto
conexion.connect(err => {
    // lanzo consulta
    conexion.query('Select * from agentes', (err, rows, fields) => {
        if (err) {
            console.log('Error: ', err);
            return;
        }
        console.log(rows);
    });
});

