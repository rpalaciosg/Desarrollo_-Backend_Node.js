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