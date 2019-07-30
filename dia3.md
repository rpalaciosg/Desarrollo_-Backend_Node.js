# Día 3 - Backend Node.js

## Events

**EventEmitter** Node nos proporciona una forma de manejar IO en forma eventos.
Es un patrón típico, que se usa mucho y es importante saber como funciona.

Vamos a verlo en un ejemplo que vemos en `ejemplos/eventemitter.js`

Es bastante util, cuando se emitan enventos se los puede acompañar de información
Trabajar con eventos es comodo para porcesar flujos de datos, es decor escribir código muy facil de leer ante procesos de datos.

Mandando a un fichero todo lo que se escriba en la consola.

//patron de suscribirse a eventos.
```js
    process.stdin.on('data', function(data)) {
        file.write(data);
    });
```

## Módulos

Nos referimos en dividir nuestra aplicación en partes.
Los moódulos de Node.js se basan en el estandar CommonJS.

- Los módulos usan `exports` para exportar cosas.
- Quien quiere usar un módulo lo carga con  `require`.
- LA instruccipon `require` en `síncrona`, no hay que poner un callback
- Un módulo es un `singleton`, hay una única instancia de eso en memoria.

**¿module.exports o exports?**

Podemos ver esto en el ejemplo `ejemplos/ejemplo_modulos`

Cualquier objeto de java script hsta que no se haga un export, es un objeto vacío

Los ES Module usan un modificador de línea de comando y están aún en beta.
Se los puede usar pero utilizando el modificador, se suelen usar mas en frontend.

Los módulos se cargan una sola vez, y si quiero tener las provincias en memoria por ejemplo, debo cargar al incio las provincias.

> Se debe seguir el principio KISS que es  Mantenlo simple, estupido.

Usar common.js para módulos antes que ES modules, que suelen ser mas complejos. En los esmodules tengo imports sincronos y asincronos.

en Esmodules:
- modulo sincrono import asds as metodo from './ahdhad';
- modulo asincrono import()

En backend no es muy necesario los import asincronos.

## Express.js

Express nos dá la oportunidad de Estructurar nuestra aplicación.
Espress es un framework web minimalista para Node.js

http://expressjs.com

Node permite estructurar tu aplicación que tu quieras, pero los patrones nos ayudan a que otras personas puedan entender nuestro código. Hay diversos patrones

- El patrón MVC, estructuramos en 3 grupos:
  - Modelo
  - Vista
  - Controlador

- MVVP
- MVVM

En la documentación de express hay 5 cosas para poner vanegarla:
- express(), como libreria como tal
- Application, es la aplicacion que voy hacer
- Request
- Response
- Router: agrupador de rutas

### Web Frameworks

Existen múltiples frameworks web para node.js y surgen nuevos con frecuencia, por ejemplo.

- Express.js
- Koa
- Hapi
- Restify
- ...

### Express generator

No es express, es una herramienta que me ayuda a crear aplicaciones de express.js
Primero instalamos express-generator:
    ```sh
    npm i -g express-generator
    ```

### Ejercicio:

Para crear app express con express-generator:
```sh
express nodeapi --ejs
```

Para arrancarlo para desplegarlo en producción, usamos:
```sh
npm start
```

Para ejecutarlo con información de depuración:
```sh
DEBUG=nodeapi:* npm start
```

Modificamos el package.json y creamos un nuevo comando en el bloque scripts:
```npm
"scripts": {
    "start": "node ./bin/www",
    "dev": "DEBUG=nodeapi:* npm start"
  },
```

Y lo corremos de la siuiente manera:
```sh
npm run dev
```

Luego instalamos solo en el proyecto, no de forma global:
Esto establece las variables de entornos y se encarga de adecuarla al sistema operativo en el que estemos:
Las variables de entorno, se establecen

```sh
npm install cross-env
```

Es una buena practica instalar esta libreria, y nos ayuda a ejecutar el proyecto en cualquier sistema operativo.
> Los modulos deben hacer una sola cosa y hacerla bien.