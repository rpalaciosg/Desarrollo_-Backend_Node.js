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