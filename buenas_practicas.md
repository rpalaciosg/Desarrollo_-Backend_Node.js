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

- Mientras menos codigos se ponga en las vistas mejor, poenr todo el htmls o el css que se quiera, pero el codigo ejs que sea el minimo posible.

- En las promesas js, en el constrtuctor `new Promise` los nombres de los atributos de la funcion por convencion deben ser `resolve` y `reject` para facilidad cuando otras personas lean el codigo.

- Normalmente en errores asincronos como por ejemplo en promesas, es mas adecuado devolver el error a la funcion superior que me llama para que esta lo gestione. En caso de tener un error sincrono dentro de mi promesa puedo hacer un try y .catch para  controlar el error y en el .catch enviar el `reject(err)` para que la funcion que llama a mi promesa lo gestione. 

- Las funciones superiores son las que orquestan y saben que hacer en caso de un error. Como por ejemp. 
  - escribirlo en el log, 
  - escalarlo a una funcion que maneje errores y los analiza o enviar un email.


- Tratar de no mezclar callbacks con promesas dentro del mismo modulo o aplicacion, si se trabaja con callbacks solo con callbacks, si se trabaja con promesas solo promesas, no hay que mezclarlo.

- Si lo escribo y lo busco en el código de una aplicación, entonces debo crear un índice por los campos a buscar.
- Crear un indice por los campos que suelo buscar.
- Cada vez que escriba en mi app, código que filtre una coleccion por algún criterio, **debo crear un índice**. - Ya que en producción pueden haber miles o millones de registros en una colección.
- Mejor hacer indices cuando los necesite, no hacer de todos los campos porque ocupan espacio en disco.

- Poner en practica el principio `YAGNI` que son las siglas de (no vas a necesitarlo). Como por ejemplo guardar cosas por si acaso las vas a necesitar. O crear cosas por si acaso las vayas a necesitar en el futuro. "Si lo necesitas yá, crealo, sino nó lo crees."

- No añadir complejidad innecesaria a las cosas, porque sino despues vas a tener que mantenerlo.

- Al crear o desarrollar un API se debe versionar desde el principio usando un Versionador como GIT, esto se lo podria hacer creando ramas para las diferentes versiones del API.

- Documentar mientras se va desarrollando es una practica muy sana. Segun vaya metiendo o creando cosas, meterlas en el readme

- Es bueno intentar crear modulos, o controladores para reusar el código.
  
- No rayarse e intentar desacoplar todo el código para no reusar, si es que el reusar me causa mucha complejidad debo repetir código sin problema. Si es que debo duplicar código para evitar la complejidad ps lo puedo duplicar. Es una balanza con tal de dejar el código lo mas mantenible posible.

## Malas practicas

- Seria una mala practica si en un middleware que atiende a una peticion GET, cambia el estado. Se refierea cambiar algo, x ejm. Crear un registro en la base de datos.

- Validar que en la URL con querystring un campo se valide o se pida solo en minusculas no es recomendable porque estaria poniendo problemas. Porque debería dar igual si es mayusculas o minusculas.

- Hacer indices de todos los campos.