# Día 3 - Backend Node.js

## Events

**EventEmitter** Node nos proporciona una forma de manejar IO en forma eventos.
Es un patrón típico, que se usa mucho y es importante saber como funciona.

Vamos a verlo en un ejemplo que vemos en `ejemplos/eventemitter.js`

Es bastante util, cuando se emitan enventos se los puede acompañar de información
Trabajar con eventos es comodo para porcesar flujos de datos, es decor escribir código muy facil de leer ante procesos de datos.

Mandando a un fichero todo lo que se escriba en la consola.

//patron de suscribirse a eventos.
```js
    process.stdin.on('data', function(data)) {
        file.write(data);
    });
```

## Módulos

Nos referimos en dividir nuestra aplicación en partes.
Los módulos de Node.js se basan en el estandar CommonJS.

- Los módulos usan `exports` para exportar cosas.
- Quien quiere usar un módulo lo carga con  `require`.
- LA instruccipon `require` en `síncrona`, no hay que poner un callback
- Un módulo es un `singleton`, hay una única instancia de eso en memoria.

**¿module.exports o exports?**

Podemos ver esto en el ejemplo `ejemplos/ejemplo_modulos`

Cualquier objeto de java script hasta que no se haga un export, es un objeto vacío

Los ES Module usan un modificador de línea de comando y están aún en beta.
Se los puede usar pero utilizando el modificador, se suelen usar mas en frontend.

Los módulos se cargan una sola vez, y si quiero tener las provincias en memoria por ejemplo, debo cargar al incio las provincias.

> Se debe seguir el principio KISS que es  Mantenlo simple, estupido.

Usar common.js para módulos antes que ES modules, que suelen ser mas complejos. En los esmodules tengo imports sincronos y asincronos.

en Esmodules:
- modulo sincrono import asds as metodo from './ahdhad';
- modulo asincrono import()

En backend no es muy necesario los import asincronos.

## Express.js

Express nos dá la oportunidad de Estructurar nuestra aplicación.
Espress es un framework web minimalista para Node.js

http://expressjs.com

Node permite estructurar tu aplicación que tu quieras, pero los patrones nos ayudan a que otras personas puedan entender nuestro código. Hay diversos patrones

- El patrón MVC, estructuramos en 3 grupos:
  - Modelo
  - Vista
  - Controlador

- MVVP
- MVVM

En la documentación de express hay 5 cosas para poner navegarla:
- express(), como libreria como tal
- Application, es la aplicacion que voy hacer
- Request
- Response
- Router: agrupador de rutas

### Web Frameworks

Existen múltiples frameworks web para node.js y surgen nuevos con frecuencia, por ejemplo.

- Express.js
- Koa
- Hapi
- Restify
- ...

### Express generator

No es express, es una herramienta que me ayuda a crear aplicaciones de express.js
Primero instalamos express-generator:
    ```sh
    npm i -g express-generator
    ```

### Ejercicio:

Para crear app express con express-generator:
```sh
express nodeapi --ejs
```

Para arrancarlo para desplegarlo en producción, usamos:
```sh
npm start
```

Para ejecutarlo con información de depuración:
```sh
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

Luego instalamos solo en el proyecto, no de forma global:
Esto establece las variables de entornos y se encarga de adecuarla al sistema operativo en el que estemos:
Las variables de entorno, se establecen

```sh
npm install cross-env
```

Es una buena practica instalar esta libreria, y nos ayuda a ejecutar el proyecto en cualquier sistema operativo.
> Los modulos deben hacer una sola cosa y hacerla bien.

También podemos arrancar en modo Producción, agregamos o establecemos una variable e los comandos o scripts del package.json

```json
  "scripts": {
    "start": "node ./bin/www",
    "dev": "cross-env DEBUG=nodeapi:* npm start",
    "prod": "cross-env NODE_ENV=production npm start"
  },
```

Se puede poner elegir porque puerto va arrancar

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