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

## PROMESAS BASES DE DATOS API
------------------------------

### Evolución de la asincronía.
Antes para utilizar la asincronía se usaban callbacks, pero despues aparecieron las promesas.
Los callbacks causaban el callbaks hell, el código es mas dificil de mantener, podría causar errores.
Ayuda a que el código no cresaca a la derecha.

### Promesas
Una promesa **es un objeto** que representa una operación que aun no se ha completado, pero que se completará más adelante.
Ahora ya está en el lenguaje js antes se usaban librerias. Algunas de esas librerias tenias algunas funciones 

#### Tiene 3 estado posibles

1. Pending : puede pasar a Fullfilled o a Rejected
2. Fullfilled(value)
3. Rejected(reason)

No pueden pasar de Fullfilled a Rejected o viceversa y no pueden volver a pending.

Hay otras herramientas para hacer cosas asincronas como los **Observables**, tienen otras cosas, pero tienen una sintaxis mas compleja.

#### Como se crea una promesa
```js
var promesa = new Promise(function(resolve, reject)){
}
```

Y se cosume con

```js
promesa.then;
```
Podemos ver el ejemplo en : `ejemplos/promise.js`

Como convención usar los nombres de parámetros `resolve` y `reject`

>> La promesa es un objeto con un constructor llamado Promise, tiene propiedades y métodos y tiene algo especial o mágico que hay algo que esta esperando a que esa promesa se complete.

Una forma para activar un escuchador de eventos para saber cuando esa promesa se complete.

```js
// consumir la promesa
promesa.then(()=>{
    console.log('la promesa se completó');
});
```

A parte de resolverla, yo podría hacer que una promesa fallara.

con `reject(new Error('fatal'));` esto me da un error warnign feo que dice `UnhandledPromiseRejectionWarning: Error: fatal...`. Esto sale porque el error no ha sido manejado con un .catch()

Cuando se resuelven o devuleven cosas deben ser solo una cosa, es decir si se quiere resolver varias cosas se debe crear un objeto y resolver/devolver ese objeto.


Las promesas tienen un método then y devuelve una promesa.

#### Podemos encadenar promesas

Un patron típico es que se quiera hacer distintas acciones de forma 

el .catch() tambien devuelve una promesa, es decir que puedo poner un .then() despues del .catch()

#### Objeto `Promise`

Es el constructor de las promesas. y tiene
Promise.all([p1, p2, p3]) = recibe un array de promesas y devuelve una promesa que se resuelve cuando todas esas promesas se han realizado.

Promise.race([p1, p2, p3]) = recibe un array de promesas y se resuelve cuando se resuelve la primera promesa.

El objeto Promise tiene un par de métodos estátios que pueden ser útiles, es decir:
- Promise.reolve(valor) : Resuelve/crea una promesa resuelta con el valor proporcionado.
- 
- Promise.reject(razón): Devuelve una promessa resuelta con la razón suministrada. LA razó debería ser un error (generalmente una  instancia de objteoError).


- Una caracteristica de las promesas es que aun se haya resuelto en el pasado, me garantiza que el .then() se ejecutará.

- Tratar de no mezclar callbacks con promesas.

## Async / await

Las promesas nos ayudaran a llegar a esto.
Lo que si puede hacer es usar promesas y async away en diferentes partes.

El comando `async` hace que una funcion devuelva una promesa.

```js
// esto retorna una promesa que se resuelve con el 'hola'
async function saluda() {
  return 'hola'
}

saluda().then(res => console.log(res)); //hola
```

Es lo mismo que escribir ```return new Promise...```

`async` consume una promesa.
si pongo `await` a lado izquierdo de algo que devuelva una promesa, la siguiente línea no se ejecutará hasta que se resuelva esa promesa, y no tengo que encadenar nada ni poner then's ni nada . ahí está la mágina.

ejemplo:
```js
async function salud() {
  const nombre = await row.findName();
  return nombre;
}
```

Podemos ver un ejemplo en `ejemplos/asyncawait.js`

`await` nos permite parar sin bloquear el eventloop, es como si las instrucciones dentro de salud esten en el then(), además nos permite hacer bucles de forma asincrona, usando el await.

##### Primse.all

Ejemplo de hacer cosas en paralelo

```js
async function asincronoEnParalelo() {
  const info1 = row.findNext();
  const info2 = row.findNext();
  const info3 = row.findNext();
  const list = await Promise.all([info1, info2, info3]);
}
```

Esto es bastante comun cuando se inicializa apps ya sea en fronted o backend. Por ejem. se tiene que hacer al principio una llamada un webservice para obtener los valores por defecto, otra llamada para ller un fichero y cargar un .init, otra llamada a una base de datos para sacar no se cuanto y esas cosas se las puede hacer en paralelo, para no perer tiempo, se ejecutan las 3 a la vez y cuando termine la mas lenta de ellas haya terminado o se haya resuelto.



## Base de Datos

Es sencillo, basta con instalarse un driver(módulo), no es necesario que sea el del fabricante, hay de terceros

```sh
$ npm install mysql
$ npm install mongoskin
```

### Base de datos MySQL

un ejemplo con node y mysql

1. Primero creamos una carpeta
2. Luego en el terminal con cd entramos al directorio y luego hacemos 
   ```shell
   npm init -y
   ```
3. Luego instalamos la dependencia de mysql
   ```shell
   npm i mysql
   ```
4. Creamos un fichero index.js