# Día 5

- Hay una libreria de promisefy para convertir un callback a una promesa.
- Hay otra libreria que se llama bluebird convert promise, que convierte a promesas. Incluso tiene un método que convierte todo los métodos a promesas.

El día de ayer se vio Bases de Datos MySql. Es bastante facil
- Cargar el driver.
- Conectar.
- Hacer consulta.

Para refrescar conceptos de SQL podemos revisar:

[sqlteaching](https://www.sqlteaching.com/)


## Bases de datos - SQL ORMs
En cuanto a usr bases de datos desde codigo, en algunos casos solemos usar ORM (Object Relational Maping) se encarga principlamente de:
- Abstraer o quitar la posible complejidad que pueda tener el lenguaje sql.
- Convertir objetos en consultas SQL para que puedan ser persistidos en una base de datos relacional.
- Traducir los resultados de objetos a  consulta SQL y generar objetos.

Guardar cosas en el filesystem o un fichero plano o binario es rapido pero tiene una desventaja pero para recuperarlo rapidamente si es que tenemos varios miles es lento, porque no tienen indices.

Si nosotros queremos guardar cosas en ficheros, deberiamos crearnos un indice para podernos buscar de forma mas rapida para no leer todas las lineas. 
Es parecido al índice de un diccionario. 

Un indice por ejemplo los registros que empiezan su nombre por 'A' son el 8315, el 8314 y el 2000 y me apunto eso, y en el momento que alguien me dice se busca a Alfonso, no tengo que recorrer a todos sino voy al indice y veo los que comienzan por A.

Esta misma técnica anterior más evolucionada se usa en las BBDD y es la mayor ventaja de una base de datos, la velocidad con la que puedo encontrar algo igual de rapido si tuviera 500 datos a tener 5 millones de datos. Si no tuvieramos indices en una base de datos me pasara lo mismo que el diccionario desornado. 

Por eso se recomienda usar motores de bases de datos, nos permitira manjear informacion rapidamente.

Esto nos resultará util si el diseño de nuestra aplicación es orientado a objetos (OOP).

Además los ORMs son librerias que nos da la ventaja de persistir esos datos. Es decir se pasa un objeto y el se encarga de tomar las propiedades del objeto.

### Desventaja ORM

Un ORM no es muy eficiente cuando tiene que hacer muchas operaciones seguidas. Cada operacion tiene una sobrecarga de operacion ya que el hecho de que tiene que convertir cosas y comprobarla, tiene una penalizacion en rendimiento. 
Cuando se nota mas esa penalizacion Ejm: 
- Se tiene un fichero con 1 millon de pedidos y quieres cargarlo en la tabla de bases de datos de pedidos, aqui es uno de los casos en que un ORM no ayudara mucho porque cada operacion de insercion y demorará mucho. En este caso mejor no usar un ORM es mejor crear las insert manualmente en el código.

### ORMS - alternativas

Un ORM muy usado para bases de datos SQL es sequelize:
http://docs.sequlizejs.com/en/latest/

Sequelize tiene soporte para MySql, MAriaDB, SQLite, PostgreSQL y MSSQL.

Otras buenas alternativas son:
- Knex
- Bookshelf
- `TypeORM`, trabaja con typeScript en el framework `nestjs` (sera bueno si es que el proyecto se usa con typescript) es bueno para personas o proyecto muy orientada a objetos.

La decicion de usar un ORM no es dificil de tomar, lo utilizo para las partes que lo aprovecho pero si debo hacer cargas o exportaciones masivas las hago con el driver.

> Para cosas masivas utilzo el driver y consultas directas.

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
// cargar driver
const { MongoClient }  = require('mongodb');

// Conectarnos a la base de datos
// una vez conectado vemos un callback
MongoClient.connect('mongodb://localhost', function(err, client){
    // controlamos un error
    if (err) throw err;
    // decimos que use la base de datos cursonode
    const db = client.db('cursonode');
    // voy a usar la coleccion de agentes y de ahí
    // esto de aqui es una consulta (db.collection('agentes').find({})), equivalente a un select * from agentes.
    // el resultado me lo paso a un array de documentos en este callback .toArray(function(err, docs))
    db.collection('agentes').find({}).toArray(function(err, docs){
        if(err) throw err;
        console.dir(docs);
        cliente.close();

    });
});
```

### Instalar mongodb

- Ingresamos a la página de mongodb, descargo .tgz
    - Los que usasn windows con instalar y dar siguiente siguiente lo instala y lo deja arrancado.
    - Los que usan linux pueden descargar el .tgz, descomprimirlo y arrancarlo.

### Arrancar mongodb
Como vemos hay una carpeta bin de lo que nos hemos descargado.
- Lo que nos hemos descargado son un monton de ejecutables, y de acuerdo a su nombre sabremos que son. Ejm. Mongoimport, mongoexport, mongodump, mongorestore, mongo(cliente), mongod(servidor).

Los que necesitaremos son:
- mongo (cliente)
- mongod (daemon- servidor)

Despues para conectarme a el por consola, ejecutare el cliente que es `mongo`

1. Crear los siguientes directorios

```shell
$ sudo mkdir -p /data/db
```

2. Luego corremos el siguiente comando:
    ```shell
    $ ./bin/mongod --dbpath ./data/db --directoryperdb
    ```
- La opcion --dbpath: son las rutas donde se van a crear las bases de datos. En que carpeta quiero que el ponga las bases de datos, puedo ponerla a lado de la carpeta bin creamos esto ./data/db. Puedo poner la ruta que se quiera, pero la documentacion dice que se usa la ruta /data/db

- La opcion --directoryperdb es para cuando se quiera crear una nueva base de datos en un fichero nuevo y no mexcle todo
- Luego de ejecutar, me van a salir un monton de mensajes de log de servidor, y si entre eso vemos este mensaje `waiting for connections on port 27017`, esto me dice que ya está arrancado el servidor.

 **Comprobar si ya esta arrancado**

- Como ver si el servidor mongodb esta arrancado en el caso de linux y mac:
    Est es para ver el PID del proceso

```shell
$ ps aux | grep mongod
```

como parar el servidor por linea de comandos
```shell
$ kill 22682     (PID)
```

Para recordar el comando para arrancar el servidor MongoDB: Creamos un fichero README.md en nodeapi

y en el Readme pongo como recordatorio el comando para arrancar mongodb en local.
* MongoDB (to start a local server you can use ./bin/mongod --dbpath ./data/db --directorydb)

-el puerto 27017 es el puerto por defecto que mongodb utiliza.


3.  Luego corro el cliente de mongoDB, que se conecta al servidor y desde este prompt podremos ordenar cosas a ongodb

```shell
$ ./bin/mongo
```

Nos aparecerá un prompt, que es la shell de mongodb. A parte nos apareceran algunos Warnings, pero esto nos trata de decir que recordemos que tenemos el servidor sin autenticación, es decir no he creado usuarios ni nada de eso. Y explica que si lo vamos desplegar en produccion en algun momento, recomienda que controlemos las ips a las que los exponesmos, crear algunos usuarios para que no acceda todo el mundo. Ahora para desarrollar nos da igual ahora mismo.

### Shell basics de MongoDB

Ahora ya estamos en la shell de mongoDB, este el cliente que se conecta a mongodb y le podemos mandar ordenes, como lista esto. inserta lo otro, exportalo y un monto de cosas:

#### Listar Bases de Datos de mongodb

```sh
    > show dbs
```

#### Cambiarme o usar una BD
Cambiarme o usar una base de datos que yo le diga. Ahora el contexto pasa a la base de datos admin

  ```shell
  > use admin
  ```

#### mostrar las collections de una base
Mostrar las colecciones de la base de datos admin que es donde esta el contexto ahora.
```sh
    > show collections
```
Las colecciones son lo que en una base de datos relacional solemos llamar tablas.

####  Crear una BD 
Creamos una base de datos 'cursonode', hacemos un 
```sh
    > use cursonode
```
Vemos que ha cambiado el foco a la base de datos `cursonode`, como se ve no falla, aunque no exista. PEro sabe que los comandos que a partir de ahora te voy a decir tienen su contexto a la base de datos 'cursonode' exista o no y si te la tienes que crear la creas.

Si hacemos un
```sh
> show collections
```
Ps vemos que no tiene nada. y si hacemos un > show dbs vemos que todavia no la creado.
```sh
> show dbs
```
#### Guarde un documento en una coleccion

- luego creamos o insertamos un objeto entre llaves {}

```shell
> db.agentes.insert({ name: 'Smith', age: 41})
```

Se puede usar comillas simples o comillas dobles, es indiferente.
Nos aparecerá un mensaje diciendo que se ha insertado un documento.

## Cliente gráfico para mongodb

Para quien no se encuentre comodo con la consola. Mongodb tiene un propio y gratuito
- Que es MongoDB Compass
- Y hay otra herramienta que es Robomongo o la gratuita que es Robo 3T (), tiene pocas cosas.

Ahora ya pueso gestionar mongdb desde un cliente grafico

- todos los documentos mongodb van a tener un _id que lo crea automaticamente la base de datos cuando se insertan y por defecto.
- Ademas se crea con un indice _id_ por ese campo _id. Cuando vemos el indice _id_ vemos que es un numero 1, si es 1 es ascendente y si es -1 es descendente. Es un dato de tipo ObjectId. No es comun en mongo usar un campo autoincremental.

- El mismo find que esta en robo 3t lo vamos a hacer en la consola y escribimos:
```sh
> db.agentes.find({})
```
Y nos mostrara la coleccion de agentes.
- Vamos a crearnos algunos agentes mas:
```sh
>db.agentes.insert({name:'Brown', age:24)
>db.agentes.insert({name:'Jones', age:32)
>db.agentes.find({}) --recuperamos
```
- Ahora vamos a demostrar que mongodb es `schemaless`, para esto creamos otro agente, pero le vamos a añadir otras propiedades:
```sh
>db.agentes.insert({name:'Superlopez', age: 36, address: { street:'Calle Pez', city:'Madrid' }, phone: ['699887766','916665544'] })
```
En caso que nos hubieramos equivocado por ejm en un corchete, va a decir que falta un cierre.

Si vuelvo a dar al comando find(), como vemos mondodb no me ha puesto la mas minima traba para llenar o agregar esta coleccion, de hehco esta coleccion agentes, no tiene ningun esquema asociado como tal, y cada documento independiente puede tener un esquema distinto.

**.Pretty()**
Si quiero ver de mejor forma en la consola puedo ejecutar el find con pretty(). Esto hace que aparezca formateado e identido hacia la derecha cada objeto o documento.

```shell
> db.agentes.find().pretty()
```

### Criterios de filtro
- En Robo3t puedo ejecutar la sentencia con ctrl + r.
- Ademas ya en la consola en el find puedo agregar una condicion, filtro o criterio. ejm:
```sh
>db.gteCollection('agentes').find({name: 'Smith'})
```
Me mostrara los resgitros que cumplas con ese criterio.

- En la consola igual, dentro del find({}) puedo ingresar un objeto con los criterios de filtro para los documentos que quiero recuperar. ejm listar todos los criterios o documentos que tengan la edad a 32
```sh
> db.agentes.find({ age: 32 })
```

## Indices en MongoDB

Se hace incapie en los indices. A partir de que tengan 10000 o 20000 si no creo un indice para el filtro anterior voy a empezar a ver un retraso.
Se recomienda hacer un índice por los campos que suelo buscar.
¿Que creo, un indice por cada campo?

> Si lo escribo en el código de una aplicación, entonces debo crear un índice.
Cada vez que escriba en mi app, código que filtre una coleccion por algún criterio, **debo crear un índice**. Ya que en producción pueden haber miles o millones de registros en una colección.

La base de datos se va a comportar bien si le pongo y creo los indices que debo crear.

### Crear indices
Vamos a crear un indice por edad, segun el criterio de filtro anterior.

dentro del createIndex() metemos un objeto {} con los campos involucrados, es decir quiero que el indice lo hagas por {age: 1} edad ascendente, -1 es descedente.
1 es ascendente y -1 descendente.

```sh
> db.agentes.createIndex({ age: 1p})
```
Tambien se pueden crear indices combinados con varios campos. Por ejm si yo en algun momento voy a hacer un busqueda y yo le digo a mongodb, buscame todos los documentos de la coleccion de agentes que tengan el codigo postal= 28022 y la edad sea 32, aqui estoy haciendo una busqueda por 2 criterios, 1ero el de codigo postal y luego el de edad, entonces aqui crearé.algo como esto:

```sh
> db.agentes.createIndex({ cp: 1, age: 1})
```
Aqui pongo 1 o -1 si a cualquiera de los campos si quiero ordenarlos.

- Nos creamos el indice por edad.

### Listar indices existentes

Para ver los indices usamos:

```sh
> db.agentes.getIndexes()
```
Vemos que la coleccion de agentes tiene un indice por _id ascendente y un indice por age ascendente.
Tambien lo puedo ver en robo3t

>**¿Que tiene de malo crear indices por todos los campos?**

 No tiene de malo, la cosa o inconveniente es que los indices ocupan espacio en disco. Si hago indices por todos los campos voy a ocupar mucho, `Overkill` se le llama, seria mejor hacer los indices cuando los necesite.
 
 Es algo de `overenginieering = sobre ingeniería`, que es crear cosas por si las voy a necesitar en el futuro es un caso que hacemos todos los seres humanos. 
 
 `Comentario del Instructor` Hay un efecto `YAGNI` son las siglas de (no vas a necesitarlo) esto se nos debe venir a la mente cuando tengamos ese pensamiento por si acaso me sirva, pero si no necesito ahora no añadir ese método, porque voy a tener que mantenerlo. Limítate a cumplir lo que tienes que cumplir, porque es un añadido de tiempo y complejidad innecesario. Porque eso es un enemigo de la supervivencia de proyectos.

 - Cuando creas documentos, el motor de base de datos tiene que actualizar todos los indices que tiene.

> Se deben crear indices en el momento que sabes que te van a hacer falta de cara al futuro, por ejm. si estoy escribiendo código y estoy haciendo un find, debo te voy a crear un índice para que sea lo suficiente rápido como ahora.

## Editar documentos MongoDB - Modificaciones 
Podemos esitar alguno de los documentos:
Voy a tomar a Brown y voy a modificarle la edad de 24 a 25, voy a usar su objetID _id.
    "_id" : ObjectId("5d7aa2cc8eeecd78547e20e8")

Se lo hace con la suiente línea:
```sh
> db.agentes.update (criterio_de_filtro,{ age: 25})
> db.agentes.update({ "_id" : ObjectId("5d4bfd116c854955b2be8730") }, { age:25 })
```

Dentro de las primeras llaves estoy poniendo el criterio de filtro, es decir diciendo que agente son los que quiero modificar, en este caso filtro por la propiedad _id, con esto ya le digo que agente es el que quiero modificar.

Despues de poner este criterio de filtro puedo modificar varios, pero en este caso es solo 1.
db.agentes.update({"_id" : ObjectId("5d7aa2cc8eeecd78547e20e8")}, {age:25})

En el segundo parametro ponemos el campo que queremos cambiar es decir la {edad:25}.

### Error comun al editar
>> Pero recordar esto tiene una cascara de platano.
Si hacemos un find() vemos que no aparece ya `Brown`, el documento al que le modificamos la edad.

```sh
 > db.agentes.find({}).pretty()
 ```
> Que crees que ha pasado: Lo que ha pasado es que se ha actualizado el registro completo los campos y todo. Porque loque hace esta linea es sustituir un documento por otro.
```sh
> db.agentes.update({"_id" : ObjectId("5d7aa2cc8eeecd78547e20e8")}, {age:25})
```
Es decir le esta diciendo actualisame este objetcId y lo pisas por completo con este otro {age:25}, es decir sustituye todo el documento.

>Es un error muy común lo que falta es el set y el campo que se quiere actualiar, se recomienda no hacer cambios en caliente en Producción. Y si los vas a hacer en caliente, usar a otra persona que ayude para que revise o de segundo para de ojos, y vaya viendo si esta bien.

### Como actualizar parcialmente/ correctamente
Si es que quermos hacer una actualizacion parcial, lo que debemos hacer para actualizar la edad de ese objeto, con una actualizacion parcial es usar $set en el segundo parametro o en el segundo objeto: ejm

```shell
> db.agentes.update({"_id" : ObjectId("5d7aa2cc8eeecd78547e20e8")},{ $set: { age: 25 } })
```

 - Vamos a usar esto para corregir el documento de 'Brown' que dañamos
```sh
> db.agentes.update({ "_id" : ObjectId("5d7aa2cc8eeecd78547e20e8") }, { $set: { name: 'Brown' } } )
```
Luego con
```sh
> db.agentes.find({}).pretty()
```
- Recordar poner `{ $set: {} }`
- No importa el orden de los campos.

> Javascript abarca en el tipo `number` tanto números decimales como enteros.

Cuando lleguemos a la parte de Mongoose trabajaremos en definirle un eschema, para usarlo con esquema. 
Aunque Mongodb es `eschemaless`, yo puedo crear un schema. 
Y es bueno tener un eschema de las cosas, porque hace que todos trabajemos en un mismo sentido y conozcamos lo que hay dentro de las colecciones anque mongodb me permite tener colecciones sin esquema aunque yo defina el esquema en otro sitio mongoDB me dejara meter ahi lo que yo quiera. 
El esquema no se lo voy a decir a mongoDB se lo voy a decir en una capa de software mía que voy hacer para un esquema que yo voy a usar y aprovechar. aunque yo tenga definido un eschema Mondodb puede seguir metiendo lo que me de la gana desde otros sitios. 
Por ejemplo si quiero que un usuario de nuestra aplicación llama a nuestro API y nos da los datos de un agente que queremos meter aquí, querras que de nombre y edad, pero si empieza a dar datos que nosotros no conocemos o el API conoce, ejem numeros de factura o que guarde un binario con un PDF. Pero yo no quiero que guarde eso,  por eso hacemos un esquema, para prteger los esquemas que nosotros queremos que tengan los documentos al momento de la introduccion de los datos. El motor de base de datos nos deja, pero nosotros en el software nos vamos a imponer con un esquema en las partes que queramos, para ayudarnos con esto.

El esquema viene bien cuando no conosco el contenido de una coleccion.
Se crea un esquema para proteger el ingreso de datos, es en otra capa de software que mongodb no lo va a saber. 
El eschema nos ayuda a saber que tiene.

### Borrar colecciones en mongodb
Uso el comando drop() para borrar una coleccion o lo que conocemos como tabla en SQL.

```sh
> db.coleccion.drop()
```
### Borrar un documento en mondb
Para borrar un documento o un registro en monddb o lo que conocemos como registro o tupla en sql, usamos el comando remove()

```sh
> db.agentes.remove({_id: ObjectId("217361273612786381726317dd")})
```

### Explicar funcionamiento de un query

Este comando .explain() se usa en caso de que quiera saber como va a funcionar una query sin hacerla. Por ejemplo para saber si va a usar un indice que hayamos creado, etc.

```sh
> db.agentes.find({ age: 32 }).explain()
```
En el caso de ver si esta usando un indice en la parte stage si hay un `IXSCAN` eso es bueno por que está escaneando un indice, ademas como vemos el kepattern {age: 1} por edad es ascendente. y esta usando el indice 'indexName': 'age_1'
Si tuviese un `COLLSCAN` eso es malo, ya que se va a recorrer toda la coleccion o tabla.

```sh
> db.agentes.find({ age:32 }).explain()

        "queryPlanner" : {
                "plannerVersion" : 1,
                "namespace" : "cursonode.agentes",
                "indexFilterSet" : false,
                "parsedQuery" : {
                        "age" : {
                                "$eq" : 32
                        }
                },
                "queryHash" : "3838C5F3",
                "planCacheKey" : "041C5DE3",
                "winningPlan" : {
                        "stage" : "FETCH",
                        "inputStage" : {
                                "stage" : "IXSCAN",
                                "keyPattern" : {
                                        "age" : 1
                                },
                                "indexName" : "age_1",
                                "isMultiKey" : false,
                                "multiKeyPaths" : {
                                        "age" : [ ]
                                },
                                "isUnique" : false,
                                "isSparse" : false,
                                "isPartial" : false,
                                "indexVersion" : 2,
                                "direction" : "forward",
                                "indexBounds" : {
                                        "age" : [
                                                "[32.0, 32.0]"
                                        ]
                                }
                        }
                },
                "rejectedPlans" : [ ]
        },
        "serverInfo" : {
                "host" : "MAPC100ASD02",
                "port" : 27017,
                "version" : "4.2.0",
                "gitVersion" : "a4b751dcf51dd249c5865812b390cfd1c0129c30"
        },
        "ok" : 1
}
```
Esto es bastante útil para saber si una consulta esta usando los indices que crees debe usar. En el caso de querer ver los indices.

### Referencia de la shell de MongoDB

Documentacion de MongoDB

### MongoDB find regex queries
ASi como en sql podemos buscar con like en mongodb, se lo debe hacer con expresiones regulares en el comando $regex. Tiene mas pontencia que en sql.

El caso mas tipici es el case insensitive osea buscar por minusculas o mayusculas.

{ name: { $in: [/^acme/i, /^ack/] } }
{ name: { $regex: /acme.*corp/, $option } } 
{ name: {$not : } }

## MongoDB queries - formas de buscar

Hay otras formas tambien de buscar, bastante comunes.
Por ejemplo:

### Por rangos
- Mayor que:
```sh
> db.agentes.find({age: {$gt: 30} }) //$lt, $gte, $lte, ...
```
- Menor que 
```sh
> db.agentes.find({age: {$lt: 30} }) //$lt, $gte, $lte, ...
```
- Mayor o igual que , menor o igual que
```sh
> db.agentes.find({age: {$gt:24, $lte:32}})
> db.agentes.find({age: {$gt: 30, $lt: 40} }); #>30 y <40, por defecto cuando se conjugan varias con comas
```
> Tener en cuenta : la ',' dentro del objeto es la conjución 'and' o 'y'.

### $in
En caso de querer usar la conjucion or, podemos usar $in que filtra por nombres que esten 'en':
```sh
> db.agentes.find({ ame: { $in: [ 'Jones'], 'Brown' } }); //$nin
> db.agentes.find({name: {$in: ['Jones', 'Brown']}}) //$nin
```
Aqui podriamos usar una expresion regular tambien.

### $nin
Así existe el metodo $nin que quiere decir que no este en o entre, es la negacion de $in
```sh
> db.agentes.find({name: {$nin: ['Jones', 'Brown']}})
```

### $or 
Es un poco el patito feo, pero si quiero hacer un or, las distintas partes del or las tengo que poner entre corchetes y asignarselas a $or, es decir meterlo en el vector de $or.
Ejemplo:
```sh
> db.agentes.find({ name: 'Smith', $or: [
    { age: { $lt: 30}},
    { age: 41 }
] })

>db.agentes.find({name: 'Smith', $or:[{age:{$lt:30}}, {age:41]})
```
Es como hacer o decir o traducido en el where de sql: ` name='Smith' and (age <30 or age = 41)`

### Buscar por subdocumentos
Como podemos buscar por subdocumentos, por ejemplo el caso del documento 'Superlopez', que tiene los subdocumentos 'address' y 'phone'. 
**Ejm 1:** Vamos a buscar todos los documentos de la ciudad de madrid. (Nota: si estuviera escribiendo esto en el código, aprovecharia y crearia un índice.)

```shell
> db.agentes.find({"address.city": "Madrid"})
> db.agentes.find({"address.city": "Madrid"})
```
Tener en cuenta que las propiedades de subdocumentos al hacer un query se usan con comillas dobles "", porque se usa la propiedad punto (.) en este caso el subdocumento 'address' tienen una propiedad 'city' a la cual hago referencia con "address.city"

Al ejecutar esta query me devuelve el documento de 'Superlopez'

**Ejm 2:** Buscar en un array por teléfono o el subdocumento 'phone' que está en un array. Buscar en un array es muy facil, no tienes que hacer nada especial, solo si es que quiere poner algo como 
```sh
> db.agentes.find({ phone: '699887766' })
```
Esto me devuelve igual el documento de superlopez.

- Como se ve para buscar en arrays no hace falta nada especial, solo quizas si a lo mejor quieres especializarcelo diciendo que quieres que el primer elemento del array sea igual a 5, esto por la posicion dentro del array, ejm:
```sh
 > db.agentes.find({'bytes.0': 5}) #array position - p1er numero del array sea 5
```
- O si quieres buscar documentos que tengan un array exactamente igual, ejm:

```sh
 > db.agentes.find({bytes: [5,8,9]}) #array exact
```
- O si quiero buscar en un array en la que una de sus posiciones contenga un 5, ejm:
```sh
 > db.agentes.find({bytes: 5}) // array contain
```

### Documentacion de mongodb para buscar colecciones y hacer querys
[db.collection.find](https://docs.mongodb.org/manual/reference/method/db.collection.find/#db.collection.find)
[query-documents](https://docs.mongodb.org/manual/tutorial/query-documents/)

Estos links tienen mucha información util.

### Ordenar - querys

Despues de que busque todos los agentes que cumplan los determinados criterios, y sobre esos devuelvelos ordenados `.sort()` por age `.sort({age})` y descendente `.sort({age: -1})` en este caso -1

```sh
> db.agentes.find().sort({age: -1})
```

### Descartar resultados

#### skit(), limit()
Tambien podemos descartar algunos resultados por el orden en el que están, tambien por otras cosas.

Ejemplo:
- Podemos decirle saltate el primero de los que me vayas a dar y me das solo 1.  Esto se lo hace con `.skit()` y `.limit()`.
```sh
> db.agentes.find().skip(1).limit(1)
```
#### findOne()
- Otra forma de limitar por ejemplo usando `.findOne()` en lugar de `.find()`, es igual que decir:
```sh
> db.agentes.findOne({name: 'Brown'}) 
```
Esto es igual que decir .limit(1):
 ```sh
 > db.agentes.find({name:'Brown'}).limit(1)
 ```
> Esto viene muy bien para paginar o hacer paginación. Despues los vamos a probar y lo meteremos en el código para que nuestro API pueda entregar resultados paginados.


#### Cuando hablamos de paginar
Ejemplo claro es, cuando buscamos algo en google por ejemplo perros, si me da 40000 resultados, seguro que google no me da los 40000 solo veo los 10 primeros, y al fnal veo una paginación.

- pag1 - 10 primeros
- pag2 - saltate los 10 primeros y dame 10  `.skip(10).limit(10)`
- pag3 - saltate los 20 primeros y dame 10  `.skip(20).limit(10)`
- pag4 - saltate los 30 primeros y dame 10  `.skip(30).limit(10)`
- pag5 - saltate los 40 primeros y dame 10  `.skip(40).limit(10)`
- y así sucesivamente para ir paginando, mantendriamos los criterios de busqueda de perros pero le decimos que limite los resultados que quiere obtener 

### Contar resultados

Ejemplo: Busca todos los documentos que tiene dreterinados criterios y dime cuantos.

```sh
> db.agentes.find().count()  
> db.agentes.count()
```

Mongo db tiene mucha funcionalidad, cosas, y muchos añadidos.

## MongoDB University
[MongoDB University](https://university.mongodb.com)
Recomendado ver mongodb university. es formación den mongodb y muchos de los cursos son gratis.  
    - MongoDB Basics -> ya las estamos viendo aqui en el curso aunque comenta algunas cosas más
    - El curso Next Class: M220JS: MongoDB for Javascript Developers, estos temas casi los cubrimos aqui en el curso.
    - Hay un learnign path para las certificaciones.
      - Desarrollador/ Developer
      - Administrador del sistema
    - La certificacion es barata, solo $150, me hago los cursos recomendados para esa certificación.
    - Es muy buena formación y gratis.

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