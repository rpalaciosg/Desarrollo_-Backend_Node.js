# Día 5

- Hay una libreria de promisefy para convertir un callback a una promesa.
- Hay otra libreria que se llama bluebird convert promise, que convierte a promesas. Incluso tiene un método que convierte todo los métodos a promesas.

El día de ayer se vio Bases de Datos MySql

## Bases de datos - SQL ORMs
ORM (Object Relational Maping) se encarga principlamente de:

- Convertir objetos en consultas SQL para que puedan ser persistidos en una base de datos relacional.
- Traducir los resultados de una consulta SQL y generar objetos.

Esto nos resultará util si el diseño de nuestra aplicación es orientado a objetos (OOP).

Si nosotros queremos guardar cosas en ficheros, deberiamos crearnos un indice. Como el índice de un diccionario.
Esta misma técnica más evolucionada es la mayor ventaja de una base de datos, la velocidad con la que puedo encontrar algo igual si tuviera 500 datos a tener 5 millones de datos.
Por eso se recomienda usar motores de bases de datos.

Además los ORMs nos da la ventaja de persistir esos datos. Es decir se pasa un objeto y el se encarga de tomar las propiedades del objeto.

Un ORM no es muy eficiente cuando tiene que hacer muchas operaciones, ya que el hecho de que tiene que convertir cosas y comprobarla, tiene una penalizacion en rendimiento. Ejm: Se tiene un fichero con 1 millon de pedidos y quieres cargarlo en la tabla de bases de datos de pedidos, aqui un ORM no aportará mucho y demorará mucho, en este caso es mejor crear las insert en el código.

Un ORM muy usado para bases de datos SQL es sequelize:
http://docs.sequlizejs.com/en/latest/

Sequelize tiene soporte para MySql, MAriaDB, SQLite, PostgreSQL y MSSQL.

Otras buenas alternativas son:
- Knex
- Bookshelf
- `TypeORM`, trabaja con typeScript en el framewor `nestjs` (sera bueno si es que el proyecto se usa con typescript)

> Para cosas masivas utilzo el drive y consultas directas.

## MongoDB

MongoDB es una base de datos no relacional sin esquemas:
es NOsql, no se usa nosql.

- No tenemos JOIN, tendremos que hacerlo nosotros
- Cada registro podría tener una estructura distinta.
- No se tiene relaciones
- Restricciones de integridad (como lo tienen las bases de datos relacionales)
- Eliminaciones en cascada

Cuando decimos sin esquemas (schema less) quiere decir que mongodb no nos va a poner pegas a la hora de meter cosas en las tablas.
En las base de datos de este tipo, a las tablas se las conoce como `colecciones`. 
Es un poco vago, porque deja un poco las cosas al final. 
Luego puedes decirle creame un indice, o me indexas los que tengan la propiedad remitente y me haces un indice.
Podemos meter información sin definir un esquema y crearle un índice.

A la hora de decidir que base de datos usar para una aplicación debemos pensar como vamos a organizar los datos para saber si nos conviene usar una base de datos relacional o no relacional.

USar mongodb puede darnos mas rendimiento principamente por alguna de estas razones:

- No tiene que gestionar transacciones
- no tiene que gestionar relaciones
- No es necesario convertir objetos a tablas y tablas a objetos (Object relation Impedance Mismatch)

ejemplo:

Instalar driver Mongodb:
```shell
$ npm install mongodb
```

```js

```

### Instalar mongodb

- Ingreso a la página, descargo .tgz
- Lo que nos hemos descargado son un monton de ejecutables, y de acuerdo a su nombre sabremos que son.

### Corre mongodb

Los que necesitaremos son:
- mongo (cliente)
- mongod (daemon- servidor)

1. Crear los siguientes directorios

```shell
$ sudo mkdir -p /data/db
```

2. Luego corremos el siguiente comando:
    ```shell
    $ ./bin/mongod --dbpath ./data/db --directoryperdb
    ```

- La opcion --directoryperdb es para cuando se quiera crear una nueva base de datos en un fichero nuevo y no mexcle todo
- Luego de ejecutar, me van a salir un monton de mensajes de log de servidor, y si entre eso vemos este mensaje `waiting for connections on port 27017`, esto me dice que ya está arrancado el servidor.

- Como ver si el servidor mongodb esta arrancado:

```shell
$ ps aux | grep mongod
```

como parar el servidor por linea de comandos
```shell
$ kill 22682     (PID)
```

