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

##### Ejemplo no escapando codigo con ejs
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

#### Templates de .ejs en HTML

Si quisieramos, podríamos tener las vistas con extensión .html

Nos vamos a nues app.js y en donde dice que nuestro `view.engine` es 'ejs' entonces lo que haremos es como medio engañarle y hacemos lo siguiente:

```js
// view engine setup
app.set('view engine', 'ejs');
```
Cambiamos lo siguiente en el motor de vistas, esto al inicio html para express no siginifca nada, porque express.js se va a buscar si tienen algun modulo de un motor llamado html

```js
app.set('view engine', 'html');
```
Luego hacemos como si crearamos un nuevo motor de templantes y ponemos la siguiente línea:

```js
app.engine('html', require('ejs').__express);
```

El modulo ejs tiene una funcion de registro, que usa express para registrar el modulo, y queda así:
```js
app.set('view engine', 'html');
app.engine('html', require('ejs').__express);
```

Ahora nuestras vistas deben tener la extensión .html y ya no .ejs


## PROMESAS BASES DE DATOS API

Todos los que usan asincronia en javascript usan callbacks, pero luego aparecieron las promesas.
Antes con los callbacks nos sucedia algo llamado callbackhell.

### Evolución de la asincronía.
Antes para utilizar la asincronía se usaban callbacks, pero despues aparecieron las promesas.
Los callbacks causaban el callbaks hell. Es decir que para cuando se querian hacer cosas encadenadas el código es mas dificil de mantener, incluso podría causar errores. Es dificl trabajar asi.
Las promesas ayudan a organizar el codigo asincrono.
Ayuda a que el código no cresca a la derecha sino hacia abajo.

### Promesas
Una promesa **es un objeto** que representa una operación asincona, una operacion que aun no se ha completado, pero que se completará más adelante.
Ahora ya está acoplada en el lenguaje js antes se usaban librerias. Algunas de esas librerias tenias algunas funciones 

#### Promesas tienen 3 estado posibles

1. Pending : cuando se crea una promesa empieza en este estado `pending` y cuando la promesa se completa puede pasar a:
2. Fullfilled(value) : Se ha completado satisfactoriamente o  
3. Rejected(reason) : se ha completado insatisfactoriamente

#### Reglas de las promesas
Una promesa no pueden pasar o transicionar de estado Fullfilled a Rejected o viceversa y no pueden volver a pending.

Hay otras herramientas para hacer cosas asincronas como los **Observables**, que si son mas conplejos tienen otras cosas, pero tienen una sintaxis mas compleja. Puede transicionar a mas estados, tienen efectos colaterales.

#### Como se crea una promesa

Con el constructor de promesas, ha este new Promise le tengo que pasar una funcion y a esa funcion 2 argumentos, `resolve` y `reject`. Llamaremos a una o otra si queremos devolver un resultado satisfactoriamenter o devolver un resultado insatisfactoriamente.

```js
var promesa = new Promise(function(resolve, reject)){
}
```
#### Como se consume una promesa

Y se cosume con, promesa.then

```js
promesa.then ( function(resultado){
..
}).catch( function(error){
..
});
```

#### Ejemplo de Promesas

Podemos ver el ejemplo en : `ejemplos/promise.js`

```js
'use strict'
// Crear funcion que devulve PROMESA
function sleep(ms){
  return new Promise((resolve, reject) => {
    setTimeout(() => {
       resolve('algo'); //resuelve solo una cosa, usar un objeto si quiero devolver mas cosas
      //reject(new Error('fatal')); //rechaza con error
    }. ms);
  });
}

// Obtener PROMESA
const promesa = sleep(2000);
console.log(promesa);

// Consumir PROMESA
promesa.then((algo) => {
  console.log('la promesa se completo con', algo);
}).catch(err => { // controlar rechazo para que no caiga app
  console.log('promesa rechazada', err);
});
```

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

Si tengo promesas encandenadas, debo hacer un return del .then interno para que me devuelva una promesa e incluso poder escalar el erro y controlarlo en la funcion superior.

#### Podemos encadenar promesas

Cuando quieres ejecutar diferentes opciones una detras de otra, pero se tiene un contexto. Es decir cuando acabe una promesa y se vaya a ejecutar la siguiente, quiero saber lo que devolvio la anterior


Un patron típico es que se quiera hacer distintas acciones de forma que vaya pasando el contexto, entonces tengo que hacer return dentro de la promesa para que el .then pueda tomar ese contexto y usar en la siguiente promesa.

el .catch() tambien devuelve una promesa, es decir que puedo seguir poniendo .then() despues del .catch() tambien. Por ejemplo.
HAs esto si va bien has esto, si va bien has lo otro, y si va mal has esto otro, osea si falla cualquier de las de arriba quiero poder seguir haciendo cosas de forma asincrona y asi voy poniendo .then y .cath en medio pero sigo encadenando cosas.

