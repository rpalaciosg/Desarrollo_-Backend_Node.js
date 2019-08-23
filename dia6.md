# Día 6 

Un buen lugar para tener los middlewares de errores es el app.js

**Validador para saber si son errores del API o de una vista**

- crea unafunción `isAPI(req)` si devuelve true, es que se hizo en el APi.
- Se modifica el middleware de manejo de errores para mostrar errores en json o en html segun el tipo de error.

**Otro método del API**
Vamos a crear un método que devuelva un solo agente.

> Nota: Algo que ayuda mucho a los desarrolladores que consumen el APi que diseñe, es de ponerle un nombre unificado para todas las respuestas, es decir si devuelvo un solo objeto poner `result` al nombre del objeto que retorna en el json, en caso de ser varios objetos, o un vector de objetos puedo poner en plural `results`.

Es muy habitual mostrar un count de cuantos registros me devuelve la solicitud.

*Documentación:* Es habitual que mientras se va agregando funcionalidad se debe ir documentando, o usar alguna herramienta que lee los comentarios arriba de cada método del endpoint. Me puedo basar en la documentacion de SWAPI.

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