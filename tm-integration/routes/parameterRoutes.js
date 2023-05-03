
	
const express = require("express");
const router = express.Router();

const parameterController = require('../controllers/parameterController');


/**
 * @openapi
 * /api/parameters:
 *   get:
 *     summary: Ver todos los parámetros
 *     description: Devuelve todos los registros de la colleción parametros
 *     tags:
 *       - Parámetros
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

router.get('/', (req, res) => parameterController.getAllParameters(req, res));

/**
 * @openapi
 * /api/parameters/{key}:
 *   get:
 *     summary: Ver el detalle de un parámetro
 *     description: Devuelve el documento completo de del parametro correspondiente al {key}
 *     tags:
 *       - Parámetros
 *     parameters:
 *       - in: path
 *         name: key
 *         required: true
 *         schema:
 *           type: string
 *         description: El key del documento que se desea consultar
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

router.get('/:key', (req, res) => parameterController.getOneParameter(req, res));


/**
 * @openapi
 * /api/parameters:
 *   post:
 *     summary: Crear un parametro
 *     description: Crea un parametro nuevo
 *     tags:
 *       - Parámetros
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               key:
 *                 type: string
 *                 example: price
 *               value:
 *                 type: string
 *                 example: 1
 *             required:
 *               - key
 *               - value
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

router.post('/', (req, res) => parameterController.createOneParameter(req, res));

/**
 * @openapi
 * /api/parameters/{key}/{value}:
 *   patch:
 *     summary: Edita un parametro
 *     description: Asigna un nuevo valor {value } al parámetro {key}
 *     tags:
 *       - Parámetros
 *     parameters:
 *       - in: path
 *         name: key
 *         required: true
 *         schema:
 *           type: string
 *         description: El key del documento que se desea editar
 *       - in: path
 *         name: value
 *         required: true
 *         schema:
 *           type: string
 *         description: El nuevo valor para asignar
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

router.patch('/:key/:value', (req, res) => parameterController.updateOneParameter(req, res));


/**
 * @openapi
 * /api/parameters/{key}:
 *   delete:
 *     summary: Eliminar un parámetro
 *     description: Elimina el documento completo del parametro correspondiente al {key}
 *     tags:
 *       - Parámetros
 *     parameters:
 *       - in: path
 *         name: key
 *         required: true
 *         schema:
 *           type: string
 *         description: El key del documento que se desea consultar
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

router.delete('/:key', (req, res) => parameterController.deleteOneParameter(req, res));

module.exports = router;

