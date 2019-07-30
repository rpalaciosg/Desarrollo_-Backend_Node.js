'use strict';

const calculadora = require('./calculadora');

calculadora.loquesea = 'algo';

const calculadora2 = require('./calculadora');
const calculadora3 = require('./calculadora');

console.log(calculadora.add(1,6));
console.log(calculadora.substract(5,3));