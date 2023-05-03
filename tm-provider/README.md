# API que simula el proveedor

Este API simula el sistema que entrega el proveedor para consultar las ofertas de cada producto.

La información consiste en una base de datos de prueba que se debe generar el día que se quiere realizar las pruebas, esta base de datos queda almacenada de manera estática en el archivo 'database/offers.json'.

Para generarla se debe usar el script 'populateProducts.js' con el siguiente comando:

```bash
node populateProducts.js
```

El campo 'delivery_date' (Fecha de entrega) consiste una fecha que debe ser posterior al día en que se genera la base de datos, por esta razón si se consulta la información en una fecha posterior a la generada, la fecha de entrega de algunas referencias es suceptible de ser una fecha pasada. Por esta razón el comando para generar la base de datos se encuentra preconfigurado en el archivo Dockerfile.


## Endpoints

### /getAllSkus

Obtiene la lista de todos los SKUs disponibles.

### /getAllOffers

Obtiene la base de datos completa

### getOffersBySku/:sku

Obtiene las ofertas para un SKU específico

