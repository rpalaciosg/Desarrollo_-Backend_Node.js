# Sobre la práctica

## Explicado día 6

- En la parte de filtrar productos por rango de precio se debe pasar 10-50, -50, se debe validar que el primer valor debe ser menor cuando se pase 50-10, en ese caso devolver un array vacio.
- Por defecto siempre debemos mostrar el listado de registros poniendo un límite, es decir paginado.
- En la lista de tags únicas, intentar hacer un select distincs para devolver los tags únicos. db.collection.distinc(field, query, options)
- Si meto una variable que no existe en la consulta, debo ingorarlo.
- Debo validar el parametro fields, o campos, si es que paso un número, implementar usando express validator.
- PAra la parte de hacer un script para inicialización de la base de datos, puedo lerr un fichero con json con la libreria fs con el método readFile o usar require(sincrono).
  - Creo un fichero initDB.js
  - Creo una carpeta data/ y dentro uno de agentes.json
  - Puedo hacer esto ya que me sirve y me devuelve un objeto ya cargado, no hace falta usar fs.readFile.

    - Para leer un fichero con fs y me devuelva una promesa puedo hacer esto:
    ```js
        const fsPromise = require('fs').promises;
        fsPromise.open();
        fsPromise.readFile();
    ```
    Esto devuelve una promesa.

  - o puedo hacer esto :
    ```js
    'use sctrict';

    const datos = require('./data/agentes.json'); //sincrono
    //o
    fs.readFile('.asds.txt', (err, data) => {//si esto tiene varios gigas no es recomendable xq se desborda la memoria

    });
    // en caso de que sea un fichero Grande osea en gigas podemos usar un buffer. especificamente
    // Usar streamReadable, el cual se usa por Buffer.  Me creo un stream desde un fichero y le voy creando eventos de estos:
    // readeble.on('data', (chunk) => {
    //  console.log(`Received ${chunk.length} bytes of data`);
    //});
    //, lo que va haciendo es dandome datos como paginados. en un bbuffer y me da un chunck. Y si quiero
    // lo voy uniendo a los trozos anterior o lo normal es irlo procesando. Esto es trabajar en forma de eventos
    // Como abrir el buffer de un fichero, entonces fs tiene otro método  fs.ReadStream son Readable Streams
    // Yo hago fs.createReadStream()  y lo que me devuelve es un objeto a lo que yo le puedo poner .on('data'), (chunk) =>.....

    /**
     * Ejemplo de cuando pienso que el fichero puede ser muy grade.
    **/
    // creao stream de lectura contra la ruta de un fichero.
    var readStream = fs.createReadStream(filename);

    // luego en este stream de lectura ya pongo los eventos que salen como .open o .on('data')
    // Acabo de abrir el archivo, 
    readStream.on('open', function(){
        // 
        readStream.pipe(res);
    });
    
    // aqui puedo poner .on('data'), saltará tantas veces, como los bloques de datos que vaya leyendo de ese fichero.
    // y en memoria solo tengo un trozo, y va saltando al siguiente trozo
    readStream.on('data', function(){
        readStream.pipe(res);// puedo usar esto en un stream de escritura o de proceso
        // puedo buscar en la documentacion en el API for Stream Consumers, en vez de decir .on('data') me creo un consumidor de Streams un streams writable
    });

    //
    readStream.on('error')  
    /**
    * usnado stream writable
    **/  
    const { PassThrough, Writable } = requir('stream');
    const pass = new PassThrough();
    const writable = new Writable();

    // Writable es un intermediario, es con lo que se puede scribir un stream ahí.
    // Yo me lo creo y puedo enpipar de un fichero a ese writable.

    /**
     *  En la documentacion de Node.js puedo buscar API for Stream Implementers
    **/
    const { Writable} = require('stream');

    // puedo crearlo con clase 
    class MyWritable extends Writable {
        constructor(options) {
            super(options);
            //..
        }
    }

    // o de la forma sencilla
    const myWritable1 = new Writable({
        write(chunk, encoding, callback) {
            //Aqui se va a ejecutar cada vez que me de un trozo o chunk
            // cuando termine de procesarlo llamo al callback.
        }
    });

    // Depsues con el writable que cree,como uso este ps con el pipe 
    // de un stream de lectura, pipe a mi writable que es el que creamos arriba

      readStream.on('data', function(){
        readStream.pipe(myWritable1); // lo empipo a mi writable
        
    /**
     * otro ejemplo escribiendo en un archivo
   **/
   const fs = require('fs');
   const readable = getReadableStreamSomehow();
   const ritable = fs.createWriteStream('file.txt');
   readable.pipe(writable);
    });

    // Hay 3 tipos
    // readable = que solo leee y yo hago algo con lo que he leido y despue sno devuelve un stream
    // writable = que recibe datos de un stream y de ese no puedo leer.
    // transform = trasnformación = al que le puedo pasar datos como leer datos, significa que puede leer datso y devolver datos.

    /**
     * Ejemplo stream de transformación en un stream-utils.js que procesa ficheros bastante grandes. del profesor Javier Miguel
    **/
    module.exports.insertToMySql = function(conn, tableName, rowCustomizerFn) {
        if (!rowCustomizer)
        return new Trasnform
        // le puedo enganchar streams que escriben en el y streams que leen de el
    }


    ```