3.  Luego corro el cliente de mongodb, que se conecta al servidor y desde aquí podremos ordenar cosas

```shell
$ ./bin/mongod 
```

Nos aparecerá un prompt, que es la shell de mongodb

- Listar Bases de Datos de mongodb

```shell
> show dbs
```

- Cambiarme o usar una BD
  ```shell
  > use admin
  ```

- mostrar las collections de admin
> show collections

- Crear una BD cursonode, si hacemos un > show dbs vemos que no se a creado.
- luego creamos o insertamos un objeto

```shell
> db.agentes.insert({ name: 'Smith', age: 41})
```
Nos aparecerá un mensaje de que se ha insertado.

## Cliente gráfico para mongodb
- Una es MongoDB Compass
- Otra es Robomongo o la gratis que es Robo 3T ()

Si quiero ver de mejor forma en la consola puedo ejecutar el find con pretty()
```shell
> db.agentes.find().pretty()
```

Se recomienda hacer un índice con los campos que suelo buscar.
Si lo escribo en el código de una aplicación, entonces debo crear un índice.
Cada vez que escriba en una app código que filtre una coleccion por algún criterio, **debo crear un índice**. Ya que en producción pueden haber miles o millones de registros en una colección.


## Crear indices

```shell
> db.agentes.createIndex({ age: 1p})
> db.agentes.createIndex({ cp: 1, age: 1p})
```
1 es ascendente y -1 descendente.
Tambien se pueden crear con varios campos de busqueda

PAra ver los indices usamos:
```shell
b.agentes.getIndexes()
```

**¿Que tiene de malo crear indices por todos los campos?** No tiene de malo, la cosa es que los indices ocupan mucho espacio. `Overkill` se le llama, seria mejor hacer los indices cuando los necesite, es overenginieering = sobre ingeniería, es un caso que hacemos todos los seres humanos. Hay un efecto `YAGI` (no vas a necesitarlo) esto se nos debe venir a la mente cuando tengamos ese pensamiento por si acaso me sirva, pero si no necesito ahora no añadir ese método, porque voy a tener que mantenerlo. Limítate a cumplir lo que tienes que cumplir, porque es un añadido de tiempo y complejidad innecesario. Porque eso es un enemigo de la supervivencia de proyectos.

Se deben crear indices en el momento que sabes que te van a hacer alta de cara al futuro, por ejm. si estoy escribiendo un find, debo te voy a crear un índice para que sea lo suficiente rápido como ahora.


## Modificaciones

Se lo hace con la suiente línea:
```shell
db.agentes.update (criterio_de_filtro,{ age: 25})
db.agentes.update({ "_id" : ObjectId("5d4bfd116c854955b2be8730") }, { age:25 })
```

>> esto tiene una cascara de platano, porque loque hace la linea anterior quiere decir que pisa el objetcId  completo con age:25, es decir sustituye todo el documento. Es un error muy común.
>> no hacer cambios en caliente en Producción.

Lo que debemos hacer para actualizar la edad de ese objeto, con una actualizacion parcial:

```shell
> db.agentes.update({ "_id" : ObjectId("5d4bfd116c854955b2be8730") }, { $set: { name: 'Brown' } } )
```

Recordar por en `{ $set: {} }`
No importa el orden de los campos.


Cuando lleuemos a la parte de Mongoose le definiremos un eschema, Aunque Mongodb es `eschemaless`, yo puedo crear un schema y es bueno tener un eschema, porque hace que todos trabajemos en un mismo sentido. aunque yo tenga definido un eschema Mondodb puede seguir metiendo lo que quiera. Se crea un esquema para proteger el ingreso de datos, es en otra capa de software que mongodb no lo va a saber. 
El eschema nos ayuda a saber que tiene.

- En caso de que quiera saber como va a funcionar una query sin hacerla.

```shell
b.agentes.find({ age: 32 }).explain()
```

### MongoDB queries

- Buscar con like en mongodb, se lo debe hacer con expresiones regulares. regex

{ name: { $in: [/^acme/i, /^ack/] } }
{ name: { $regex: /acme.*corp/, $option } } 
{ name: {$not : } }

db.agentes.find({age: {$gt: 30} }) //$lt, $gte, $lte, ...
db.agentes.find({age: {$gt: 30, $lt: 40} }); //>30 y <40, por defecto cuando se conjugan varias con comas
db.agentes.find({ ame: { $in: [ 'Jones'], 'Brown' } }); //$nin
db.agentes.find({ name: 'Smith', $or: [
    { age: { $lt: 30}},
    { age: 43 } // 'Smith' and (age <30 or age = 43)
] })

