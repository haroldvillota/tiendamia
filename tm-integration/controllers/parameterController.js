
const ParameterService = require('../services/parameterService');
const LogService = require('../services/logService');

/*
* 	Must access by GET method
*	Execute a query in the collection Parameter
*	filter is Object
* 	limit is an Number
*/

exports.getAllParameters = function(req, res) {

	try{
	
		let options = {
			filter : {},
			limit : ( req.query.limit * 1 ) || 100
		}

		ParameterService.getAllParameters(options)
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
*  Search one Parameter by sku
*/
exports.getOneParameter = function(req, res) {

	try{

		const key = req.params.key;

		if(!key){
			throw { status: 400, message: 'The key is required' };
		}

		ParameterService.getOneParameterByKey(key)
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
*	Create one Parameter
*/

exports.createOneParameter = function(req, res) {	
	
	const { body } = req;

	try{

		if(!body.key){
			throw { status: 400, message: 'The key is required' };
		}
					
		if(!body.value){
			throw { status: 400, message: 'The value is required' };
		}
			
		let payload = {};
			
		if(body.key){
			payload.key = body.key;
		}
				
		if(body.value){
			payload.value = body.value;
		}
		
	ParameterService.createOneParameter(payload)
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
*	Update one Parameter
*/
exports.updateOneParameter = async function(req, res) {

	const { body } = req;

	try{

		const key = req.params.key;
		const value = req.params.value;

		if(!key){
			throw { status: 400, message: 'The key is required' };
		}

		if(!value){
			throw { status: 400, message: 'The value is required' };
		}
		
	ParameterService.updateOneParameter(key, value)
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
*	Delete one Parameter
*/
exports.deleteOneParameter = function(req, res) {

	const { body } = req;

	try {
		const key = req.params.key;

		if(!key){
			throw { status: 400, message: 'The key is required' };
		}
	
	ParameterService.deleteOneParameter(key)
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

