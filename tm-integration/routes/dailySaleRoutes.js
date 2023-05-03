
	
const express = require("express");
const router = express.Router();

const dailySaleController = require('../controllers/dailySaleController');

/**
 * @openapi
 * /api/dailySales:
 *   get:
 *     summary: Ver las ventas diarias
 *     description: Devuelve todos los registros de ventas diarias
 *     tags:
 *       - Ventas Diarias
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

router.get('/', (req, res) => dailySaleController.getAllDailySales(req, res));

/**
 * @openapi
 * /api/dailySales/{date}:
 *   get:
 *     summary: Ver las ventas para una fecha
 *     description: Devuelve las ventas totales por sku para la fecha indicada en 'date'
 *     tags:
 *       - Ventas Diarias
 *     parameters:
 *       - in: path
 *         name: date
 *         required: true
 *         schema:
 *           type: string
 *         description: La fecha del reporte solicitado AAAA-MM-DD
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

router.get('/:date', (req, res) => dailySaleController.getOneDailySale(req, res));

/**
 * @openapi
 * /api/dailySales:
 *   post:
 *     summary: Crea reportes
 *     description: Genera los registros que totalizan las ventas de cada SKU para la fecha indicada en 'date'
 *     tags:
 *       - Ventas Diarias
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               date:
 *                 type: string
 *             required:
 *               - date
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

router.post('/', (req, res) => dailySaleController.generateReport(req, res));

module.exports = router;