#### Objeto `Promise`

Es el constructor de las promesas. y tiene 2 metodos muy interesantes que son `.all` y `.race`

##### Promise.all

Promise.all([p1, p2, p3]) = recibe un array de promesas y devuelve una promesa que se resuelve cuando todas esas promesas se han completado. Esto para si quieres lanzar en paralelo muchas promesas se suele usar bastante. 
Tener en cuenta que podriamos hacer esto si es que las promesas que queremos ejecutar no consume u ocupan el mismo recurso.

Y devuelve un array con todos los resultados.

##### Promise.raice()
Es un poco el menos usado.
Promise.race([p1, p2, p3]) = recibe un array de promesas igual y se resuelve cuando se resuelve la primera promesa, la que gana. Tiene pocos usos.

El instructor usao esto una vez, cuando tenia 15 servidor virtuales replicados que tenian la misma API, luego hacian la peticion a la misma API en los 4 servidorres y usaban raice para ejecutar el que respondiera mas rapido, esto para asegurar velocidad al ejecutar. Hacian 15 peticiones en paralelo y solamente usaba el primero que respondia.

Tener en cuenta que lo usas cuando te puedes permitir descartar los resultados de las demas promesas.

#### Promesas metodos estaticos

El objeto Promise tiene un par de métodos estátios que pueden ser útiles, es decir:

##### Promesas resueltas
Pruede crear una promesa resuelta.
- Es decir prefabricar una promesa que resuelva ya un valor.
- Promise.reolve(valor) : Resuelve/crea una promesa resuelta con el valor proporcionado.
  ```js
    promise.resolve(valor);
  ```
##### Promesas rechazadas
ASi mismo podemos crear promesas ya rechazadas.
- Promise.reject(razón): Devuelve una promessa resuelta con la razón suministrada. LA razó debería ser un error (generalmente una  instancia de objteoError).

#### Subscribirse a una Promesa ya ejecutada en el Pasado
Una caracteristica de las promesas es que aun se haya resuelto en el pasado, me garantiza que el .then() se ejecutará.
Esto no pasaba en los eventos (event emitter).

- Tratar de no mezclar callbacks con promesas.

- El momento en que se tenga que encadenar callbacks con promesas, es incomodo
- Si se va a migrar callbacks a promesa, migrarlo entero.

- Siempre se puede convertir un callback en una promesa, es muy facil.
  - Por ejemplo una funcion que devuelve una promesa, que dentro tiene otra funcion que devuelve un callback, entonces el resolve se ejecuta cuando salte el callback y el reject se ejecuta cuando se lance el reject con el error.

  ```js
  const sleep = ms => new Promise(resolve => setTimeout(resolver, ms));
  ```

## Async / await - ECMAScript 2015 (ES6)

Las promesas nos ayudaran a llegar a esto Async/await. Es una sintaxis que nos ayudara de forma mucho mas facil trabajar con cosas asincronas.
Async await se basa en las promesas. Si has hecho una apliacion con promesas y en algunas partes quieres usar async/await lo puedes hacer perfectamente, son compatibles. Ya que sin promesas async/await no lo puedes hacer.
Lo que si puede hacer es usar promesas y async away en diferentes partes.

### Comando Async
El comando `async` hace que una funcion devuelva una promesa. 
Por ejemplo si creo una funcion saluda() y le coloco el comando `async` al inicio, automáticamente he convertido esta funcion saluda() en una funcion asincrona, porque lo que hace ahora aunque retorne un string 'hola' no esta devolviendo un string, sino está devolviendo una `promesa` que se resuelve con este 'hola'.

```js
// esto retorna una promesa que se resuelve con el 'hola'
async function saluda() {
  return 'hola'
}

saluda().then(res => console.log(res)); //hola
```

Es lo mismo que escribir 
```js
return new Promise...
```

Entonces donde está la magia de esto.

### Comando await
`await` consume una promesa. Por ejemplo:
Si pongo `await` a lado izquierdo de algo que devuelva una promesa, lo que hace es que no se ejecutará  la línea siguiente, hasta que se resuelva esa promesa con await. Por lo tanto no tengo que encadenar cosas dentro de nada ni poner then's ni nada de eso. Ahí está la mágina.
```js
async function salud() {
  const nombre = await row.findName();
  return nombre;
}
```

Ejemplo: podemos ver el ejemplo en `ejemplos\asyncawait.js`

Para usar el `await` con algo que nos devuelva una promesa, tiene que ir dentro de una funcion `async.
```js
'use strict';

// funcion que retorna una promesa.
const sleep = ms => new Promise(resolve => setTimeout(resolve,ms));

async function main(){
  console.log('empiezo');
  await sleep(2000);
  console.log('sigo');
  await sleep(2000);
  console.log('sigo');
  await sleep(2000);
}

