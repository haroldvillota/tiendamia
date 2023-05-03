
const express = require("express");
const router = express.Router();

const offersController = require('../controllers/offersController');

/*
*   Offers Routes
*/

router.get('/getAllSkus', (req, res) => offersController.getAllSkus(req, res));
router.get('/getAllOffers', (req, res) => offersController.getAllOffers(req, res));
router.get('/getOffersBySku/:sku', (req, res) => offersController.getOffersBySku(req, res));

module.exports = router;

