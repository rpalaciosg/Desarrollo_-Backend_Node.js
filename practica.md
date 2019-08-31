# Sobre la práctica

## Explicado día 6

- En la parte de filtrar productos por rango de precio se debe pasar 10-50, -50, se debe validar que el primer valor debe ser menor cuando se pase 50-10, en ese caso devolver un array vacio.
- Por defecto siempre debemos mostrar el listado de registros poniendo un límite, es decir paginado.
- En la lista de tags únicas, intentar hacer un select distincs para devolver los tags únicos.
- Si meto una variable que no existe en la consulta, debo ingorarlo.
- PAra la parte de hacer un script para inicialización de la base de datos, puedo lerr un fichero con json con la libreria fs con el método readFile o usar require(sincrono).
  - Creo un fichero initDB.js
  - Creo una carpeta data/ y dentro uno de agentes.json
  - Puedo hacer esto 
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

    Esto ya me sirve y me devuelve un objeto ya cargado, no hace falta usar fs.readFile.