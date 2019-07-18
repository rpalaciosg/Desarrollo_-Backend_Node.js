# Día 1 - Backend con Node.js

- No se necesitan muchos recursos para asincronía.

## Introducción

### ¿Que es node.js?
- Es un interprete de javascript.
- Inicialmente para correr en servidores, o apps de comunicaciones.
- Trabaja de forma Asíncrona comodamente.

**Orientado a eventos:**
  - el usuario o los programas clientes son quienes deciden el flujo.

**Servidores de aplicaciones** 
- No necesitamos Tomcar, IIS, etc
- Tampoc necesitamos un servidr web como Apache, nginx, etc.
- Nuestra aplicación realiza todas las funciones de un servidor.
- Podemos ayudarnos de otras herramientas para cosas puntuales como :
  - Servir ficheros muy rapido poriamos apoyarnos de Apache o nginx.

**Motor V8**
- Motor javascript creado por Google.

## Versiones.
- Es usuall usar las versiones LTS.

**Limite de memoria**
- Ejecuta el código en un solo hilo.
- Se recomieda dividir el proceso en varios workers si se llega a los límites.
- Los workers estan limitados a 1gb de memoria.

## Ventajas

Node.js tiene grandes ventajas reales en:
- Aplicaciones de red, 
  - como APIs, 
  - servicios en tiempo real, 
  - servidores de comunicaciones, etc.

- Aplicaciones cuyos clientes están hechos en JAvascript, pues compartimos código y estructuras entre el servidor y el cliente.

- Si se hace una funciona se puede usar tanto el frontend como en el Backend
- Mientras mas javascript aprendo sirve para el frontend como para el Backend.

**ECMAScript 2015 (ES6)**
Desde la version 4.0 de Node.js

Una de las principales mejoras incluyen la libreria V8 en la versión v4.5, incluye de forma estable muchas caracterísiticas de ES2015 que harán nuestra vida más fácil.

Block scoping, classes, typed arrays, generators, Promises, symbols, template strings, collections (MAp, Set, etc) y arrow functions.

## Instalando Node.js

- Desde el instalador oficial nodejs.org
- Instalador de paquetes
  - Chhocolatey (windows)
  - homebrew (macos)
  - en linux: apt en Ubuntu, pacman en arch, etc.
- Compilando manualmente
- nvm : gestor de versiones de noje.js como nvm (node version manager), para tener instalada varias versiones de node.js

> npm : node package manager

## Versiona manager de node

**nvm**

nvm list

nvm install <version>

nvm use <version>

nvm use system  en linux

## Un servidor básico
node viene con common.js que es mas faciles.
ESmodules es para el import.

El ejemplo está dentro de `./ejemplos/servidor_basico/index.js`

Es habitual desarrollar en http, pero es mejor si lo hacemos en https

- No es una buena práctica ejecutar node con sudo.
- Sol cuando necesitamos instalar un paquete en forma global usamos sudo.
- Una app de nodejs se ejecuta en memoria y se ejecuta desde la memoria, si quiero hacer un cambio tengo que parar el servidor y volverlo a correr.

> Todo el javascript que escribiremos no se ejecuta en el navegador sino fuera del navegador o en mi pc.

- PAra no estar parando y reiniciando el servidor node podemos instalar la siguiente utilidad nodemon a nivel global:

    ```sh
        npm install -g nodemon
    ```
    Monitoriza los ficheros para no estar reiniciando el servidor

## NPM
- GEstor de paquetes de node.js
- Ayuda a gestionar las dependencias de nuestro proyecto.
- Entre otras cosas nos permite:
  - Instalar librerias o programas de terceros
  - Eliminarlas
  - Mantenerlas actualizadas.

- npm tiene otro comando que se se llama `repo` que nos lleva al repo para ver la documentacion:
 ```sh
    $npm repo chance
 ```

 - PAra crear un archivo `packaje.json` puedo usar npm init.
  ```sh
    $npm init
    #responder las preguntas
  ```

- Para desinstalar se usa `npm uninstall`

