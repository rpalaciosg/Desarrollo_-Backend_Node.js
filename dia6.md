# Día 6 
Cuando quiero crear o retornar una promesa, debo usar:
```js
return new Promise ((resolve, reject) => { 
  resolve('algo');
});
```

- 'Await' consume la promesa, que resulve la expresiòn que tiene a la derecha. exec() devuelve una promesa.
- Puedo usar el return new Promise o poner async a la funciòn, La funcion que tiene async tiene un return de algo, ese algo se envuelve en la promesa.

## Resusar código con contraoladores.
- Cuando tengo que reusar código, un buen sitio para tener ese código es en un módulo, o bien en un modelo. Lo importante es tenerlo en un sitio en común y tenerlo para las cosas que se necesitan. Tenerlo en el modelo es que lo vamos a poder reutilizar.

Un buen lugar para tener los middlewares de errores es el app.js

## Error Handler - Validador para saber si los errores son generados por la vista o por el API
**Validador para saber si son errores del API o de una vista**

- crea unafunción `isAPI(req)` si devuelve true, es que se hizo en el APi.
- Se modifica el middleware de manejo de errores para mostrar errores en json o en html segun el tipo de error.

## Limitar resultados de un método del API
Vamos a crear un método que devuelva un solo agente.

> Nota: Algo que ayuda mucho a los desarrolladores que consumen el APi que diseñe, es de ponerle un nombre unificado para todas las respuestas, es decir si devuelvo un solo objeto poner `result` al nombre del objeto que retorna en el json, en caso de ser varios objetos, o un vector de objetos puedo poner en plural `results`.

Es muy habitual mostrar un count de cuantos registros me devuelve la solicitud.

*Documentación:* Es habitual que mientras se va agregando funcionalidad se debe ir documentando, o usar alguna herramienta que lee los comentarios arriba de cada método del endpoint. Me puedo basar en la documentacion de SWAPI.

Recordar: Todos los valores que se obtenga de una peticion cuand pasan datos, ya sea del re.query, del req.params o del req.body, como hicimos para recibir informaciòn desde afuera. Siempre son strings, siempre me van a devolver strings, porque el protocolo http trabaja con strings y despues nosotros tendremos que convertir eso a lo que queramos.

## Mongoose: Métodos de instancia o estáticos a un modelo.

Para probar esto primero vamos a cambiar el query limits del método del middleware de agentes al modelo Agentes, como un método de clase o estático.

Hay que recordar que al hacer o agregar métodos de instancia en el eschema, no debo usar `arrowFunctions` o `=>` porque después no va a funcionar, ya que mongoose pone un `this` implícito dentro del método.

- Hemos hecho los filtros de un API GET/
- Método de creación de agentes. POST/
- Método de actualización de un agente PUT/
    - Cuando se vaya a modificar un dato debemos usar `findOneAndUpdate` para que nos devuelva el objeto guardado, en consola nos saldrá un warning, para que no salga eso debemos poner mongoose.set('useFindAndModify', false);

- Método para eliminar un agente.

Notas Buenas práctiacas: Establecer un formato de errores estandar. Se empieza por la documentación
    - Standard Error Format: 

- cuando hablamos de `resources`, en nuestro caso hablamos del recurso de agentes.js

- Hay API's como la de SWAPI (la e stars war) que detecta si se le hace una petición desde navegador o browser y en vez de devolverme json me devuelve una página. PEro si la misma peticion la pongo en un postman, esta me devuelve json.
- Esto como lo hace si la URL es la misma? Pues esto lo hace o lo detecta por las cabeceras o Headers. El browser le dice en el request header, accept: text/html, y el servidor en vez de determinar que es una llamada de API por la URL lo ha determinado por la cabecera o header `accept` y devuelve una página. 

- Hay una tecnología nueva que se llama GraphQL, la cual pasandole una especificacion en forma de json al hacer el request, de una sola request podemos pedir muchas cosas.

## Consumir APIs de terceros

Por ejemplo hacer una llamada al APi de facebook, o de google para hacer una georeferenciación inversa.

Uno de los módulos más usados para esto es `request`, funciona con callbacks.

`https://github.com/request/request`

```shell
npm install request --save
```

Hay una variante que se llama `request-promise` la cual usa promesas.
-> Tambien hay otra variante que es Axios, por que se puede usar tanto en frontend como en backend, soporta promesas
Pero tambien hay un comando en javascript `fetch`, en frondtend se puede usar bastante bien.

**Ejemplo de peticiona un API usando AXIOS**

El ejemplo se enceuntra en `ejemplos/ejemplo_request_axios`

- Para instalar primero hacemos dentro de la carpeta `ejemplos/ejemplo_request_axios` en consola:
  - Crear un package.json
  ```shell
    npm init -y 
  ```

  - Instalamos axios
  ```shell
    npm install axios
  ```
- Creamos un fichero index.js