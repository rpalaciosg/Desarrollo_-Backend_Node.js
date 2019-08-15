# Día 6 

Un buen lugar para tener los middlewares de errores es el app.js

**Validador para saber si son errores del API o de una vista**

- crea unafunción `isAPI(req)` si devuelve true, es que se hizo en el APi.
- Se modifica el middleware de manejo de errores para mostrar errores en json o en html segun el tipo de error.
