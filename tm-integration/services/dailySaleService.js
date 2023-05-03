
'use strict';

const { DailySale } = require('../models');
const { Order } = require('../models');

const service = {

	/*
	*  Obtiene todos los registros
	*/
	getAllDailySales : function (options) {

		return new Promise((resolve, reject) => {

			let query = DailySale
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
	*  Devuelve el registro correspondiente para 'date'
	*/

	getOneDailySale : function (date) {

		return new Promise((resolve, reject) => {

			let query = DailySale
				.findOne({ date });

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
	*  Genera un nuevo registro para el dia actual
	*/
	generateReport: function (date) {

		return new Promise((resolve, reject) => {

			console.log(date)
			let dateObj = new Date(date);

			let initDate = new Date(dateObj.toISOString().split('T')[0]);

			let endDate = new Date(dateObj.toISOString().split('T')[0]);
			endDate.setDate(endDate.getDate()+1);

			let filter = {
				createdAt: { 
					$gte: initDate,
					$lte: endDate
				} 

			};

			let query = Order
				.find( filter )

			query.exec(function(err, data) {

			    if (err) {
					reject(err);
			    }else{

			    	let totals = {}

			    	for(let order of data){
			    		
			    		let sku = order.sku;
			    		if(!totals.hasOwnProperty(sku)){
			    			totals[sku] = 0;
			    		}
			    		totals[sku] += order.qty;

			    	}

			    	let inserts = [];

			    	for(let sku in totals){

			    		let total = totals[sku];

			    		let payload = {
			    			date: date,
			    			sku: sku,
			    			qty: total

			    		}

			    		inserts.push(payload);
			    		
			    		console.log(payload);
			    	}

			    	let newDailySale = DailySale.insertMany(inserts)
			    	.then(function (createdDocuments) {
						resolve(createdDocuments);
					})
					.catch(error=>{
						reject(error);
					})

			    	
			    }

	  		});

		});


	},



}

module.exports = service;
