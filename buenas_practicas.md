# Buenas practicas

- Las optimizaciones dejaralas para el final. Cuando escriba codigo hacerlo pensando en hacer lo que tiene que hacer, aunque sea lento o feo con tal que haga lo que tiene que hacer, Por que si al escribir coidgo estoy pensando ya en optimizar se puede caer en la optimizacion prematura. Esto puede ser causa de muerte de proyectos.

- Es una buena practica instalar esta libreria 'cross-env', y nos ayuda a establecervariables de entorno en cualquier sitema operativo y  ejecutar el proyecto en cualquier sistema operativo. Es decir adecua al sistema operativo en el que estemos.
  
- Los modulos deben hacer una sola cosa y hacerla muy bien. Este modulo es bueno? HAce una sola cosa? si? lo hace bien? si? entonces es bueno!! Es la filosofia de linux.

- Cada vez que hago un commit, reviso todos los cambios que estoy metiendo en el repo. Fichero por fichero, cambio por cambio que voy a meter.

- Las variables que se usan una sola vez, dan que pensar de si en realidad se necesitan esas variables.
- CRear aplicaciones que por diseno esten dentro de la ley.
- Responder 2 veces esta prohibido en el protocolo http. Ya que establece que ante una peticion solo puede haber una respuesta.

- En el app.js de express tener lo menos posible y es mejor subdividirlo en modulos.

- Agrupar middlewares en routers.

- Normalmente el orden para importar o hacer require de los modulos al inicio de un programa no afecta el funcionamiento del programa normalmente, pero se suelen poner o se recomienda en este orden por convencion para tener un código mas mantenible:
    1. Primero los modulos internos del código de Node.js como `http`, etc. 
    2. Después los modulos externos o de terceros como `express`, etc. y 
    3. Después `mis modulos` internos, osea los que yo he hecho.

- Es una buena práctica programar todo en ingles, nombres de variables, documentación. etc

- Al hacer un API y validaciones de los parámetros Invertir el tiempo necesario para devolver los códigos de estado http correctos o acordes.

## Malas practicas

- Seria una mala practica si en un middleware que atiende a una peticion GET, cambia el estado. Se refierea cambiar algo, x ejm. Crear un registro en la base de datos.

- Validar que en la URL con querystring un campo se valide o se pida solo en minusculas no es recomendable porque estaria poniendo problemas. Porque debería dar igual si es mayusculas o minusculas.