# Buenas practicas

- Las optimizaciones dejaralas para el final. Cuando escriba codigo hacerlo pensando en hacer lo que tiene que hacer, aunque sea lento o feo con tal que haga lo que tiene que hacer, Por que si al escribir coidgo estoy pensando ya en optimizar se puede caer en la optimizacion prematura. Esto puede ser causa de muerte de proyectos.

- Es una buena practica instalar esta libreria 'cross-env', y nos ayuda a establecervariables de entorno en cualquier sitema operativo y  ejecutar el proyecto en cualquier sistema operativo. Es decir adecua al sistema operativo en el que estemos.
  
- Los modulos deben hacer una sola cosa y hacerla muy bien. Este modulo es bueno? HAce una sola cosa? si? lo hace bien? si? entonces es bueno!! Es la filosofia de linux.

- Cada vez que hago un commit, reviso todos los cambios que estoy metiendo en el repo. Fichero por fichero, cambio por cambio que voy a meter.

- Las variables que se usan una sola vez, dan que pensar de si en realidad se necesitan esas variables.
- CRear aplicaciones que por diseno esten dentro de la ley.

## Malas practicas

- Seria una mala practica si en un middleware que atiende a una peticion GET, cambia el estado. Se refierea cambiar algo, x ejm. Crear un registro en la base de datos.