# API para integrar la tienda con el API del proveedor

## Funcionamiento

El API persiste la información en una base de Datos de MongoDB usando Mongoose como ODM.

Necesita consumir el API del proveedor para consultar las ofertas para un determinado SKU.

La collección 'parameters' almacena los parámetros utilizados para calcular la mejor oferta.

El valor de cada parámetro consiste en el peso o 'importancia' que le queremos dar a cada parámetro para definir si una oferta es mejor que otra.

Con estos pesos se calcula un puntaje para cada oferta y la que obtenga el mayor puntaje será la seleccionada.

Los parámetros necesarios son:

- total_price: la suma de el precio del producto y el precio del envío
- status: el estado del producto. (new,used,renew)
- seller_score: puntaje del vendedor calculado como el promedio de calificaciones x Cantidad de califiaciones.
- delivery_date: tiempo de entrega en días.
- guarantee: Si tiene garantía.
- can_be_refunded: Si tiene devolución.


Para cada uno de estos parámetros se debe asignar un valor entero que representa el peso que le corresponde.

El peso representa la cantidad máxima de puntos que se asignará a la oferta por cada parámetro.

Pesos configurados por defecto:

- total_price: 10
- status: 10
- seller_score: 8
- delivery_date: 8
- guarantee: 6
- can_be_refunded: 4

En este ejemplo consideramos que el precio y el estado del producto son los factores más importantes para definir la mejor oferta, en segundo lugar el puntaje del vendedor y la fecha de entrega y con mínima importancia la garantia y devoluciones.

En este caso la oferta que se acomode de manera perfecta a este criterio obtendrá 46 puntos que corresponde a la totalidad de los puntos ( 10 + 10 + 8 + 8 + 6 + 4).


El algoritmo aplica el peso a cada factor de manera diferente dependiendo de su naturaleza.

### total_price: 

 Lineal.  El precio total calculado es normalizado en una escala de 0 a 1, donde 1 corresponde al menor precio, luego es multiplicado por el peso asignado y el resultado corresponde a los puntos que se deben asignar. De esta manera la oferta más económica obtiene la totalidad de los puntos, la oferta más cara no obtiene puntos.

###  status:

 Para el caso 'new' multiplica el peso asignado por 1. "Asigna todos los puntos".
 Para el caso 'new' multiplica el peso asignado por 0.5. Asigna la mitad de lo puntos".
 Para el caso 'new' multiplica el peso asignado por 0. "No asigna puntos"

### seller_score:

 Se asignan puntos de manera discreta teniendo en cuenta el comportamiento de los clientes frente a este factor.

 - Cuando el vendedor tiene una calificación de 4 o 5 influye positivamente en su decisión y de manera similar para los dos casos, por lo tanto asigna la totalidad de lo puntos para 5 y 90% de los puntos para 4.

 - Cuando el vendedor tiene una calificación de 3 el factor es irrelevante por lo tanto no se asignan puntos.

 - Cuanto el vendedor tiene una calificación de 1 o 2 influye negativamente en la decición de compra por lo tanto se restan puntos de manera similar para los dos casos, por lo tanto se resta la totalidad de los puntos para el caso de 5 y el 90% para el caso de 4.

Para las ofertas que tienen la misma Calificación del vendedor, la cantidad de calificaciones hacen diferencia por eso se multiplican los dos datos y el factor calculado se normaliza para asignar la totalidad de los puntos al ganador y una menor cantidad a los siguientes.

### delivery_date

Para cada oferta se calcula la cantidad de días que toma la entrega del producto, el valor final se normaliza en una escala de 0 a 1, siendo 1 el menor tiempo de entrega y 0 el tiempo de mayor entrega, luego se multiplica el valor normalizado por el peso.

### guarantee

Entrega los puntos asignados si la oferta tiene garantía, de lo contrario asigna 0.

### can_be_refunded

Entrega los puntos asignados si la oferta tiene devolución, de lo contrario asigna 0.



## Documentación 

Luego de desplegar el proyecto se puede acceder a la documentación del api url http://localhost:10002/api/docs

Los servicios principales son:

**/api/offers/allSkus**

ejemplo:


```bash
curl http://localhost:10002/api/offers/allSkus
```

Devuelve la lista de todos los SKUs disponibles 

**/api/offers/best/{sku}**

Devuelve la mejor oferta para un SKU

ejemplo:

```bash
curl http://localhost:10002/api/offers/best/PR33
```

En la respuesta se incluyen los campos 'score' que muestra el detalle de los puntos asignados por el algoritmo, y total_score que corresponde a la calificación total.

