# Día 4 Node.js

## Express

### Validaciones
- Hay que tener en cuenta, que no es necesario usar un modulo para las validaciones, sino que las podemos hacer nosotros perfectamente, solo nos sirve para ahorrarnos trabajos.

Para las validaciones podemos usar express.validator para ahorrarnos trabajo. Pero no es necesario algun middleware porque lo podemos hacer nosotros mismos. Es nuestra responsabilidad validar la información que ingresen a nuestro servidor, para reducir bugs, mejorar la calidad de la información, y para que esté lo mejor validada posible.

Para instalarlo hacemos

```sh
npm install express-validator
```

`Express-validaor` nos da un arsenal de validaciones, como de tarjetas, email, y un monton.

Los ejemplos lo tenemos en `index.js` que validabamos el query string.

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
**Nota:** En caso de que la app de express nos de un error `EADDRINUSE` eso significa que hay otro proceso usando ese puerto. Esto lo podemos ver en `./bin/www` en el middleware manejador de errores.
Esto lo podemos corregir, cambiando para que la app corra en el puerto 3001 en caso que el puerto ocupado sea el 3000 o matar el proceso que esta ocupando el puerto que necesitamos usar.
Lo podemos tambien e linux usando el comando ps para verlo y hacerlo un kill.


### Validaciones : Segunda Parte en query string
Al validar algo con error, nos muestra en la pantalla/navegador un Error y el mensaje de error.

Lo que vamos a hacer ahora, es agregar en el middleware de errores en app.js, meter la lógica necesria para que gestione bien el tipo de error que estamos lanzando y en el navegador el mensaje de error se muestre correctamente y con mejor formato.
Porque ahora mismo nuestro middleware de errores no esta gestionando bien ese tipo de error.

En este caso nos da este error por que a la talla le estamos pasando una letra cuando deberia ser numérico.
`localhost:3000/enquerystring?color=rojo&tall=l&lang=it`

Lo que pasa es que el middleware de errores o erro handler en app.js no esta gestionando bien el mensaje que estamos lanzando al validar.

Nos vamos al error handler en app.js y vemos como esta actualmente. Se diferencia de los demas middlewares porque tiene un parametro adicional `err`

```js
//error handler
app.use(function(err, req, res, next){
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  //render the error page
  res.status(err.status || 500);
  res.render('error');
});
```

En el error handler haremos lo siguiente.

- Comprobar el error de validación. Si es que hay un error de validación, para comprobarlo usamos lo siguiente:
  * Comprobamos si el error tiene una propiedad array, y si la tiene es un error de validación. Se puede comprobar de otras formas, pero esta es una de ellas.
```js
if (err.array) {

}
```
  Lo que queremos es que el mensaje que aparezca aquí, sea un mensaje que preparemos nosotros.
- Primero vamos a extraer el mensjae o tambien podemos extraer todos los mensajes de errores de validación y mostrarlos todos.
Por ejemplo vamos a sacar el primer error de validacion que haya dado y colocarlo.

```js
if (err.array) {
  const errInfo = err.array()
}
```
Tener en cuenta err.array() el array es un método al que ejecutamos, y le pedimos que filtre de un array de errores pero que nos dé `onlyFirstError: true`, esto nos devuelve un array y de ese array sacamos la propiedad 0.
```js
if (err.array) {
  const errInfo = err.array({ onlyFirstError: true })[0];
}
```
Este método array() de err no es un metodo de los objetos de error normales, es un método de los objetos de error de express-validator.

Entonces lo que haremos ahora es formatear el err.message para el mensaje de error:
```js
err.message = `Not valid - ${errInfo.param} ${errInfo.msg}`
```
errInfor.param  = es el nombre del param que ha dado error, en este caso 'talla'
errInfor.msg = es el mensaje que corresponde al mensaje que se pone en .withMessage('must be numeric') en el router/middleware del querystring donde hago la validación.

Ahora en el navegador nos mostrará el mensaje de error que hemos formateado en el código en caso de error de validación.

```js
//error handler
app.use(function(err, req, res, next){
  //Comprobar error de validación
  if (err.array) {
    const errInfo = err.array({ onlyFirstError: true })[0];
    err.message = `Not valid - ${errInfo.param} ${errInfo.msg}`
  }
  }
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  //render the error page
  res.status(err.status || 500);
  res.render('error');
});
```

