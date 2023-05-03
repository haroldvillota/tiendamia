
	
const express = require("express");
const router = express.Router();

const orderController = require('../controllers/orderController');


/**
 * @openapi
 * /api/orders:
 *   get:
 *     summary: Ver todas las ordenes
 *     description: Devuelve todos los registros de la colleción orders
 *     tags:
 *       - Órdenes
 *     parameters:
 *       - in: query
 *         name: limit
 *         required: false
 *         schema:
 *           type: number
 *         description: El máximo número de registros devuelto por defecto 100
 *     responses:
 *       200:
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: OK
 *                 data:
 *                   type: array 
 *                   items: 
 *                     type: object
 */

router.get('/', (req, res) => orderController.getAllOrders(req, res));

/**
 * @openapi
 * /api/orders/{id}:
 *   get:
 *     summary: Ver el detalle de una orden
 *     description: Devuelve el documento completo de la orden correspondiente al {id}
 *     tags:
 *       - Órdenes
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: El id del documento que se desea consultar
 *     responses:
 *       200:
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: OK
 *                 data:
 *                   type: array 
 *                   items: 
 *                     type: object
 */

router.get('/:id', (req, res) => orderController.getOneOrder(req, res));


/**
 * @openapi
 * /api/orders:
 *   post:
 *     summary: Crear una orden
 *     description: Crea una orden nueva
 *     tags:
 *       - Órdenes
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               sku:
 *                 type: string
 *                 example: PR1
 *               qty:
 *                 type: number
 *                 example: 1
 *               offer_id:
 *                 type: number
 *                 example: 1
 *               customer:
 *                 type: string
 *                 example: Leo Messi
 *             required:
 *               - sku
 *               - qty
 *               - offer_id
 *               - customer
 *     responses:
 *       200:
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: OK
 *                 data:
 *                   type: array 
 *                   items: 
 *                     type: object
 */

router.post('/', (req, res) => orderController.createOneOrder(req, res));

module.exports = router;