main();
```
Aquí ya no tengo que poner `.then` sino que pongo la linea siguiente. 
> `await` es como decir, espera a que termine esta promesa de la derecha y después ejecuta la línea siguiente.

En este ejemplo vemos y hacemos de forma sincrona trabajos asincronos. Podemos usar un bucle for para no repetir el await.

```js
'use strict';

// funcion que retorna una promesa.
const sleep = ms => new Promise(resolve => setTimeout(resolve,ms));

async function main(){
  console.log('empiezo');
  for(let i = =; i<5; i++) {
    await sleep(2000);
    console.log('sigo');
  }
  
}

main()
```
> `await` no ejecuta la línea siguiente hasta que se ejecute lo que tiene a la derecha.
> `await` siempre trabajará con una promesa, si lo que tiene a lado no es una promesa simplemente sigue. Por ejemplo podrias tener una funcion en casos devuelva una promesa y en otros un texto. Con el await no debo preocuparme de eso y me funcionaría para ambos casos.

- Vamos a hacer una funcion que escriba en un fichero pero que no sea asincrona a ver como se comporta el await.

 ```js
 'use strict';

 const fs = requite('fs');

 const writeFile = (nombreFichero, contenido) => new Promise ((resolve, reject) => {
  fs.writeFile(nombreFichero, contenido, (err) => {
    // si me da error
    if (err) {
      reject(err);
      return;
    }

    // Si no me ha dado error, llamo a resolver para que se termine esa promesa
    resolve();
  });
 });

function main(){
  await writeFile('pepe.txt', 'hola');
  console.log('terminado');
}

main();

 ```
Lo que hicimos es crear una funcion que devuelve una promesa, y dentro meto mi llamada con callback


#### Como controlar posibles errores en async/await

Lo que vamos hacer es hacer que la escritura de un archivo asrincronamente falle.

 ```js
 'use strict';

 const fs = requite('fs');

  const writeFile = (nombreFichero, contenido) => new Promise ((resolve, reject) => {
    fs.writeFile(nombreFichero, contenido, (err) => {
      // si me da error
      if (err) {
        reject(err);
        return;
      }
      // Si no me ha dado error, llamo a resolver para que se termine esa promesa
      resolve();
    });
  });

  async function main(){
    await writeFile('/////pepe.txt', 'hola');
    console.log('terminado');
  }

  main();//controlar error aqui
 ```

Aqui node.js dice que a ocurrido un reject() y no lo has gestionado. como la funcion asyncrona main() es la que llama y ejecuta ese await, si no se resuelve satisfactoriamente va a generar un reject() pero este escala a la funcion/promesa principal o que esta llamando al await() y engloba todo mi codigo en este caso main(), entonces debo gestionar el error al llamar a main() en caso de que la promesa main() llegara a terminal mal.

```js
main().catch(err => {
  console.log('Hubo un error', err);
});
```

Este error anterior ha sido un error asincrono, ahora vamos a hacer que se genere un error sincrono para ver que con await los podemos gestionar de la misma forma.

 ```js
 'use strict';

 const fs = requite('fs');

  const writeFile = (nombreFichero, contenido) => new Promise ((resolve, reject) => {
    fs.writeFile(nombreFichero, contenido, (err) => {
      // si me da error
      if (err) {
        reject(err);
        return;
      }
      // Si no me ha dado error, llamo a resolver para que se termine esa promesa
      resolve();
    });
  });

  async function main(){
    await writeFile('/////pepe.txt', 'hola');
    console.log('terminado');

    JSON.parse('asdas');

  }

  main().catch(err => {
    console.log('Hubo un error', err);
  });

 ```
En este caso el error es que se intenta parsear un JSON que no es json. Vemos que no se cae la aplicación sino que esto al dar un errro sincrono, la magia de la funcion async function main() es que lo gestiona como si fuera un error asincrono. Ya que es el mimso camino, ese error sincrono hace que la promesa principal main() haga reject() con este error sincrono hacia donde se esta llamando a main() y gestionando con catch y con un único .cath casaria tanto los errores sincronos como los asincronos que ocurran dentro de mi código.

Si quiero hacer algo en especifico al momento de darme un error en el awit es decir ponerle un .catch al await lo puedo hacer asi:

```js
  async function main(){
    await writeFile('pepe.txt', 'hola')
    .catch(err => {
      console.log('fallo el writeFile');
    });
      
    console.log('sigothen');

    console.log('terminado');  

  }
