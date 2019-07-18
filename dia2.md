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