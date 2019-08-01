var express = require('express');
var router = express.Router();

// object destructuring
const { query, body, param, validationResult } = require('express-validator');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/paramenruta/:numero?', (req, res, next) => {
  console.log('req.params',req.params);
  res.send('ok');
});

router.get('/params/:id([0-9]+)/piso/:piso/puerta/:puerta', (req, res, next) => {
  console.log('req.params',req.params);
  res.send('ok');
});

// router.get('/enquerystring', (req, res, next) => {
//   console.log('req.query', req.query);
//   res.send('ok');
// });

// validador en query string
router.get('/enquerystring',
query('color').isLowercase().withMessage('must be lower case'),
query('talla').isNumeric().withMessage('must be numeric'),
(req, res, next) => {
  validationResult(req).throw();// lanza excepcion si no valida
  // si llego aquí es que los parámetros de entrada son validos
  console.log('req.query', req.query);
  res.send('ok');
});

router.post('/rutapost', (req, res, next) => {
  console.log('req.body', req.body);
  res.send('ok');
});

module.exports = router;
 