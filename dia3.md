# Día 3 - Backend Node.js

## Events

**EventEmitter** Node nos proporciona una forma de manejar IO (in/out) en forma eventos.
El eventEmitter es un patrón muy típico, que se usa mucho y es importante saber como funciona.

Objetivos:
- Saber usarlo
- Identificar un eventEmitter.

El eventemitter es una clase de la documentación de node.js para que podamos comunicar distintas partes de nuestra aplicación.

Node.js tiene una solo hilo y tiene un bucle, que está verificando continuamente si a saltado algún evento y si tiene un `eventHandler` subscrito a este evento, entonces se ejecuta este evento. Node.js pasa verificando eso continuamente con el `Event Loop`.

Cuando algún proceso este subscrito al `Event Loop` el programa no termina, y está esperando a que salte algún evento y hace una comprobación si hay nuevos eventos.

Podemos ver la documentación de la clase EventEmitter en [EventEmitter](https://nodejs.org/dist/latest-v10.x/docs/api/events.html)

Vamos a verlo en un ejemplo que vemos en `ejemplos/eventemitter.js`

- Es bastante util, cuando se emitan eventos se los puede acompañar de información

- Para subscribirme a una evento puedo usar :
  - on()
  - once() : subscribirme solo la primera vez qe se lance un evento

- Trabajar con eventos es comodo para procesar flujos de datos o streams, es mejor escribir código muy fácil de leer ante procesos de datos. Ejem

Como vemos el método process tienen una propiedad  `stdin` que es la entrada estandar por teclado, stdin es un emisor de eventos que está heredando de un eventEmitter. Este stdin produce eventos 'data'.

```js
  process.stdin.on('data', function(data) {
    file.write(data);
  });
```
Mandando a un fichero todo lo que se escriba en la consola.

//patron de suscribirse a eventos.
```js
    process.stdin.on('data', function(data)) {
        file.write(data);
    });
```

## Módulos

Hay varios estandares de hacer módulos, nos referimos en dividir nuestra aplicación en partes. Por ejm:
- Modelos
- Vistas
- Controladores
- Conexiones a la base de datos, etc

Sería dificil trabajar en un solo script.
Porque trabajar varias personasen un mismo fichero, por eso en node.js trabajamos con modulos.

Los módulos de Node.js usamos módulos y se basan en el estandar CommonJS.
Los ESModules son los que vienen de la parte de frontend, pero hay cosas que los `ES modules` han perdido y algo de ello es simplicidad, aunque tengan mas funcionalidad.

- Los módulos usan `exports` para exportar cosas.
- Quien quiere usar un módulo lo carga con  `require`.
- La instruccipon `require` en `síncrona`, no hay que poner un callback
- Un módulo es un `singleton`, significa que hay una única instancia de eso en memoria, para que no hagamos múltiples copias de eso.

Cada fichero puede funcionar como un módulo.
Cuando se hace un require de un fichero, lo que hace es ejecutarlo.

Ejemplo e un módulo básico:

```js
  // modulo.js
  console.log('Hola desde un módulo!');

  // index.js
  require('./modulo.js'); //ejecuta el modulo.js
```

Node.js busca los módulo si es del core, en la carpeta node_modules local, y en la caperta node_modules global.

A la hora de exportar se puede exportar de 2 formas principalmente:

**¿module.exports o exports?**
Podemos exportar de varias formas. con module.export o con exports que es la forma avrebiada.

Podemos ver esto en el ejemplo `ejemplos/ejemplo_modulos`

Cualquier fichero de javascript que se cargue con un `require`, hasta que no se haga un `export` o se exporte algo de ese fichero o de ese módulo, export siempre es un objeto vacío.

Hay una sintaxis abreviada para exportar usando un alias.
```js
  export.resta = resta;
```

> Tener cuidado de no pisar o danar el alias `export` ya que al usar el alias y pasar algun valor esto daniara el alias export de la sintaxis abreviada.

Los ESModules usan un modificador de línea de comando y porque están aún en beta.
Se los puede usar pero utilizando el modificador al ejecutarlo y debe tener extension.mjs, se suelen usar mas en frontend.
El CommonJS es mas simple y cómodo.

Los módulos se cargan una sola vez, a pesar que se los llame o haga require varias veces, ya que node.js devuelve el mismos objeto que habia en `exports` la primera vez y no vuelve a crearlo, es lo que es un `singleton` por que todas las llamadas apuntan al mismo objeto.
Ejem: y si quiero tener las provincias en memoria por ejemplo, debo cargar al inicio las provincias, estas estaran disponibles en la primera llamada del exports.

> En caso de que se quiera reiniciar o volver a cargar ese objeto singleton es bastante facil, es decir invalida la cache de ese objeto para volverlo a cargar.

Segun la pregunta de cual es mejor common.js o es6 modules?

El mejor o peor es relativo, es mas cuestion de gustos, aunque actulamente ES6 modules esta en beta y no se puede usar sin el modificador al correrlo.

> Siempre se puede o se debe seguir el `principio KISS` que significa  Mantenlo simple, estupido. Es decir mantenlo sencillo, todo lo que puedas, no compliques las cosas innecesariamente.

Los imports de es6 modules, es interoperable con los exports de common.js.

Usar common.js para módulos antes que ES modules, que suelen ser mas complejos. En los esmodules tengo imports sincronos y asincronos.

en Esmodules, se puede tener imports sincronos y asincronos: EJms.

- modulo sincrono 
  ```js
  import * as metodo from './ahdhad';
  ```
- el unico modulo asincrono en es6 modules es 
  ```js
  import()
  ```
Un caso de uso de un import() asincrono, es porque se quiere hacer algo  despues de que se importe y mientras se importe hacer otras.

En backend no es muy necesario los import asincronos sino es mas util en frontend

Existe un sition llamado `npmjs.com` en donde si hago un modulo lo puedo publicar si quiero que los demas lo usen y lo puedan importar.

Puedo buscar los modulos directamente en google.


## Express.js

Express nos dá la oportunidad de Estructurar nuestra aplicación.
En node.js puedo estructura mi aplicacion como me de la gana. Podemos usar patrones de diseno y puedo dividirla en los modulos que quiera.

Es un poco peligroso tener tanto poder.

Espress es un framework web minimalista para Node.js. Que trata de ser sencillo para aplicaciones http.

http://expressjs.com

Ahora Express.js pertenece a una empresa StrongLoop de IBM para mantenerlo.

Node permite estructurar tu aplicación que tu quieras, pero los patrones nos ayudan a que otras personas puedan entender nuestro código. Hay diversos patrones

- El patrón MVC, estructuramos en 3 grupos:
  - Modelo
  - Vista: lo que vemos
  - Controlador: CUando hacemos la peticion a una vista, estamos haciendo una peticion a un controlador. Aqui es donde esta la inteligencia de nuestras aplicaciones.

Entre el controlador y el modelo, orquestan, y el modelo es quien decide.

Hay otros patrones:

- MVVP
- MVVM

### Formas de moverme en la documentacion de Express.js

En la documentación de express se estructura en 5 cosas para poder navegarla:

- express(), como libreria como tal, para crear la app
- Application, es la aplicacion que voy hacer, tiene metodos y en esa app tengo
- Request: peticiones y
- Response: respuestas
- Router: agrupador de rutas

### Web Frameworks

**Porque vemos Express.js**
Existen múltiples frameworks web para node.js muy interesantes y surgen nuevos con frecuencia, pero la mayoria estan basados en express, por ejemplo:

- Express.js - es el mas utilizado
- Koa
- Hapi
- Restify
- ...


### Express generator

No es express, es una herramienta que me ayuda a crear aplicaciones de express.js
Generador de aplicaciones de express.js

Primero instalamos express-generator con npm:

    ```npm
    npm i -g express-generator
    ```
Esta instalacion nos da el comando express -h para crear una aplicacion de express.js

### Ejercicio - App Basica con Express-generator

Para crear app express con express-generator:
```sh
express nodeapi --ejs
```
Luego entramos al directorio que se creo con 
``` cd nodeapi``` y hacemos ```npm install```.

Nos creara un fichero package.json, con un apartado `scripts`le dice a `nodemon` o a otras aplicaciones como arrancar este proyecto. Estos son comandos.
La forma de arrancar nuestro proyecto viene muy bien inscribirlo en el apartado `scripts` del package.json, ya que sirve tambien de documentacion para los demas.

Para arrancarlo y para desplegarlo en un servidor en producción, usamos:
```sh
npm start
```

Para ejecutarlo con información de depuración usamos lo siguiente:
Nota: tener en cuenta aqui los que usan windows pueden tener un problema.

```sh
//para linux o mac
DEBUG=nodeapi:* npm start
```

Modificamos el package.json y creamos un nuevo comando en el bloque scripts:
```npm
"scripts": {
    "start": "node ./bin/www",
    "dev": "DEBUG=nodeapi:* npm start"
  },
```

Y lo corremos de la siguiente manera:
```sh
npm run dev
```

Aqui hay una diferente en la forma de correr el comando start que no necesita poner run con dev. Solo hay otro como start que no necesita `run` y es `test`

En el caso de que se use windows, como lo que hacen los comandos dentro del bloque scripts, es crear y configurar una variable de entorno, y esto es diferente para linux, mac y windows, por lo que se tiene que usar una herremienta llamada y `cross-env`.
Instalamos solo en el proyecto, no de forma global:
Esto establece las variables de entornos y se encarga de adecuarla al sistema operativo en el que estemos:
Las variables de entorno, se establecen

```sh
npm install cross-env
```

Es una buena practica instalar esta libreria siempre, y nos ayuda a ejecutar el proyecto en cualquier sistema operativo.
> Los modulos deben hacer una sola cosa y hacerla bien.

También podemos arrancar en modo Producción, agregamos o establecemos una variable e los comandos o scripts del package.json

```json
  "scripts": {
    "start": "node ./bin/www",
    "dev": "cross-env DEBUG=nodeapi:* npm start",
    "prod": "cross-env NODE_ENV=production npm start"
  }
```
Para el comando produccion se usa una variable estandar `NODE_ENV` que es la abreviatura de environment
Se puede poner elegir porque puerto va arrancar

Se puede validar o condicionar que arrancar si es que usa dev o node_env, por ejemplo que solo envie emails cuando esta arrancado en produccion.

Se puede ademas poner mas variables en los comandosde scripts separadas por espacios por ejemplo: DB_PASSWORD
```json
  "scripts": {
    "start": "node ./bin/www",
    "dev": "cross-env DEBUG=nodeapi:* DB_PASSWORD=god npm start",
  }
```
Luego cuando esas variables de entorno de los comandos en scripts se pueden poner en otro modulo, y tener un juego de variables para desarrollo, otro juego para produccion, otro juego de variables para el entorno de staging o pre-produccion.

Ademas en los comandos de scripts de package.json podemos poner porque puerto va a arrancar.
```json
  "scripts": {
    "start": "node ./bin/www",
    "dev": "cross-env DEBUG=nodeapi:* PORT=3001 NODE_ENV=production npm start",
  }
```

Podemos poner directamente nodemon en lugar de npm start
    - Node mon busca un index.js, luego un package.json, busca un main sino busca un script start.

#### Arranca app express
El archivo que esta en `nodeapi\bin\www` es la que arranca la aplicacion express
Y nuestra aplicacion en si es el fichero `app.js`

**create.server**
En el metodo o linea http.createServer(app) esta heradando de un eventEmitter. Porque ha heredado lo metodos de un event emitter y es capaz de emitir eventos y subscribirse.

Los eventos emitidos que tiene son evento 'error' que ejecuta el metodo onError() y el evento 'listening' que es cuando se abre un puerto y se ejecuta onListening().
### Nuesta aplicacion App.js

#### Middlewares o routers

Algo recomendado en nuestra app.js es si es que se tienen variables que se usan una sola vez, como es el caso de `indexRouter` y `usersRouter`, esto es mas para que sea mas facil en caso de error, cuando anadamos nuevos middlewares o routers.

#### Vistas de la aplicacion
```js
  app.set('views', path.join(__dirname, 'views'));
  app.set('view engine', 'ejs');
```
Las viestas utiliza la libreria `path`
Podemos ver las vistas están en views, esta tiene unos comando
 - __dirnam: ver la ruta actual en la que estoy
 - __filename: me devuelve la ruta y el fichero

- El motor de vistas que va a usar es `ejs`

#### Middlewares

Con `app.use(..)` se cargan midlewares, 
**Que es un middleware?** Una app de express es un grupo/lista de Middlewares.
Cada peticion que llegara a ejecutar una funcion es un middleware. 
Lo que esta entre la `peticion` y la respuesta es un `MIDDLEWARE`.
Se ejecuta hasta que ha llegado a la ejecución y hasta que uno de esos middleware decida responder y ahi ya no se evalua ninguna mas. 
El middleware basicamente es una funcion con 3 parametros.

##### Middleware de loggin
Usa la libreria Morgan que es para hacer log. Va escribiendo un log de la peticion que e sta recibiendo.
`app.use(logger('dev'));` -> el dev que se pasa es el formato del log.
La liberia `morgan` tiene diferentes formatos de logs.
  - tiny
  - custom(el formato que tu quieres.)
  - combined

##### Middleware cookieParser

##### Middleware express.static
Es precisamente el que se encarga de responder ficheros estaticos.

##### Middleware rutas de aplicacion web

##### Creamos un midleware con arrows functions en app.js
Se caracteriza porque  esta en la lista de moddlewares con `app.use`. Un middleware recibe 3 parametros>
- `request`
- `response`
- `next` - evaluar el siguiente middleware


Un middleware tiene que ahcer 1 de 2 cosas:
- Responder o
- llamar a next()

Despues de evaluar a un middleware y llamo a next() se evaluara el siguiente middleware. Si no llamo next() despues de evaluar a un middleware, se queda atascado ahi.

Por eso en un middleware o respondemos o llamamos a next()

```js
app.use((req, res, next) => {
  // Un midleware tiene que hacer Una de 2 cosas:
  //  - Responder
  //res.send('ok');
  //  - O llamar a next
  //console.log('Peticion a', req.originalUrl);
  // next(new Error('cosa mal'));
  next();
});
```
##### Middlewares de gestion de errores

Si llamo a next() y le paso alguna cosa, es un middleware especial que tiene 4 parametros, los 3 parametros que tienen todos los middleware y uno mas de error. Y el error lo pasamos en el parametro err. Y de ahi yo  decido como voy a sacar los errores, si voy a llamar a renderizar una pagina de error o voy a responder con un json, o voy a llamar a un servicio dealmacenamiento de errores remoto, para que eso le aparezca en unas graficas a mis jefes o lo que sea. 
Este middleware usa la libreria http-errors, el cual es una herramienta para crear errores de diferentes tipos.

Tambien podemos lanzar un error desde el next() pasandole algun parámetro.
```js
next(new Error('cosa mal'));
```

Al final  se renderiza la vista de error:
```js
res.render('error');
```

El `res.locals` se usa para pasarle cosas a las vistas.

#### Routers

Es una forma de agrupar middlewares

Un router es un grupo de midlewares, forma de agrupar midlewares

Los midlewares los puedo poner a nivel de app y dentro de un router que estan dentro de `./routes`

- Carga primero  Express simplemente para crear un router.
- A ese router, le pone un middleware.

Ejemplo:
```js
/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});
```

- El '/' primer parametro del middleware, es un filtro que dice que solo voy a ejecutar este middleware si es una peticion a la raiz de este router que es `/users`

##### Rutas

Puedo especializar los middleware con los metodos que recibiran el route:
HTTP pone a disposicion varios métodos o tipos de peticiones:
Las mas comunes..

- GET para pedir datos, es idempotente (se puede llamar una o mil veces y el estado siempre va a ser el mismo)(mala practica es que en este método cambie el estado o haya algún cambio en la base o algo), es decir no hay que hacer cosas, sino devolver algo o informacion.
- POST para crear un recurso, usuario o una factura
- PUT para actualizar cosas, es idempotente (ejm. guardar un usuario existente)
- DELETE eliminar un recurso, es idempotente (pe. eliminar un usuario)

 > **idenpotente**: si lo ejecutas varias veces los resultados no cambian

 Por lo tanto podemos usar rutas como estas:

 ```js
 app.get('/', function(req, res){
   res.send('Hello World!');
 });

 app.post('/', function(req, res)){
   res.send('Guardado!');
 }
 ```
> Nota: estos metodos get, post, put no deben ir en la app.js/ raiz sino en las routers.

 ##### El orden de las rutas

 ** El orden es importante **

 El orden en que vayamos definiendo los middlewares es el orden en el que se evaluaran despues.

 Debemos colocar los middlewares en el orden que tenga sentido para nuestra aplicacion.

 ##### Rutas app.all

 Express nos permite tambien usar el app.all como un comodin que es lo mismo que el app.use

 #### Servir ficheros estáticos

 Es un middleware, que nos permite servir estaticos como CSS, imagenes, ficheros javascript, etc, se especifica con un middleware llamado `express.static`

 ```js
  app.use( express.static(path.join(__dirname, 'public')));
 ```
 Con esto serviremos lo que haya en la carpeta public como estaticos de la raiz de la ruta.

Podriamos aniadirle mas middlewares de ficheros estaticos pero tenemos que especificar en que ruta cargarlas.

```js
  app.use('/pdf', express.static(path.join(__dirname,'d:/pdfs')));
```

 ### Recibiendo Parametros en Express
 Como recibir parametros en una aplicacion de express?
 Se recibiran parametros en nuestros contraoladores de varias formas:

 - Recibir parametros en la ruta o url (/users/5)
 - Recibir parametros con parametros en query string (/users?sort=name) Query string en la url
 - Recibir parametros en el cuerpo de la petición (POST y PUT generalmente)
 - Tambień podemos recibirlos parametros en la cabecera, pero esta zona solemos dejarla para información de contexto, como autenticación, formatos, etc.

#### Parametros de cabecera
  Hay 2 cabeceras:
  - Cabceras de la peticion 
  - Cabecera de la respuesta

Podemos recibir informacion en las cabeceras de la peticion y respondercon informacion en las cabeceras de la peticion.

#### Como recibir parametros en la ruta
Ejemplo, cuando en el url me pasan algo como esto:
`localhost:3000/paramenruta/33`

```js
router.get('/paramenruta/:numero', (req, res,next)){
   console.log('req.params', req.params);
   res.send('ok');
   //next();
}
```

Hay que tener cuidado con un error muy tipico que es que se responder con send() y poner next() para evaluar el siguiente middleware. En la pantalla vemos una respuesta aparemente correcta, pero en el log, vemos algo muy diferente que es el siguiente error.
`Error [ERR_HTTP_HEADERS_SENT]: Cannot set headers after they are sent to the client.` 
Es decir significa que se ha respondido 2 o mas veces.

Nota: Responder 2 veces esta prohibido en el protocolo http. Ya que establece que ante una peticion solo puede haber una respuesta.

```js
router.get('/params/:id/piso/:piso/puerta/:puerta', (req, res, next) => {
  console.log('req.params',req.params);
  res.send('ok');
});
```

Esto suele pasar cuando condicionamos las 2 posibilidades de enviar respuesta o pasar a evaluar el siguiente middleware, para esto, despues de enviar respuesta con send() debemos poner un return, para que ya no se ejecute lo demas:

```js
router.get('/parameter/:numero', (req, res, next )=> {
  if (asda) {
    res.send('ok');
    return;
  }
  next();
});
```

No hay buenas practicas de si hacer queryStrings o parametros en la ruta, los query strings se usan más para cosas adicionales. Como busquedas, filtros.

Se hace que un parámetro sea opcional, poniendo un signo de interroganción

```js
router.get('/paramenruta/:numero?', (req, res, next) => {
  console.log('req.params',req.params);
  res.send('ok');
})
```

Además se puede condicionar un parámetro con una expresion regular o filtro.

```js
router.get('/params/:id([0-9]+)/piso/:piso/puerta/:puerta', (req, res, next) => {
  console.log('req.params',req.params);
  res.send('ok');
});
```
La forma de hacer una peticion en el url del middleware anterior seria:

`localhost: 3000/params/33/piso/2/puerta/C`

En este caso Express solo activará este middleware solo si cumple la expresión regular.

Para recoger los datos o los parametros se usa `req.params` y esto me devuelve un objeto, el cual puedo leer y usar para obtener los datos recibidos.

**Parametro opcional** Se puede hacer que una parametros sea opcional. Si yo quiero que el numero sea opcional le agrego un signo de interrogracion despues del nombre del parametro. `/:numero?`

Al responder correctamente a esta peticion y al recoger los datos con `req.params`, tendremos que el numero es `undefined`, ya que al no haber pasado dato por el signo de interrogación (opcional) no hay informacion que pueda extraer. 

```js
router.get('/parameter/:numero?', (req, res, next )=> {
  if (asda) {
    res.send('ok');
    return;
  }
  next();
});
```

**Otra cosa que se puede hacer** es el uso de expresiones regulares para filtros. Y el middleware se activara solo si el filtro con la expresion regular en el paramero :id se cumple. Es decir si solo es uno o mas numeros de entre el 0 al 9.
```js
router.get('/params/:id([0-9]+)/piso/:piso/puerta/:puerta', (req, res, next) => {
  console.log('req.params',req.params);
  res.send('ok');
});
```

#### Podemos recibir parámetros tambien con Query string

```js
router.get('/enquerystring', (req, res, next) => {
  console.log('req.query', req.query);
  res.send('ok');
});
```
En este caso express va a parsear el querystring o los datos en `req.query` que es con lo vamos a extraer esos datos recibidos por querystring, esto nos devuelve un objeto con las variables y valores que pasemos en la url.

La url para probar esta querystringseria `http://localhost:3000/enquerystring?color=rojo&talla=l&lang=it`

Para pasar los parametros en la url con querystring despues del nombre del middleware ponemos el signo de interrogacion `?`, luego variable = valor (color=rojo), luego el signo anperstand `&` seguios parando la variable = valor (talla=L), y así sucesivamente `&` y variable=valor.

Esto Express lo parsea en un objeto req.query y asi poder trabajar con esos datos.

#### Recibiendo parametros en el cuerpo de la peticion (en el body)

En esta peticion no se pede usar una petición con método `GET` ya que no usa body. Esto es estandar de http, en este caso debemos usar el método `PUT` o `POST`.

```js
router.post('/rutapost', (req, res, next) => {
  console.log('req.body', req.body);
  res.send('ok');
});
```

En este caso al responder nos devuelve un objeto `req.body`, que es el que usaremos para extraer la información del body mediante un objeto.

Además con los paremtros en el Body la forma de probar esta peticion cambia. Ya que esto no lo pruebo desde LA URL del browser, sino debo usar alguna herramienta especializada en este caso hay  una que se llama `POSTMAN`, o hacer en alguna pagina un formulario que haga un `POST` al servidor. 
En este caso usaremos Postman. Es un programa para desarrollo de APIs, al final es una herramienta que te ayuda a hacer peticiones comodamente y ver las respuestas comodamente.

##### USando Postman
- Me creo con el + una petición
- En el desplegable eligo la peticion POST y en la url escribo:
  `http://localhost:3000/rutapost` , rutapost es el nombre del middleware.

- Luego nos vamos a la pestaña Body, para que en el cuerpo de la petición vamos a meter algo.

- Nota: Hay un error muy común, cuando escogemos el formato de Body `form-data`, si ponemos una Key con su valor, el objeto req.body {} estaría vacío, esto es porque si usamos el formato `form-data` debemos poner un middleware en app.js que parsee ese formaro `form-data`. 

Hay una libreria que me podria parcear este formato `form-data` hay uno recomendado usar se llama  multer(https://github.com/expressjs/multer) es un middleware para parsear el formato `form-data` en otros formatos de body.

El formato multipar form-data muchas veces se suele usar para hacer uploads de ficheros

Como se usa:
```js
// se hace un require de multer
var multer = require('multer')
// despues se crea un objeto al que se le dice si viene un fichero donde tiene que guardarlo.
var upload =  multer({ dest: 'uploads/'})

// despues se usa asi, me da un middleware y me procesa ese body en el formato multipar form-data
app.post('/profile', upload.single('avatar'), function (req, res, next) {
  // req.file es el `avatar` file
  // req.body will hlod the text fields, if there were any.
})
```


Al crear por primera vez el proyecto de Express en los middlewares hay un `app.use(express.urlencoded({extended: false}))`, esto hace que las peticiones PUT y POST que tengan Body o parametros en el Body parcearlo al formato `urlencoded` y nos lo deja disponible en el objeto `req.body`.

- Por tanto en express para las peticiones de tipo body o con parametros en el body usamos el formato de Body `x-www-form-urlencoded` y recojo el valor con `req.body`.

- En el campo description puedo ir poniendo datos para generar documentacion con POSTMAN.

### Validaciones

Como validamos esta información.
Hay un modulo, que se llama `express-validator` y hay otros mas que hacen validaciones para express. 
Express validator es muy sencillo de usar. `https://github.com/ctavan/express-validator`

Primero instalamos express-validator
```sh
npm install express-validator
```
En el middleware usamos express validar así:
vuelvo arrancar con `npm run dev`

Luego cargo el módulo para usarlo

> object destructuring en js
>> Si un modulo me devuleve un objeto y quiero usar solo 2 metodos, usamos object destructuring
>> `const { query, validationResult } = require('express-validator/check');`
>> Esto me sirve para no traer o construir todo el objeto sino treaer las propiedades que voy a usar nada mas.

#### ejemplo de validacion de un qury string

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

El throw() lo que hace es lanzarme una excepción.