Hay un detalle, si abro inspeccionar y pongo en network y recargo la pagina, vemos que el resultado de esta peticion es 500, pero esto no es correcto, ya que el servidor en el navegador me dice que se le ha dado una talla mal, pero se contradice diciendo que el mismo servidor a cometido un error al pasarle la talla mal.

Lo que tendria que decir es, que tú me has dado la talla mal, es culpa del cliente no del servidor. Por lo tanto no deberia devolver un error 500 sino un 400 algo.
  - Un error 500 es cuando el servidor no ha sido capaz de procesar una solicitud, estando la solicitud correcta. y da un error 5xx

Entonces vamos a cambiar el codigo de error que da el servidor, para ponerle al status un código de respuesta http. 
Podemos usar los siguientes http_status_codes:
  - 1xx : los 100 son mensajes de información que no son terminadoras d euna peticion
  - 2xx : Succes, es la respuesta típica de un servidor. Ver en wipik
  - 3xx : Redirection, es una redirección. (Lo que me has pedido no lo tengo pero puede estar en este sitio)
  - 4xx : Errores de cliente, bad request, no autorizado, 402 payment required. 403 forbidden (sabes quien es pero esta prohibido entrar aquí o no tiene permisos). 
  - 422 es un estado muy típico, que significa que la peticion estaba bien formada pero fue imposible procesarla, debido a errores semáticos. Es un estado relacionado con un problema de validación.

En este caso ponemos `err.status = 422`, si volver a ejecutar y vemos el NEtwork vemos que el código de estado que devuelve cuando hay error de validación es 422. Este seria el código correcto en estos casos de error de validación.

Aqui ya tendriamos nuestro método de validación en el error handler en app.js para que parsee bien el mensaje lanzado de throw() en el middleware del router en index.js .

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

Recordar, si es que en un error de validación del api devuelve un eror 500 o uno diferente al mensaje que se muestra en la pantalla, ps da mala imagen, y se nota que es de mala calidad y que no se ha dado el tiempo necesario.

### Métodos de respuesta

Hasta ahora hemos estado respondiendo a todas las peticiones haciendo un `res.send()`, con el rest.send() podriamos hacer de todo, pero hay otros métodos convenientes que nos hacen mas comodo el responder otro tipos de coss:

#### Método de respuesta - send
Con este m'etodo puedo devolver un buffer, string, un objeto o un array o un monton de cosas que express se encarga de convertirlas al formato adecuado.
Por ejemplo si devolves un objeto, express detecta el contenido y se encarga de convertirlo a json y meter una cabecera diciendo que el content type es de tipo json, o el adecuado.
> El content-Type 

res.send() : es el metodo generico, puedo enviar buffer, string, objetos o un array

#### Metodo de respuesta - json

Es casi lo mismo que res.send(), pero la unica diferencia es que hace que el que ha hecho la peticion piensa que lo que va a devolver es un json y le va a hacer un json.parse pero cuando le respondamos un null no le va a funcionar.
La ventaja es que en el codigo se ve la palbra .json y se sabe que se esta respondiendo jason. 
Usamos el .json porque queda mejor en el codigo, mas entendible.

Se ajusta un posible null o undefined para que salga bien en JSON, ayuda a ver que en el código se esta usando json para responder.

res.json() : 

#### Metodo de respuesta - download
Tambien podemos hacer la descarga de un fichero.
Este rest.donwload() provoca esa tipica ventana que sale en el browser, diciendo `guardar como`, cuando se le da al tipico link de descarga. Le pone una cabecera a la respuesta respondiendo que tiene un attachmend y el browser responde a esa cabecera diciendo a donde quiere guardar el fichero.

Los parametros que se le pasan son, 

```js
res.donwload('/report-1234.pdf', 'report.pdf');
```
El primer parametro es el fichero que quieres entregar con la ruta, y el segundo parametro es como quieres que le aparezca.

#### MEtodo de respuesta - redirect
res.redirect('/foo/bar'): es para responder una redireccion con el status 302  por defecto(found) o se lo puede customizar.
Responder una redireccion con el status code 302 por defecto (found). Es una respuesta típica cuando el que nos hace una request un browser. Respondemos una indicación diciendo, 302, ve a este sitio `/foo/bar`, si es una app android, java, o c# puede que no siga el redirect.

