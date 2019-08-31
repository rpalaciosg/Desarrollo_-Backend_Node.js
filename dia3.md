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
Luego cuando esas variables de entorno de los comandos en escripts se pueden poner en otro modulo, y tener un juego de variables para desarrollo, otro juego para produccion, otro juego de variables para el entorno de staging o pre-produccion.

Podemos poner directamente nodemon en lugar de npm start
    - Node mon busca un index.js, luego un package.json, busca un main sino busca un script start.

Podemos ver las vistas están en views, esta tiene unos comando
 - __dirnam: ver la ruta actual en la que estoy
 - __filename: me devuelve la ruta y el fichero

- El motor de vistas que va a usar es ejs

Con app.uses se caran midlewares, una app de express es un grupo/lista de Middlewares, que se ejecuta hasta que ha llegado a la ejecutción y decida responder una de ellas. 

### Creamos un midleware en app.js
- Analizamos el responder
- y el next()

```js
app.use((req, res, next) => {
  // Un midleware tiene que hacer Una de 2 cosas:
  //  - Responder
  //res.send('ok');
  //  - O llamar a next
  console.log('Peticion a', req.originalUrl);
  next(new Error('cosa mal'));
});
```

Si llamo a next() y le paso alguna cosa, es un middleware especial que tiene 4 parametros, los 3 parametros que tienen todos los middleware y uno mas de error.

Tambien podemos lanzar un error desde el next() pasandole algun parámetro.
```js
next(new Error('cosa mal'));
```

**Routers**

Routers es un grupo de midlewares, forma de agrupar midlewares

Los midlewares los puedo poner a nivel de app y dentro de un router

### Rutas

HTTP pone a disposicion varios métodos

- GET para pedir datos, es idempotente (se puede llamar una o mil veces y el estado siempre va a ser el mismo)(mala practica es que en este método cambie el estado o haya algún cambio en la base o algo), es decir no hay que hacer cosas, sino devolver algo
- POST para crear un recurso
- PUT para actualizar, es idempotente (ejm. guardar un usuario existente)
- DELETE eliminar un recurso, es idempotente (pe. eliminar un usuario)

 > idenpotente: si lo ejecutas varias veces los resultados no cambian

 Por lo tanto podemos usar rutas como estas:

 ```js
 app.get('/')
 ```

 ### El orden de las rutas

 ** El orden es importante

 ### Rutas 
 Express nos permite usar el app.all que es lo mismo que el app.use

 ### Servir ficheros estáticos

 Es un middleware

 ### Recibiendo Parametros
 Se recibiran parametros e n nuestros contraoladores de varias formas.

 - en la ruta (/users/5)
 - Con parametros en query string (/users?sort=name)
 - En el cuerpo de la petición (POST y PUT generalmente)
 - Tambień podemos recibirlos en la cabecera, pero esta zona solemos dejarla para información de contexto, como autenticación, formatos, etc.

#### Como recibir parametros en la ruta

```js
router.get('/params/:id/piso/:piso/puerta/:puerta', (req, res, next) => {
  console.log('req.params',req.params);
  res.send('ok');
});

```

No hay buenas practicas de si hacer queryStrings o parametros en la ruta, los query strings se usan más para cosas adicionales.

Se hacer que un parámetro sea opcional, poniendo un signo de interroganción

Además se puede condicionar un parámetro con una expresion regular o filtro

```js
router.get('/params/:id([0-9]+)/piso/:piso/puerta/:puerta', (req, res, next) => {
  console.log('req.params',req.params);
  res.send('ok');
});
```

Express solo activará este middleware solo si cumple la expresión regular

#### Podemos recibir parámetros tambien con Querystring

```js
router.get('/enquerystring', (req, res, next) => {
  console.log('req.query', req.query);
  res.send('ok');
});
```

y la url seria `http://localhost:3000/enquerystring?color=rojo&talla=l&lang=it`

#### Recibiendo parametros en el cuerpo de la peticion

Aqui no se pede usar una petición GET ya que no usa body

```js
router.post('/rutapost', (req, res, next) => {
  console.log('req.body', req.body);
  res.send('ok');
});
```

Esto no lo pruebo desde el browser, sino debo usar una herramienta que se llama postman

Tener en cuenta el formato del body, nos recomienta usar el middleware multer(https://github.com/expressjs/multer) para parsear form-data en otros formatos de body

form-data se suele usar para parsear ficheros

Para las peticiones de tipo body usamos el formato de Body `x-www-form-urlencoded`

### Validaciones

Como validamos esta información.
Hay un modulo, que se llama `express-validator` y hay otros mas. Es muy sencillo de usar.

Primero instalamos express-validator

```sh
npm install express-validator
```

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