> en versiones anteriores de npm si no ponia `--save` no lo ponia en el package.json

## Javascript Avanzado

### Hoisting
Es una cosa que hace el interprete de js a las variables de tipo var.
Puedo declarar variables con `let m = 5`
Hay otra forma legacy que es con var `var zz = 'hola`

```js
var zz = 'hola';
```
hosting -> lleva la delcaración arriba o al principio de su contexto.

```js
var zz;
zz = 'hola';
```
Es una buena practica tener variables inmutables, es decir que no se van a cambiar.
- hay que usar let y cons, para evitar algun problema de hoisting.

Las funciones tambien hacen hoisting;
Undefined sinifica 2 cosas: que no la has definido, o que la has definido y nunca a tenido un valor, o que tu le hayas asignado undefined.

## Controlar errores
2 tipos de errores de javascript:
- Sincronos, por haber hecho algo de forma sincrona.
  - se gestion con una expresión try/ catch
- Asincrona

Se gestionan de forma distinta.

## JSON
Java script Object Notation
- Formato para intercambio de datos.
- Se usa para serializar objetos o estructuras de datos, para enviarlos por red o etc.
- Se hizo famoso por que es comodo de escribir, mas liviano, alternativa a XML. Si

Como convertimos un objeto a json.

```js
var empleado = {
    nombre: 'Thomas Andernos,
    profesion: 'Developer
};

JSON.stringify(empleado);
// devuelve 
'{"nombre":"Thomas Anderson}'
```

Convertir un string con formato json a un objeto, es decir desirializar o inflate:

JSON.parse();

## Modo estricto
PAra cambiar las cosas peores que tenia javascript. No nos permite hacer algunas cosas.
Lo ponemos en la primera línea del fichero o en la primero línea dentro de una función.

'use strict';

Algunos beneficios:
- Declarar las variables.
- En las funciones que no son étodos `this` es undefined.

## Funciones
- Son objetos.
- Por tanto tambien tiene propiedades y métodos.
- Todo en js menos los tipos primitivos son objetos, como el tipo number, booleam, null, undefined.

### funciones - declaracion
function suma (n1 )

### funcion como expresion
A la derecha de un igual.
No necesita tener un nombre
var suma = function(n1, n2) {

}

### Métodos
Puedo crear funciones dentro de un método como propiedad.
Una funcion que está declarada como funcion dentro de un objeto

### Funciones - instancias
Se usa new.
var limon = new Fruta();
limon.setNombre("Citrus limon");

## Callbacks

Es como dar mas instrucciones. Ejm: Da instrucciones a un hijo
- Ve a comprar el pan.
- Le doy 1$ para que compre el pan.
- El va y regresa y me entrega el pan.
- Quiero que despues de comprar pan,  y  cuando termines te vas a cortar el pelo.
  - el `y cuando termines` es un callback.
- Mientras espero, yo hago otras cosas, no me quedo congelado esperando a que traiga el pan.
- Cuando el vuelva, me da un toque en el hombro y me dá el pan, ahí está ejecutando el `callback`.

```js
console.log('empiezo');

setTimeout(function() {
    console.log('he terminado');
}, 2000);
```

La funcion que pasamos a setTimeout es lo que llamamos el callback.

Mientras pasan los 2 segundo, no deja bloqueado el programa, sino que aprovecha para hacer otra cosa.

Los `callbacks` se suelen usar para tareas con procesamiento pesado.
Me dan asincronía.
Lo usamos en operaciones entrada salida, como leer y escribir en disco, o pasar archivos por la red.

```js
function suma(n1, n2, callBack){
    var resultado = n1 + n2;
    callBack(resultado);
}
suma(1, 5, function(res){ console.log(res);})
```

PAsamos una función como tercer parámetro.
Le decimos: "cuando termines haz esto"

LAs operaciones de entrada salida en node.js son asincrona

**Ejercicio haciendo una función asincrona**
Hacer una función que escribe un texto en la consola tras dos segundos.

### HAciendo un bucle asincrono en paralelo
ver el código en `ejemplos/asincrono_paralelo.js`