Un redirect es una respuesta tipica cuando quien nos hace una peticion es un browser. El browser interpreta los redirects automaticamente. PEro si es una aplicacion que no ejecuta los redirects, ese redirect no lo haria. El redirecto no es que nos lleva a un sitio sino que nos responde 302 ve a la direcion de aqui osea nos indica a donde debemos ir.

Normalmente en los APis no sueles hacer respuestas de tipo redirect, es raro hacerlo.

#### Metodo de respuesta - render
Esto lo tiene nuestro website, en index.js el primer middleware, responde con un res.render('index', {title: 'Express'}). Lo que hace es renderizar la vitsa index.html

res.render('index')

#### Metodo de respuesta - sendFile
Podemos usar tambien res.sendFile(), es parecido al download, pero no pone esa cabecera expecial diciendo descargate esto. Si queremos que al usuario no le aparezca la ventana de `guardar como` sino que le aparezca directamente en el browser. Si queremos poner cabeceras ps lo podemos hacer en un objeto de opciones.

Envía un fichero como si fuera un estático.

Además de la ruta del fichero acepta un objeto de opciones y un calback para comprobar el resultado de la transmisión.


### Middleware de terceros

Al igual que hay librerias de terceros que nos ayudan a hacer cosas como nodemon, chance. También hay middleware de terceros, una lista de los mas usados o por lo menos los mas basicos podemos verlas aqui:

https://expressjs.com/en/resources/middleware.html

- multer : sirve para recoger peticiones de tipo POST en el body con formato multipar form-data.
- morgan: middleware que se uso para hacer log.
- cors:
- session :

```sj
$ npm install cookie-parser
```
Y se usa asi:

```js
  var cookieParser = require('cookie-parser');
  
  // load the cookie parsing middleware
  app.use(cookieParser());
```


## Vistas - Template Engines

- Como usar las  vista en Express? Express tiene la capacidad  hacer res.render(), es decir de poder gestionar las vistas. 
- Tiene un motor de vistas que permite enchufar otros motores de vistas.
- Por ejemplo cuando creamos nuestra aplicacion nosotros le dijimos `ejs`. Usamos ejs en el curso aunque express por defecto monta `jade` que le cambiaron el nombre.
- Normalmente usamos ejs porque la sintaxis es preferible antes que jade, ya que jade nos obliga aprender un lenguaje mas. Ademas ese lenguaje jade no hay muchos programadores que los conozcan, y si es que usas otro lenguaje no tan conocido es mas dificil.
- Con ejs usas html estandar. A la hora de escribir html jade  escribes menos.
- > No se usa mucho `Jade` ya que no muchas personas la conocen. EJS usa el html5 típico. No es que Jade tenga algo malo es muy bueno.
- Hay otros motores de templating `Express.js supported templates engines`

- A parte de `ejs` si se quiere algo mas potente a costa de tener que aprender mas cosas, se podria recomendar `handlebars` o `nunjucks` que es de mozilla (Esto es recomendacion personal de el profesor.)
- A ejs lo conoce casi todo el mundo.

### Templates - Motor de Plantillas

Además sirve html estáticos.
El motor de plantillas que estamos usando es ejs, pero eso no significa que no podemos cambiarlo. Basta con cambiar el `view engine`

1. Para instalar un sistema de templates lo instalaremos con `npm install ejs --save` o `npm  install jade --save`

2. Nos vamos al app.js donde tenemos el `view engine`.  `views`, es el directorio donde estan nuestras plantilass por ejemplo:
  ```js
  app.set('views', './views')
  app.set('view engine', 'jade')
  ```
- view engine, el template engine a usar, por ejemplo:
  ```js
  app.set('view engine', 'jade') //o
  app.set('view engine', 'ejs')
  ```

  - En los ficheros de las vistas debemos cambiar la sintaxis de acuerdo al motor de plantillas.
  Lo podemos cambiar, express lo carga automáticamente y ya podremos usarlo. Primero hay que instalar el npm del motor de vistas que queramos.

--------------------------------------------------

Segun la pregunta de que es mejor para el seo, usar un api y meter todo en el front o usar vistas con un motor de plantillas en el mismo servidor.
- Es una pregunta tipica.