**Buscar por subdocumentos**

Buscar todos los documentos de la ciudad de madrid.

```shell
db.agentes.find({"address.city": "Madrid"})
```

- Buscar en un array un teléfono. no tienes que hacer nada especial, solo si es que quiere poner algo como 

```shell
 db.agentes.find({ phone: '699887766' })
 db.agentes.find({bytes: [5,8,9]}) //array exact
 db.agentes.find({bytes: 5}) // array contain
 db.agentes.find({'bytes.0': 5}) //array position - p1er numero del array sea 5
```

### Ordenar - querys
Sespues de que busque todos los agentes que cumplan los determinados criterios, devuelvelos ordenados por age descendente

```shell
db.agentes.find().sort({age: -1})
```

### Descartar resultados
Saltate el primero de los que me vayas a dar y me das solo 1. esto viene muy bien para hacer paginación:

```sh
db.agentes.find().skip(1).limit(1)
db.agentes.findOne({name: 'Brown'}) // igual a limit(1)
```

Ejemplo claro es, cuando buscamos algo en google, si me da 40000 resultados, seguro que google no me da los 40000 solo veo los 10 primeros, y al fnal veo una paginación.

- pag1 - 10 primeros
- pag2 - saltate los 10 primeros y dame 10  skip(10).limit(10);
- pag3 - saltate los 20 primeros y dame 10  skip(20).limit(10);
- pag4 - saltate los 30 primeros y dame 10  skip(30).limit(10);
- y así sucesivamente para ir paginando.

### Contar

Busca todos los documentos que tiene dreterinados criterios y dime cuantos.
```shell
db.agentes.find().count()  //db.agentes.count()
```

Mongo db tiene muchas cosas, muchos añadidos.

 > Recomendado ver mongodb university. es formación den mongodb y son gratis.
    - MongoDB Basics
    - Hay un learnign path para las certificaciones.
      - Desarrollador
      - Administrador del sistema
    - La certificacion es barata, solo $150, me hago los cursos recomendados para esa certificación.
    - Es muy buena y gratis.

### Busqueda de texto completo - querys (busquedas tipos fulltext)

**Full text Search**

Crear índice conformado por los campos de texto involucrado, en este caso title, lead, body.

```shell
    > db.agentes.createIndex({title: 'text', lead: 'text', body: 'text'});
```

En este caso el indice es de tipo texto, y al crear el indice a la propiedad a indexar se le dá 'text'

Para hacer la busqueda usar:

```shell
>db.agentes.find({$text : {$search: 'smith jones'} });
```
Lo que hace esta query es: busca smith y jones, buscara todos aquellos documentos de la colección de agentes, que tengan o bien en su propiedad title, lead o body, o la palabra 'smith' o 'jones'.

**Full text Search - Frase exacta** 
```shell
db.agentes.find({$text: {$search: 'smith jones "el elegido"'}})
```

Usamos las comillas para indicar que queremos buscar exactamente una frase.

**Full text Search - Excluir un termino** 

```shell
db.agentes.find({$text:{$search:'smith jones -mister'});
```

Con esto en caso de querer implementar la funcionalidad de busqueda de texto, ya podria usar una busqueda muy potente.
Más info:
https://docs.mongodb.com/v3.2/text-search/
https://docs.mongodb.com/v3.2/tutorial/specify-language-for-text-index/

### Bases de Datos - MongoDB Geo (Busquedas feográficas)

Otro tipo de busqueda que se puede hacer son las busquedas geográficas.

https://docs.mongodb.com/manual/applications/geospatial-indexes/

Las busquedas geograficas son busquedas especiales que usan algoritmos geoespaciales.

Una busqueda típica es las tiendas mas cercanas:

#### Como creo los indices
- Creamos un indice de tipo '2dsphere', hay otros tipos de busqueda

```shell
>db.productos.createIndex({location: '2dsphere'})
```

#### Como insertamos los documentos

- Asi añadimos los documentos en esa coleccion:

```shell
db.productos.insert({
    "location": {
    "coordinates":[ -73.856077, 40.848447 ],
    "type": "Point"
    }
})
```
- El orden de coordinates es longitud, latitud.
- El type es de tipo punto, pero puedo hacer diferentes como polígonos, lineas, areas, zonas geográficas.

#### Como hacemos la busqueda.

