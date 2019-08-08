# Día 5

- Hay una libreria de promisefy para convertir un callback a una promesa.
- Hay otra libreria que se llama bluebird convert promise, que convierte a promesas. Incluso tiene un método que convierte todo los métodos a promesas.

El día de ayer se vio Bases de Datos MySql

## Bases de datos - SQL ORMs
ORM (Object Relational Maping) se encarga principlamente de:

- Convertir objetos en consultas SQL para que puedan ser persistidos en una base de datos relacional.
- Traducir los resultados de una consulta SQL y generar objetos.

Esto nos resultará util si el diseño de nuestra aplicación es orientado a objetos (OOP).

Si nosotros queremos guardar cosas en ficheros, deberiamos crearnos un indice. Como el índice de un diccionario.
Esta misma técnica más evolucionada es la mayor ventaja de una base de datos, la velocidad con la que puedo encontrar algo igual si tuviera 500 datos a tener 5 millones de datos.
Por eso se recomienda usar motores de bases de datos.

Además los ORMs nos da la ventaja de persistir esos datos. Es decir se pasa un objeto y el se encarga de tomar las propiedades del objeto.

Un ORM no es muy eficiente cuando tiene que hacer muchas operaciones, ya que el hecho de que tiene que convertir cosas y comprobarla, tiene una penalizacion en rendimiento. Ejm: Se tiene un fichero con 1 millon de pedidos y quieres cargarlo en la tabla de bases de datos de pedidos, aqui un ORM no aportará mucho y demorará mucho, en este caso es mejor crear las insert en el código.

Un ORM muy usado para bases de datos SQL es sequelize:
http://docs.sequlizejs.com/en/latest/

Sequelize tiene soporte para MySql, MAriaDB, SQLite, PostgreSQL y MSSQL.

Otras buenas alternativas son:
- Knex
- Bookshelf
- `TypeORM`, trabaja con typeScript en el framewor `nestjs` (sera bueno si es que el proyecto se usa con typescript)

> Para cosas masivas utilzo el drive y consultas directas.