```

`await` nos permite parar sin bloquear el eventloop, es como si las instrucciones dentro de saluda() esten en el then(), además nos permite hacer bucles de forma asincrona, usando el await.
Es como una pausa sin bloquear el `eventloop`

```js
async function saluda() {
  const nombre = await row.findName();
  return nombre;
}
```

Tambien me deja usar el await en bucles, en codigo que no entiende de cosas asincronas, como for, while. Sin preocuparnos de tener que hacer funciones recursivas ni cosas mas raras, pero que no necesitamos. Igual sabemos hacer funciones recursivas para bucles asincronos si es que lo necesitamos:

```js
async function bucleAsincronoEnSerir() {
  for (let i=0; i<5; i++) {
    const info = await row.findNext();
    console.log(info.name);
  }
}
```

##### Ejemplo del Promise.all

Ejemplo de promise.all() para hacer cosas en paralelo, imaginesmos que tenemos una funcion findNext() que devuelve una promesa. Al ejecutar esa funcion lo que me esta devolviendo findNExt no es un registro si no me esta devolviendo una promesa que cuando consiga el registro o fichero se resolvera, y esa promesa la estoy guardando en info1 y demas, y al final hago un solo await que espere por todas las promesas, osea estoy lanzando todos en paralelo, y esperando que terminen todas.

```js
async function asincronoEnParalelo() {
  const info1 = row.findNext();
  const info2 = row.findNext();
  const info3 = row.findNext();
  const list = await Promise.all([info1, info2, info3]);
}
```
Esto esun patron bastante comun, por ejemplo cuando se inicializa apps ya sea en fronted o backend. Por ejem. se tiene que hacer al principio una llamada un webservice para obtener los valores por defecto, otra llamada para ller un fichero y cargar un .init, o otra llamada a una base de datos para sacar no se cuanto y esas cosas se las puede hacer en paralelo, para no perder tiempo, se ejecutan las 3 a la vez y cuando termine la mas lenta de ellas haya terminado o se haya resuelto, continuo.

En list tendria el resultado de las 3 operaciones asyncronos, es un patron bastante comun y uitl.



## Base de Datos

Para usar bases de datos en Node.js es sencillo, basta con instalarse un driver(módulo), por ejemplo el driver de mysql, el driver de mongodb, el driver de oracle, en el driver no es necesario que sea el del fabricante, hay de terceros.

```sh
$ npm install mysql
$ npm install mongoskin
```

### Base de datos MySQL

Hacemos un ejemplo con node y mysql: Podemos ver el ejemplo en `ejemplos/ejemplo_mysql`:

1. Primero creamos una carpeta
2. Luego en el terminal con cd entramos al directorio `ejemplos/ejemplo_mysql` y luego creamos un package.json 

   ```shell
   npm init -y
   ```
   -y significa diciendo a todo que si.

3. Luego instalamos la dependencia o driver de mysql:
   
   ```shell
   npm i mysql
   ```

4. Creamos un nuevo fichero index.js

5. cargo driver de Mysql

```js
'use strict';
// cargo driver mysql
const mysql = require('mysql');
```

6. Crear una conexion: y le pasamos un objeto de opciones, a parte se le puede pasar una URI, que es el formato tipico de las cadenas de conexion. Le pasamos una URI

```js
'use strict';

const mysql = require('mysql');

// creo una conexion
const conexion = mysql.createConnection('mysql://usuariocurso:us3r@didimo.es:3306/cursonode');
```

7. Me conecto

```js
'use strict';

const mysql = require('mysql');

// creo una conexion
const conexion = mysql.createConnection('mysql://usuariocurso:us3r@didimo.es:3306/cursonode');

// conecto
conexion.connect();
```

8. Lanzo una consulta:

```js
'use strict';

const mysql = require('mysql');

// creo una conexion
const conexion = mysql.createConnection('mysql://usuariocurso:us3r@didimo.es:3306/cursonode');

// conecto
conexion.connect();

// lanzo consulta
conexion.query('SELECT * FROM agentes', (err, rows, fields) => {
  if (err) {
    console.log('Error:', err);
    return;
  }
  console.log(rows);
});
```

Este driver de mysql trabaja con CALLBACKS. Ademas del query, el metodo `connect()` tambien tiene su callback para manejo de error. 
Hay algo que el driver de mysql hace de forma asincrona, cuando se lanza un query, solito verifica que primero se haya hecho la conexion para luego lanzar el query, pero la forma que deberia estar mejor el codigo seria que nosotros mismos controlacemos que una vez conectado y sin errores ahi se lance la consulta o query ejm:

```js
'use strict';

const mysql = require('mysql');

// creo una conexion
const conexion = mysql.createConnection('mysql://usuariocurso:us3r@didimo.es:3306/cursonode');

// conecto
conexion.connect(err => {
  // lanzo consulta
  conexion.query('SELECT * FROM agentes', (err, rows, fields) => {
    if (err) {
      console.log('Error:', err);
      return;
    }
    console.log(rows);
  });
});
```

Esto funcionaria de la misma forma que el primer ejemplo.