
'use strict';

const { Parameter } = require('../models');

const service = {

	/*
	*  Obtiene todos los parametros
	*/
	getAllParameters : function (options) {

		return new Promise((resolve, reject) => {

			let query = Parameter
				.find(options.filter)
				.limit(options.limit);

			query.exec(function(err, data) {

			    if (err) {
					reject(err);
			    }else{

			    	let parameters = {};
			    	for(let parameter of data){
			    		//parameters.push({ key:parameter.key, value:parameter.value });
			    		parameters[parameter.key] = parameter.value;
			    	};

			    	resolve(parameters);
			    }

	  		});

		});
		
	},

	/*
	*  obtine un parámetro por 'key'
	*/
	getOneParameterByKey : function (key) {

		return new Promise((resolve, reject) => {

			let query = Parameter
				.findOne({ key:key });

			query.exec(function(err, data) {

			    if (err) {
					reject(err);
			    }else{
			    	resolve(data)
			    }

	  		});

		});
		
	},

	/*
	*  Crea un nuevo parámetro
	*/
	createOneParameter: function (payload) {

		return new Promise((resolve, reject) => {

			let newParameter = new Parameter(payload);

	  		newParameter.save()
		  		.then(function (createdDocument) {
					resolve(createdDocument);
				})
				.catch(error=>{
					reject(error);
				})

		});


	},

	/*
	*  Actualiza un parámetro
	*/
	updateOneParameter:  function (key, value) {

		return new Promise((resolve, reject) => {

			Parameter.findOneAndUpdate({ key:key }, { value:value }, { new: true })
			.then(document =>{
				resolve(document);
			})
			.catch(error=>{
				reject(error);
			})

		});

	},

	/*
	*  Elimina un parámetro
	*/
	deleteOneParameter:  function (key) {

		return new Promise((resolve, reject) => {

			Parameter.findOneAndDelete({ key:key })
			.then(document =>{
				resolve(document);
			})
			.catch(error=>{
				reject(error);
			})

		});

	}


}

module.exports = service;
