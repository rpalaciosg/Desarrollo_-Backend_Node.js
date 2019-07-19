# dia 2

## HAciendo un bucle asincrono en serie

ver código en `ejemplos/asincrono_serie.js`;

Hace bastantes años alguien tuvo la misma inquietud y creo una libreria `async`.

### Async library
> Recordar que para buscar el repo de una libreria desde npm usando la línea de comandos usamos:
> `npm repo *nombre_libreria*`
> ``` npm repo async```

Tiene muchos métodos potentes ya hechos

### Procesar un array de forma asíncrona en serie

Se puede ver el código en `ejemplos/asincrono_serie_array.js`

## Que son Truthy y Falsy

En javascript todo tiene un valor booleano, generalmente conocido como trythy y falsy.

### Como se produce

```js
var variable = "value";
if(variable) {
    console.log("Soy truthy");
}

variable = 0;
if(variable) {
    console.log("..");
} else {
    console.log("Soy falsy");
}
```

Las variables en js no tienen tipo sino el valor es lo que tiene tipo es decir los datos son los que tienen tipos.

Hay una regla de oro, que js toma valores como falso a:
- false
- 0 (cero)
- " " (cadena vacía)
- null
- undefined
- NaN (valor especial de tipo Number que significa Not-a-Number!)

Todos los demás valores son truthy, icluyendo "0" (cero entre comillas), "false" (false entre comillas), empty function, empty arrays, y empty objects.

Las funciona son objetos, aunque no tena nada dentro si existe evalua verdadero, cuando se tratata con objetos tratamos con punteros a objetos. Un objeto vacío tambien evalua verdadero.

### Comparando Falsys
Los valores false, 0 y "" son equivalentes:
```js
var c = ()
```

### La cosa se complica 

### Truthy  and Falsy : Solución
Comparaciones estrictas
Usamos el igual estricto (===) y el distinto estricto (!==)
Se comparan primero por su tipo y luego por su valor.

>> Lo primero es hacer que la aplicación funcione y funcione bien.
>>> Luego viene las optimizaciones del código.

## this

- this aveces es `undefined` y aveces nó.
- this apunta a una funcion que construye un objeto, apunta al objeto que se esta construyendo o el que va a devolver.
- Hace referencia al objeto propietario del método que estamos ejecutando.

**Ejemplo de this**

Podemos ver el ejemplo en `ejemplos\this.js`.

### Como forzar para que un método no pierda el this

Es usar bind

```js
const otraVariable = todoterreno.cuantasRuedas.bind(todoterreno);
```

> Cuando queramos pasar el `método` de un `OBJETO` como `callback` debemos usar el bind obligatoriamente para no perder el this.

### Otras formas de asignarle this a una función

Bind, devuelve otra función nueva con el this pegado.
En cambio call y apply ejecutan la función con un this distinto.

```js
persona.iniciales.call(programa, 2, true);

persona.inciales.apply(programa, [2, false]);
```
> Esto nos servirá luego para hacer herencia en javascript, esto es como que le pide prestado a un constructor para ejecutar los métodos sobre sus hijos.

### this -uso en constructores de objetos

## Closures

- Las variables en js su contexto/scope es la funcion donde son creadas.
- No puede perder el this porque no utiliza this.
- Siempre va a tener acceso al cotexto de donde fue creado a sus contextos superiores.
- Jamas pierden el contexto
- No lo llamariamos con new sino, como tiene un return solo lo ejecutamos.
- funcion/constructor/objeto que retorna algo (funcion, objeto, array)

Ejemplo:

```js
function creaClosure(valor) {
    return function() {
        return valor;
    }
}
```
No perderia la relacion la funcion retornada con la funcion `creaClosure`

> Recordar, buena practica todos los metodos, y nombres de lo que se cree en ingles igualmente los comentarios


## Prototipos

Que es esto de los prototipos o prototype.
Vamos a llegar a la herencia, programacion orientada aobjetos.
    - La herencia es una caracteristicas que inos objetos de aprovechen de las funcionalidades,  métodos o propiedades de otros objetos.

Javascript es un lenguaje multiparadigma donde podemos usar varios paradigamas o formas de programación.
En la orientación a objetos que se puede usar en javascript es mas potente que las que se puede hacer en otros lenguajes, que se puede decir tiene un POO mas fuerte o freceunte.
Podemos hacer POO de formas inimaginables.
Un gran poder conlleva una gran responsabilidad.-
Tenemos que hacer respetuosos con las personas que van a ver mi código en el futuro.

**Que son los prototipos y porque los asociamos con la herencia**

Casi todo en js es un objeto. Cada objeto tiene una propiedad interna llamada `prototype` que apunta a otro objeto.

Su objeto prototipo tiene a su vez una propiedad `prototype` que apunta a otro objeto, y así sucesivamente.
A esto se llama cadena de prototipos.

Si sigues la cadena en algún momento llegarás al Objeto Object, cuyo prototipo es null.

**Que beneficios nos da esto**

Cuando cojemos un objeto hijo, y usar una funcionalidad de ese objeto.
Nos permite hacer cosas muy rápidas, que en otros lenguajes no podemos hacer.

*Por ejemplo:*

Podemos ver el ejemplo en `ejemplos\prototipos.js`

> Se recomienda leer este libro `Yo don´t know JS` https://github.com/getify/You-Dont-Know-JS para aprender mas afondo sobre estos temas.

>> Hay una tecnica que se lama `Monkey patching` reabriendo clases existentes y modificando sus métodos, NO SE RECOMIENDA!! porque trae mas desventajas que ventajas

```js
//mokey pactching
Object.prototype.despidete = function (){...}

const chance = require('chance');

```