# Sobre la práctica

## Explicado día 6

- En la parte de filtrar productos por rango de precio se debe pasar 10-50, -50, se debe validar que el primer valor debe ser menor cuando se pase 50-10, en ese caso devolver un array vacio.
- Por defecto siempre debemos mostrar el listado de registros poniendo un límite, es decir paginado.
- En la lista de tags únicas, intentar hacer un select distincs para devolver los tags únicos. db.collection.distinc(field, query, options)
- Si meto una variable que no existe en la consulta, debo ingorarlo.
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
    // en caso de que sea un fichero Grande osea en gigas podemos usar un buffer.
    // Usar streamReadable, el cual se usa por Buffer.
    // Hay otro método fs.createReadStream() -> 
    
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