```js
const meters = parseFloat(req.params.meters); // 105 * 1000
const longitude = parseFloat(req.params.lng); // -73
const latitude = parsefloat(req.params.lat); // 40

db.productos.find({
    location{
        $nearSphere: {
        $geometry: {
                type: 'Point',
                coordinates: [longitude, latitude]
            },
            $maxDistance: meters
        }
    }
})
```

## Transacciones en MongoDB

`findAndModify` es una operacion atómica, lo que nos dará un pequeño respiro transaccional.

```shell
db.agentes.findAndModify({
    query: {name: "Brown"},
    update: { $inc: { age: 1 } }
})
```
Necesito una operacion de busqueda y actualizacion:
Lo busca y si lo encuentra lo modifica, no permitiendo que otro lo cambie antes de modificarlo.

Un ejemplo es el caso de el stock negativos en una tienda online, o en entradas de cine, debo reservar butacas.
> Esto lo tiene recien mongodb

## Mongoose

Mongoose es parecido a un ORM. en realidad es un ODM (Object document Mapper) porque no es relacional como un ORM.
Es una herramiena que nos permite persistir objetos en MonoDB. Ayuda a definir esquemas y a preservar esos esquemas.

### Como funciona.

Instalación como siempre:

```shell
$ npm install mongoose --save
```

Cuando quiero hacer una conexion a mongodb, con mongoose no es necesario instalar el driver. Y MONGOOSE hace la conexxion y todos.

### Conectar a la base de datos

```js
var mongoose = require('mongoose');
var conn = mongoose.connection;

conn.on('error', (err) =>
    console.error('mongodb connection error', err) );
conn.once('open', () =>
    console.info('Connected to mongodb.') );

mongoose.connect('mongodb://localhost/diccionario');
```

> Quitaron la necesidad de usar la linea para indicar la libreria de promesas.

### Ejercicio mongoose

Vamos a hacer que nuestra aplicación node api se conecte usando mongoose con la conexión de agentes y empezar a usarlos.

Puedo verlo en `nodeapi`

1. Voy a crear un módulo que va a hacer la conexión. Ya que es un patron bastante común. Y ese módulo ese va a ser encargado de hacer la conexión de base de datos. Y así hago la sintaxis de conexion una sola vez.
   - Creo una carpeta `lib` porque vamos a meter ahí varios módulos de diversos tipos.
   - Dentro de `lib` creamos un nuevo fichero llamado `connectMongoose.js`
   - Luego instalamos mongoose:
        ```shell
        $ npm i mongoose
        ```
    - Lo vamos a cargar cuando carga la applicacion en `app.js`

2. Creamos un esquema
   - Creamos una carpeta `models`
   - Dentro de models, creamos un fichero `Agente.js`


    ```js
        var mongoose = require('mongoose');
        var agenteSchema = mongoose.Schema({

        });
    ```
    Hay una página donde me puedo guiar de las reglas para crear el modelos. Mongoose eschema types:
    `https://mongoosejs.com/docs/schematypes.html`

3. Creamos el modelo de Agente.

Mongoose hace la pluralización, del nombre del modelo Agente, y lo convierte en minúsculas para que corresponda con la colección de mongodb.

Si no queremos que no haga la pluralización, tenemos que hacer esto en el eschema:
//, {collection: 'agentes'} // para saltarse la pluralización
En este caso 'Agente', corresponderá a la colección 'agentes' en mongodb.

4. Hacemos el primer método de nuestra API

- Dentro de la carpeta `routes` creamos una carpeta llamada `apiv1`
  > Ojo: Tenemos que versionar desde el principio ya que cuando ya usen y este en producción no puedo hacer cambios, sino hacer otra version y cuando los usuarios quieras la usen o se pasen a ella. Este versionamiento de hace con `git`. Se puede hacer o tener varias ramas con varias versiones.

- Dentro de la carpeta apiv1, creamos el fichero `agentes.js` en minuscula y en plural, que va a ser mi fichero de rutas, en las que voy a poner los middlewares que respondan peticiones para trabajar con agentes.

- Dentro del fichero `agentes.js` creamos el middleware que respondera a la peticion de agentes, luego en `app.js` usamos la ruta del primer endpoint de nuestra api 

```js
app.use('/apiv1/agentes', require('./routes/apiv1/agentes'));
```

Si es que me llega a dar este error: 
`TypeError: Router.use() requires a middleware function but got a Object` es por se me a olvidado exportar el router.