- Se debe hacer una vista para mostrar los anuncios. Esta vista no tiene que usar el API.
  - La vista debe mostrar el resultado de la peticiòn, con un for usando js en ejs. Foreach de un array, y ese array haberlo sacado de la base de datos.
  -  Lo unico en comun es que se van a usar los mismos modelos. Van usar ambos el modelo de Anuncios. Se podria compartir tambien la validación de los datos, ya que la parte de código, puedo ponerlo el codigo reutilizable, en un módulo o en un modelo, para tenerlo en un sitio en común y usarlo para las ambas cosas.
  Por ejemplo en index.js tendremos algo como 
  ```js
  Agente.find() y llamaremos al modelo apra poder obtener los datos
  ```
  - La vista mostrara la query de la peticion de datos que le haga el modelo, se la paso a la vista con locals, el objeto de resultados, la vista hace un bucle con ella y lo mostrará.
  - Igual los resultados se van a ir mostrando de acuerdo a los parametros del URL. No hace falta hacer un formulario con un boton o algo.
  `localhost:3000?limit=3&precio=50`



  {
    "anuncios": [
    {
        "nombre": "Bicicleta",
        "venta": true,
        "precio": 230.15,
        "foto": "bici.jpg",
        "tags": [ "lifestyle", "motor"]
    },
    {
        "nombre": "iPhone 3GS",
        "venta": false,
        "precio": 50.00,
        "foto": "iphone.png",
        "tags": [ "lifestyle", "mobile"]
    },
    {
        "nombre": "Teclado",
        "venta" : true,
        "precio": 65.00,
        "foto": "teclado.png",
        "tags": ["work", "lifestyle"]
    },
    {
        "nombre": "Mouse",
        "venta": false,
        "precio": 29.00,
        "foto": "mouse.png",
        "tags": ["work", "lifestyle"]
    },
    {
        "nombre": "Audifonos Sony",
        "venta": true,
        "precio": 79.00,
        "foto": "audifonos.png",
        "tags": ["lifestyle"]
    },
    {
        "nombre": "Cubo rubik",
        "venta": true,
        "precio": 15.00,
        "foto": "cubo_rubik.jpg",
        "tags": ["lifestyle"]
    },
    {
        "nombre": "Smartwatch",
        "venta": true,
        "precio": 40.00,
        "foto": "smartwatch.png",
        "tags": ["mobile", "lifestyle"]
    },
    {
        "nombre": "Mochila",
        "venta": false,
        "precio": 40.00,
        "foto": "mochila.png",
        "tags": ["work", "lifestyle"]
    }
    ]
}