- Hay 2 tipos de Websites:
  - Multipage application: Es lo que vamos a hacer ahora, una app de Express con vistas normalmente es una multipage aplication es decir cada pagina es independiente de las otras. Son distintas paginas
  
  - Single page application: Aplicaciones de una sola pagina, haces una peticion incial al servidor, el servidor te responder y recibes un script de js que el browser ejecuta y a partir de ahi ya no vuelver a hacer mas peticiones de cambio de pagina. sino que las siguientes peticiones se las hace como peticiones ajax para norecargar la pagina, por ejemplo si quiere ver otra pagina, todo cambias por código.\
    - La opcion de single page application tiene algunas ventajas, xq el cambio de una pagina a otra se realiza virtualmente, esto en muchos casos es más rápido y no se tiene que cargar muchas cosas que ya estan cargadas en memoria.
    - Esto tiene un contrapunto importante. Que normalmente cuando el browser hace esa primera peticion te descarga no una pagina sino un js con una aplicacion que al ejecutarse ese js ya va pintando cosas. Y eso para los motores o bots de indexacion por ejemplo de google yu otros motores de busqueda. Cuando hacen una peticion a nuestro site, en vez de devolver el titulo de nuestro site el cual es para indexar, devuelve un java script, cosa que el motor de indexacion no podra indexar esa pagina o site. LAs SPA no son amigables al SEO.
  
    - Tambien hay otras tecnica que se pueden utilizar cuando hace SPA que es el server side rendering, esto lo complica aun mas pero si cuando me hacen una peticion, yo devuelvo una sola pagina ya preconstruida. Es decir hasces lo mismo que va a hacer el cliente, pero lo haces antes en el servidor, aunque le dá mucha complejidad es amigable al SEO.
    - El `server side rendering`, es recomendable solo si tienes mucha experiencia en el front y en el backend, sino se la tiene no es recomendable meterse con esto porque al principio es lioso. Si no tienes los conceptos muy claro del banckend en el front ps no es muy recomendable.
    - Hay framework de Serverside rendering que te lo facilitan un poco pero aun asi tienes que tener muy claro los conecptos. Hay un par de recomendaciones de frameworks, por ejemplo:
      * Si es que se usaría React.js puedes usar [Next.js](https://nextjs.org/)
  
  Recomendación: si se quiere que la pagina se indexe bien, tratar de ponerselo lo mas facil posible a los bots.
  - Si es una app web con autenticación al inicio osea con usuario y contraseña se puede hacer una Single PAge Aplication con React, Angular no es necesario indexar eso.
  - Si es la página principal de mi app web y quiero que sea Single page aplication y necesito indexar, debo hacer server side rendering, y puedo usar estos frameworks.
    - Si uso react,js es [Next.js](https://nextjs.org/) framework para server side rendering con react.js
    - Si uso vue.js es [Nuxt.js](https://nuxtjs.org/) framework para server side rendering con vue -> le gusta mucho al instructor
--------------------------------------------------
- Lo bueno de ejs es que u sa html estandar.
- Todo lo que se hace conlos templates de vistas se hace en el servidor, no tiene nad que ver con react.js vue.js

#### Como pasamos valores a las vistas.

- Proporcionar variables a las vistas tenemos 3 opciones:
1.  Una es usando el metodo render y pasandole valores.
  
2.  OTra opcion seria usar app.locals, en local puedo poner variables globales para toda mi applicación, es decir variables globales para todas las vistas de mi app.

```js
  app.locals.titulo = 'Anuncios';
/
```
Puedo usar la variable titulo sin tener que pasarsela porque ya es una variables de vistas global

```js
  res.render('index');
//
```

Esto me permite crear la variable titulo en cualquier vista.

3. Otra opcion es usando variables de respuesta, con res.locals
```js
  res.locals.titulo = 'Anuncions';
```
Es decir si en esta respuesta concretamente quiero pasarle valores a la vista pues hago res.locals y paso todo  lo que quiera.
Y se pasaria a esta vista
```js
  res.render('index');
  ```
Luego hay esta forma que es similar a la anterior:
```js
  res.render('index', {titulo: 'Anuncios'});
```

#### Ejemplo de pasar parametros a una vista

en el archivo `app.js` crearmos la variables global antes de las rutas: `app.locals.title = 'NodeAPI';`
Luego en el middleware index.js al hacer res.render('index')

- En la vista tenemos una sintaxis de `<%= title %>` esto evalua lo que este entre ese formato.

##### Ejemplo escapando codigo con ejs
Hay otra sintaxis en ejs que es `<%- %>` sin espacapar código. Esto es para inyectar codigo al ejs que se pueda ver tal cual en el browser. 
Normalmente el escapado de codigo es una proteccion que tienen todos los motores de plantillas.
El <%- codigo %> se usara cuando verdaderamente quiero inyectar codigo.

En el router index.js hacemos lo sigueinte en el middleware de la raiz, creamos una variable global pero solo para esta respuesta:

```js
router.get('/', (req, res, next) => {
  res.locals.valor = '<script>alert("inyeccion de codigos")</script>';
});
```
Y en la vista index.ejs la variable `valor` escribimos esto 
```ejs
  <h2>Escapar valores</h2>
  <p><%= valor %></p>
```


#### Tamplates - includes

Podemos incluir el contenido de otras plantillas. Si en mi carpeta de vistas tengo una carpeta que llama a otras vistas puedo hacer un include. 
Esto es muy util para la cabecera y el pie de pagina. Por ejemplo si tengo varias paginas en mi web site y en todas se repite la cabecera y el pie de pagina, me hago un ejs que se llamae header o cabecera, otro que se llame footer o pie de pagina y le pongo include en todas mis paginas y asi no tengo que repetir el codigo en todas y cada una de ellas.

```ejs
<% include otra/plantilla %>
```

views
  - index.js
  - otra
    - plantilla.ejs

#### Templates - condiciones
Tambien puedo meter codigo fuente. Algo que es muy bueno porque el lenguaje que se usa en las plantilla de ejs es javascript.

##### Ejemplo de condiciones en plantillas ejs
En el middleware de la raiz del router index.js vamos a anadir una cosa mas y lo vamos a utilizar en la vista.
Vamos a crear una constante segundo, para obetener el segundo o segundos actuales de la fecha actual, luego lo paso al objeto res.locals.condition al atributo segundo, y en el atributo estado voy a mostrar el resultado de si es par o impar.

```js
router.get('/', (req, res, next) => {

  const segundo = (new Date()).getSeconds();

  res.locals.valor = '<script>alert("inyeccion de codigos")</script>';
  res.locals.condicion = {
    segundo: segundo,
    estado: segundo % 2 === 0
  };
});
```
Luego en la vista  index.ejs agrego esto:

```html
  <h2>Condicionales</h2>
  <% if (condicion.estado) { %>
    <p><%= condicion.segundo %> es par</p>
  <% } else { %>
    <p><%= condicion.segundo %> es impar</p>
  <% } %>

```
Es recomendable meter la minima cantidad de codigo en la vista, ya que aunque express muestre error por ejs, si tenemos un script muy grande, va a ser dificil encontrarlo porque no nos devuelve el numero de linea.

Usar ejs-lint para evitar esto. Y el codigo ponerlo ya sea en el middleware/Controlador o incluso mejor en los modelos que se usan cuando se trabaj con base de datos, y en los modelos en donde mejor estan estas cosas, por que lo hacen reutilizable. En caso de cometer un error si el codigo lo pongo en el controlador o el modelo, me podre dar cuenta rapidamente.

#### Templates - iteraciones, bucles
##### Ejemplo interaciones en templates

En index.js nos creamos una variable global solo para esta respuesta:
```js
res.locals.users = [
  { name: 'Smith', age: 23 },
  { name: 'Jones', age: 35 },
  { name: 'Thomas', age: 21 }
];
```

Con esto en la vista index.ejs tendre y podre usar un array de users. Luego en la vista me creo o agrego lo siguiente:

```html
  <h2>Bucles</h2>
  <% users.forEach(user => { %>
    <p><%= user.name %> tiene <%=user.age%> anios </p>
  <% }) %>
  
```

Recordar que para usar los template en un archivo `.ejs` debemos usar la siguiente sintaxis:
- <% %> : donde pondremos codigo javascript para hacer validaciones, interaciones, etc.
- <%= %> : donde pondremos variables gobales que hayamos definido globalmente ya sea para `app.local...` o `para res.locals...`

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