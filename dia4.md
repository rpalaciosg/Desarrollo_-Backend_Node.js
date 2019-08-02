# Día 4 Node.js

## Express

### Validaciones

PAra las validaciones podemos usar express.validator para ahorrarnos trabajo. Pero no es necesario algun middleware porque lo podemos hacer nosotros mismos. Es nuestra responsabilidad validar la información que ingresen a nuestro servidor, para reducir bugs, mejorar la calidad de la información, y para que esté lo mejor validada posible.

Para instalarlo hacemos

```sh
npm install express-validator
```

`Express-validaor` nos da un arsenal de validaciones, como de tarjetas, email, y un monton.

Los ejemplos lo tenrmos en `index.js` que validavamos el query string.

```js
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
```

> Nota en caso de error 
**Nota:** En caso de que la app de express nos de un error `EADDRINUSE` eso significa que hay otro proceso usando ese puerto.

Lo que vamos a hacer ahora, es agregar en el middleware de errores en app.js, para que gestione bien el tipo de error que estamos lanzando y se vea con un mensaje mejor.

En el error handler hacemos lo siguiente.
El `err.array` es un método de errores de express-validator

```js
// error handler
app.use(function(err, req, res, next) {
  // comprobar error de validación
  if (err.array) { //error de validación
    err.status = 422;
    const errInfo = err.array({ onlyFirstError: true})[0];
    err.message = `Not Valid - ${errInfo.param} ${errInfo.msg}`;
  }
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});
```

Debemos responder co un códito de estado http:
- 200 en adelante, 
- 300 en adelante, es una redirección, el servidor dice, lo que me pediste no lo tengo, pero tienes que ir a pedirlo a otro sitio.
- 400 en adelante, errores 
  - 422, es usual en errores de validacion

Si es que en un error de validación el api devuelve un eror 500 ps da mala imagen, y se nota que es de mala calidad y que no se ha dado el tiempo necesario.