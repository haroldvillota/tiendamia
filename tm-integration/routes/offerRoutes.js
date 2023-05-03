const express = require("express");
const router = express.Router();

const offersController = require('../controllers/offersController');


/**
 * @openapi
 * /api/offers/best/{sku}:
 *   get:
 *     summary: Ver la mejor oferta
 *     description: Devuelve la mejor oferta calculada para un determinado SKU, según los parámetros asignados previamente en el sistema
 *     tags:
 *       - Ofertas
 *     parameters:
 *       - in: path
 *         name: sku
 *         required: true
 *         schema:
 *           type: string
 *         description: El sku del producto
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

router.get('/best/:sku', (req, res) => offersController.getBestOfferBySku(req, res));

/**
 * @openapi
 * /api/offers/allSkus:
 *   get:
 *     summary: Ver la lista de SKUs disponibles
 *     description: Devuelve la lista de todos los SKU disponibles en el API del proveedor
 *     tags:
 *       - Ofertas
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

router.get('/allSkus', (req, res) => offersController.getAllSkus(req, res));



module.exports = router;

