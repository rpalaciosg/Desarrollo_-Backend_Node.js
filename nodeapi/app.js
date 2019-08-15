var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'html');
app.engine('html', require('ejs').__express);

// Middlewares
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
// app.use('/pdf', express.static(path.join(__dirname, '/mnt/sda3/images/pdfs')))

/**
 * Conexión con la base de datos
 */
require('./lib/connectMongoose');
require('./models/Agente');

// middleware  en app.js direto de ejemplo 
app.use((req, res, next) => {
  // Un midleware tiene que hacer Una de 2 cosas:
  //  - Responder
  //res.send('ok');
  //  - O llamar a next
  // console.log('Peticion a', req.originalUrl);
  // next(new Error('cosa mal'));

  // si da error: Cannot set headers after they are sent to the cliente
  // Significa que has respondido 2 o más veces
  next();
});

/**
 * Rutas de mi API
 */
app.use('/apiv1/agentes', require('./routes/apiv1/agentes'));

//Variables globales para vistas
app.locals.title = 'NodeAPI';

/**
 * Rutas de mi aplicación web
 */
app.use('/',      require('./routes/index'));
app.use('/users', require('./routes/users'));

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // comprobar error de validación
  if (err.array) { //error de validación
    err.status = 422;
    const errInfo = err.array({ onlyFirstError: true})[0];
    err.message = isAPI(req) ? 
      {message: 'Not valid', errors: err.mapped()} :
      `Not Valid - ${errInfo.param} ${errInfo.msg}`;
  }

  res.status(err.status || 500);

  if (isAPI(req)) {
    res.json({success: false, error: err.message});
    return;
  }
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.render('error');
});

// función para saber si es una petición a un API
function isAPI(req) {
  return req.originalUrl.indexOf('/apiv') === 0;
}

module.exports = app;
