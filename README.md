# Prueba técnica tienda mía

## Descripción

El proyecto consta de dos APIs.

El primero 'tm-provider' simula el sistema del proveedor.

El segundo 'tm-integration' consiste en la solución planteada al problema.

Cada uno de ellos cuenta con un archivo descriptivo README.md


## Despliegue

Cada proyecto cuenta con su archivo de configuración Docker. Además se entrega un archivo 'docker-compose.yml' para desplegar el proyecto completo.

Para desplegar el proyecto usando Docker Compose:

```bash
docker compose up
```

Para ejecutar el proyecto se requiere una conexión a una instancia de MongoDB, por defecto se entrega una instancia de Atlas, preconfigurada en el archivo 'docker-compose.yml', si se requiere usar otra conexión se debe editar el archivo.

### Observación

El conjunto de datos de prueba debe ser generado el mismo día que se realizan las pruebas, debido a que contiene un campo de tipo 'date' que almacena la fecha de entrega del producto y debe ser una fecha futura.
Por esta razón el comando 'node populateProducts.js' se encuentra en el archivo Dockerfile del API de simulación de datos 'tm-provider'.

El despliegue regenera el conjunto de datos de prueba cuando se ejecuta por primera vez, si se hace la revisión posterior al día de entrega de la prueba (Mayo 2 de 2023) se debe reconstruir las imágenes.

```bash
docker compose up --build
```