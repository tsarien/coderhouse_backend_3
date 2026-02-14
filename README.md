# ![Programación Backend III: Testing y Escalabilidad Backend](https://img.shields.io/badge/CURSO%3A-%20PROGRAMACION%20BACKEND%20III-red?style=plastic&logo=codementor)

## Coderhouse - Comision 96765

### Tecnologías utilizadas

![JavaScript](https://img.shields.io/badge/JavaScript-323330?style=for-the-badge&logo=javascript&logoColor=F7DF1E)
![Node.js](https://img.shields.io/badge/Node%20js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)
![Express](https://img.shields.io/badge/Express%20js-000000?style=for-the-badge&logo=express&logoColor=white)
![Postman](https://img.shields.io/badge/Postman-FF6C37?style=for-the-badge&logo=Postman&logoColor=white)
![MongoDB](https://img.shields.io/badge/MongoDB-4EA94B?style=for-the-badge&logo=mongodb&logoColor=white)
![JWT](https://img.shields.io/badge/JWT-000000?style=for-the-badge&logo=JSON%20web%20tokens&logoColor=white)

---

## Entrega #1 (14-02-2026)

### Se debe entregar

Crear un router llamado mocks.router.js que funcione bajo la ruta base /api/mocks.

Mover el endpoint “/mockingpets” (Desarrollado en el primer Desafío Entregable) dentro de este router.

Crear un módulo de Mocking para generar usuarios de acuerdo a un parámetro numérico. Dichos usuarios generados deberán tener las siguientes características:

- En “password” debe tener la contraseña `coder123` encriptada.

- “role” puede variar entre `user` y `admin`.

- “pets” debe ir como array vacío.

- Dentro del router `mocks.router.js`, utilizar este módulo en un endpoint GET llamado `/mockingusers`, y generar 50 usuarios con el mismo formato que entregaría una petición de Mongo.

- Dentro del router `mocks.router.js`, desarrollar un endpoint POST llamado `/generateData` que reciba los parámetros numéricos `users` y `pets` para generar e insertar en la base de datos la cantidad de registros indicados.

- Comprobar dichos registros insertados mediante los servicios GET de users y pets

## Criterios

### Creación del Router Mocks y Migración de Endpoints:

- Se crea el router `mocks.router.js` bajo la ruta base `/api/mocks` y se migra con éxito el endpoint `/mockingpets` al nuevo router.

- El router `mocks.router.js` se crea correctamente.

- El endpoint `/mockingpets` se mueve al nuevo router sin errores en su funcionalidad.

### Desarrollo del Módulo de Mocking para Generación de Usuarios:

- Se desarrolla un módulo de Mocking que genera usuarios según un parámetro numérico con las características especificadas.

- Se genera correctamente un número específico de usuarios con contraseñas encriptadas, roles variados y arrays de pets vacíos.

- Los usuarios generados cumplen con el formato esperado de una petición de Mongo.

### Implementación de Endpoint GET para Generación de Usuarios:

- Se implementa un endpoint GET `/mockingusers` en el router `mocks.router.js` para generar usuarios según un parámetro numérico.

- El endpoint GET `/mockingusers` utiliza el módulo de Mocking para generar y devolver la cantidad específica de usuarios solicitados.

- Los usuarios generados siguen el formato esperado y son devueltos correctamente por el endpoint.

### Desarrollo del Endpoint POST para Generar e Insertar Datos en la Base de Datos:

- Se desarrolla un endpoint POST `/generateData` en el router mocks.router.js para generar e insertar registros en la base de datos según parámetros numéricos.

- El endpoint POST `/generateData` recibe correctamente los parámetros users y pets, genera la cantidad de registros indicada y los inserta en la base de datos.

- Se comprueba la inserción de registros mediante los servicios GET de users y pets, asegurando que los registros generados estén disponibles y sean accesibles.
