
'use strict';

const { Order } = require('../models');

const service = {

	/*
	*  Obtiene todas las ordenes
	*/
	getAllOrders : function (options) {

		return new Promise((resolve, reject) => {

			let query = Order
				.find(options.filter)
				.limit(options.limit);

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
	*  Obtiene una orden por id
	*/
	getOneOrder : function (id) {

		return new Promise((resolve, reject) => {

			let query = Order
				.findOne({ _id:id });

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
	*  Crea una nueva orden
	*/
	createOneOrder: function (payload) {

		return new Promise((resolve, reject) => {

			let newOrder = new Order(payload);

	  		newOrder.save()
		  		.then(function (createdDocument) {
					resolve(createdDocument);
				})
				.catch(error=>{
					reject(error);
				})

		});


	},


}

module.exports = service;
