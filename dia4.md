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

### Métodos de respuesta

Hasta ahora respondiamos a todas las peticiones haciendo un `res.send()` pero hay otros métodos convenientes como:

#### Método de respuesta - send
res.send() : es el metodo generico, puedo enviar buffer, string, objetos o un array

#### MEtodo de respuesta - json

Es casi lo mismo que res.send, que ajsuta un posible null o undefined para que salga bien en JSON, ayuda a ver que en el código se esta usando jason para responder.

#### MEtodo de respuesta - download
Provoca esa tipica ventana que sale en el browser, `guardar como`, pone una cabecera a la respuesta.

#### MEtodo de respuesta - redirect
Responder una redireccion con el status code 302 por defecto (found). Es una respuesta típica cuando el que nos hace una request un browser. Respondemos una indicación diciendo, 302, ve a este sitio `/foo/bar`, si es una app android, java, o c# puede que no siga el redirect.

#### Metodo de respuesta - render

#### MEtodo de respuesta - sendFile
Envía un fichero como si fuera un estático.

Además de la ruta del fichero acepta un objeto de opciones y un calback para comprobar el resultado de la transmisión.

### Middleware de terceros

Podemos intalarlos como npm y cargarlos como los anteriores.
Hay una lista de los más usados:

https://expressjs.com/en/resources/middleware.html

```sj
$ npm
```
- multer: nos sirve para recoger peticiones de tipo POST con formato multipar/form-data

## Template Engines - Vistas

Como usar las  vista en Express? Express tiene la capacidad de gestionar las vistas. Tiene un motor de vistas que permite enchufar las vistas.

### Templates

Además sirve html estáticos.
Express por defecto monta Jade, podemos cambiarlo fácilmente, por ejemplo a EJS que es uno de los más usados.

> No se usa mucho `Jade` ya que no muchas personas la conocen. EJS usa el html5 típico. No es que Jade tenga algo malo es muy bueno.

Hay muchos motores de template.


A parte de EJS, y si es que se quiere algo mas potente es handlebars, nunjucks, pero implica aprender más cosas.


Para instalar un sistema de templates lo instalaremos con `npm install ejs --save`
- views, es el directorio donde estan nuestras plantilass por ejemplo:
  ```js
  app.set('views', './viewss')
  ```
- view engine, el template engine a usar, por ejemplo:
  ```js
  app.set('view engine', 'jade') //o
  app.set('view engine', 'ejs')
  ```

  Lo podemos cambiar, express lo carga automáticamente y ya podremos usarlo. Primero hay que instalar el npm del motor de vistas que queramos.

--------------------------------------------------
  Hay 2 tipos de Websites:
  - Multipage application:
    * es cuando hace una app de express con vistas
  
  - Single page application:
    * haces una peticion incial al servidor recibes un js, de ahi solo vas haciendo peticiones ajax, todo cambias por código, esto tiene algunas ventajas, xq el cambio se hace virtualmente, en muchos casos es más rápido
    * Esto tiene una contrapuesta de que no es amigable al SEO.
    * Tiene server side rendering, es recomendable solo si tienes experiencia en el front y en el backend, aunque le dá mucha complejidad es amigable al SEO.
    * Serverside rendering framework:
      * Si es que se usaría React.js puedes usar Next.js
  
  Recomendación: si se quiere que la pagina se indexe bien
  - Si es una app web con autenticación al inicio osea con usuario y contraseña se puede hacer una Single PAge Aplication con React, Angular no es necesario indexar eso.
  - Si es la página principal de mi app web y quiero que sea Single page aplication y necesito indexar, debo hacer server side rendering, y puedo usar estos frameworks.
    - Si uso react,js es Next.js framework para server side rendering con react.js
    - Si uso vue.js es Nuxt.js framework para server side rendering con vue
--------------------------------------------------

#### Como pasamos valores a las vistas.

en local puedo poner variables globales para toda mi applicación.

app.locals.titulo = 'Anuncios';

Esto me permite crear la variable titulo en cualquier vista.

Otra forma es usando variables de respuesta.
res.render('index', {titulo: 'Anuncios'});

**Ejemplo de pasar parametros a una vista**

en el archivo `app.js` crearmos la variables global antes de las rutas: `app.locals.title = 'NodeAPI';`
Luego en el middleware index.js al hacer res.render('index')

En la vista tenemos una sintaxis de `<%= title %>` esto evalua lo que este entre ese formato.
Hay otra sintaxis en ejs que es `<%- %>` sin espacapar código.

#### Tamplates - include

Podemos incluir el contenido de otras plantillas.

<% include otra/plantilla %>

views
  - index.js
  - otra
    - plantilla.ejs

#### Templates - condiciones

#### Templates - iteraciones


#### Templates - html

Si quisieramos, podríamos tener las vistas con extensión .html

poniendo en nuestro app.js esto

```js
app.set('view engine', 'html');
app.engine('html', require('ejs').__express);
```