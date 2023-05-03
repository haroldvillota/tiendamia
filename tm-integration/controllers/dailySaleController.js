
const DailySaleService = require('../services/dailySaleService');
const LogService = require('../services/logService');

/*
* 	Must access by GET method
*	Execute a query in the collection DailySale
* 	limit is an Number
*/

exports.getAllDailySales = function(req, res) {

	try{
		
		let options = {
			filter : {},
			limit : ( req.query.limit * 1 ) || 100
		}

		DailySaleService.getAllDailySales(options)
		.then(data =>{
			res.json({ status: 'OK', data });
		})
		.catch(error=>{

			LogService.error(error, req);
      		res.status(400).send({ status: "FAILED", message: error?.message || error });
		})

	}catch(error){

		LogService.error(error, req);
      	res.status(500).send({ status: "FAILED", message: error?.message || error });
	}

};

/*
*  Search one DailySale by Date
*/
exports.getOneDailySale = function(req, res) {


	try{

		const date = req.params.date;

		if(!date){
			throw { status: 400, message: 'Date is required' };
		}

		DailySaleService.getOneDailySale( date )
		.then(data =>{
			res.json({ status: 'OK', data });
		})
		.catch(error=>{
			LogService.error(error, req);
      		res.status(400).send({ status: "FAILED", message: error?.message || error });
		})

	}catch(error){

		LogService.error(error, req);
      	res.status(500).send({ status: "FAILED", message: error?.message || error });
	}

};

/*
*  Generate todays report
*/
exports.generateReport = function(req, res) {

	const { body } = req;

	try{

		if(!body.date){
			throw { status: 400, message: 'The date is required' };
		}

		DailySaleService.generateReport( body.date )
		.then(data =>{
			res.json({ status: 'OK', data });
		})
		.catch(error=>{
			LogService.error(error, req);
      		res.status(400).send({ status: "FAILED", message: error?.message || error });
		})

	}catch(error){

		LogService.error(error, req);
      	res.status(500).send({ status: "FAILED", message: error?.message || error });
	}

};
