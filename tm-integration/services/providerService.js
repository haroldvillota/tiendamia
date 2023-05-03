'use strict';

const API_PROVIDER_URL = process.env.API_PROVIDER_URL;

const service = {

	/*
	*  Consume el API del proveedor para obtener las ofertas para un sku
	*/

	fetchOffersBySku:  function (sku) {


		return new Promise((resolve, reject) => {

			if(!API_PROVIDER_URL){
				reject({ status:500, message: 'The provider URL is wrong' });
			}

			fetch( API_PROVIDER_URL + '/getOffersBySku/' + sku )
				.then(res => res.json())
				.then(data => resolve(data.offers))
				.catch(error => reject(error))

		});

	},

	/*
	*  Consume el API del proveedor para obtener la lista de todos los sku
	*/

	getAllSkus:  function () {


		return new Promise((resolve, reject) => {

			if(!API_PROVIDER_URL){
				reject({ status:500, message: 'The provider URL is wrong' });
			}

			fetch( API_PROVIDER_URL + '/getAllSkus' )
				.then(res => res.json())
				.then(data => resolve(data))
				.catch(error => reject(error))

		});

	}


}

module.exports = service;
