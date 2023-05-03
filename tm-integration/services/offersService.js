'use strict';

const defaultWeights = {
		
	total_price: 10,
	status: 10,
	seller_score: 8,
	delivery_date: 8,
	guarantee: 6,
	can_be_refunded: 4
	
}

const service = {

	/*
	*  Encuentra la mejor oferta
	*/

	getBestOffer:  function (offers, parameters) {

		if(offers.length === 0){
			return null;
		}

		if(offers.length === 1){
			return offers[0];
		}

		this.normalizeTotalPrice(offers);
		this.normalizeDeliveryDate(offers);
		this.calculateTotalSellerScore(offers);

		//Normaliza los seller score positios
		this.normalizePositiveSellerScore(offers);

		//Normaliza los seller score negativos
		this.normalizeNegativeSellerScore(offers);

		//Asigna 0 a los seller score sin relevancia 0 y 3
		offers.forEach(offer => {
			if([0,3].includes(offer.seller.qualification)){
				offer.normalized_seller_score = 0;	
			}
		})

		this.calculateOfferScore(offers, parameters);

		//Ordena las ofertas segun los puntos calculados

		offers.sort((a, b) => {
			return b.total_score - a.total_score
		});

		//console.log(offers);
		//limpia los campos usados para el cálculo
		offers.forEach(offer => {
			delete offer.normalized_total_price;
			delete offer.days_delivery_delay;
			delete offer.normalized_delivery_date;
			delete offer.total_seller_score;
			delete offer.normalized_seller_score;
			//delete offer.score;
			//delete offer.total_score;
		})

		//retorna la primera en la lista que cuente con stock
		const theBest = offers.find(offer => {
			return offer.stock > 0;
		});
		
		return theBest;

	},

	//calcula el precio total y lo normaliza entre 0 y 1
	//asignan 0 al más costoso y 1 al más barato

	normalizeTotalPrice: function (offers){

		let min = null, max = null;

		//encuentra el máximo y el mínimo
		offers.forEach(offer => {

			let total_price  = offer.price + offer.shipping_price;

			if(min === null){

				//inicializa las variables
				min = total_price;
				max = total_price;

			}else{

				//compara para encontrar el menor
				if(total_price < min){
					min = total_price;
				}

				//compara para encontrar el mayo
				if(total_price > max){
					max = total_price;
				}
			}

		})

		if(min === max){

			//Si todas las ofertas tienen el mismo precio asigna 0 a todas
			offers.forEach(offer => {
				offer.normalized_total_price = 0;
			})	

		}else{

			//Calcula y asigna el precio normalizado
			offers.forEach(offer => {
				offer.normalized_total_price = 1 - ((offer.price + offer.shipping_price - min) / (max - min));
			})	
		}

		return offers

	},

	//calcula los días que demora la entrega para cada oferta y la normaliza de 0 a 1
	//asigna 0 a la oferta que entrega con más demora y 1 a la más rápida

	normalizeDeliveryDate: function (offers){

		let min = null, max = null;

		let nowTime = new Date().getTime();

		//encuentra el maximo y mínimo tiempo de entrega en días
		offers.forEach(offer => {

			//calcula la diferencia de tiempo entre el tiempo de entrega de la oferta y la fecha actual
			let days_delivery_delay = new Date(offer.delivery_date).getTime() - nowTime;

			//redondea a días
			days_delivery_delay = Math.round(days_delivery_delay / 1000 / 60 / 60 / 24)

			if(min === null){

				//inicializa las variables
				min = days_delivery_delay;
				max = min;

			}else{

				//compara para encontrar el menor
				if(days_delivery_delay < min){
					min = days_delivery_delay;
				}

				//compara para encontrar el mayor
				if(days_delivery_delay > max){
					max = days_delivery_delay;
				}
			}

			offer.days_delivery_delay = days_delivery_delay;

		})

		if(min === max){

			//Si todas las ofertas demoran lo mismo asigna 0 a todas
			offers.forEach(offer => {
				offer.normalized_delivery_date = 0;
			})	

		}else{

			//calcula y asigna el valor normalizado
			offers.forEach(offer => {
				offer.normalized_delivery_date = 1 - ((offer.days_delivery_delay - min) / (max - min))
			})	
		}

		return offers;

	},

	//calcula un score único para el seller

	calculateTotalSellerScore: function (offers){
		
		offers.forEach(offer => {

			let total_seller_score  = offer.seller.qualification * offer.seller.reviews_quantity;
			
			//Multiplicamos por un factor de importancia
			//Negativo para quitar puntos
			//0 indica que el factor no es relevante

			switch(offer.seller.qualification){
				case 0: 
					total_seller_score = 0; 
				break;
				case 1: 
					total_seller_score *= -1; 
				break;
				case 2: 
					total_seller_score *= -0.9; 
				break;
				case 3: 
					total_seller_score = 0; 
				break;
				case 4:
					total_seller_score *= 0.9;
				break;
				case 5:
					total_seller_score *= 1;
				break;
			}

			offer.total_seller_score = total_seller_score;

		});

	},


	//Calcula y normaliza la calificacion positiva del vendedor
	//Los vendedores con calificaciones 4 y 5 suman puntos

	normalizePositiveSellerScore: function (offers){

		let min = null, max = null;

		//encuentra el máximo y el mínimo
		offers.forEach(offer => {

			if( offer.seller.qualification > 3 ){
				let total_seller_score = offer.total_seller_score;

				//calcula minimo y maximo
				if(min === null){

					//inicializa las variables
					min = total_seller_score;
					max = total_seller_score;

				}else{

					//compara para encontrar el menor
					if(total_seller_score < min){
						min = total_seller_score;
					}

					//compara para encontrar el mayor
					if(total_seller_score > max){
						max = total_seller_score;
					}
				}
			}

		});


		if(min === max){

			//Si todas las ofertas tienen el mismo total_seller_score asigna 0 a todas
			offers.forEach(offer => {
				if( offer.seller.qualification > 3 ){
					offer.normalized_seller_score = 0;
				}
			})	

		}else{

			//Calcula y asigna el precio normalizado
			offers.forEach(offer => {
				if( offer.seller.qualification > 3 ){
					offer.normalized_seller_score = ((offer.total_seller_score - min) / (max - min));
				}
			})	
		}

		return offers

	},


	//Calcula y normaliza la calificacion negativa del vendedor
	//Se restan puntos para los vendedores con calificaciones 1 y 2

	normalizeNegativeSellerScore: function (offers){

		let min = null, max = null;
		
		//encuentra el máximo y el mínimo
		offers.forEach(offer => {

			if( offer.seller.qualification < 3 ){

				let total_seller_score = offer.total_seller_score;

				//calcula minimo y maximo
				if(min === null){

					//inicializa las variables
					min = total_seller_score;
					max = total_seller_score;

				}else{

					//compara para encontrar el menor
					if(total_seller_score < min){
						min = total_seller_score;
					}

					//compara para encontrar el mayor
					if(total_seller_score > max){
						max = total_seller_score;
					}
				}
			}

		});

		if(min === max){

			//Si todas las ofertas tienen el mismo total_seller_score asigna 0 a todas
			offers.forEach(offer => {
				if( offer.seller.qualification < 3 ){
					offer.normalized_seller_score = 0;
				}
			})	

		}else{

			//Calcula y asigna el precio normalizado
			offers.forEach(offer => {
				if( offer.seller.qualification < 3 ){
					offer.normalized_seller_score = - (1 - ((offer.total_seller_score - min) / (max - min)));
				}
			})	
		}

		return offers

	},

	//Calcula el total de puntos para cada oferta según los pesos entregados
	//para precio y tiempo de entrega usa las variables normalizadas
	//los demás factores los normaliza en la funcion

	calculateOfferScore: function(offers, factorWeights){

		offers.forEach(offer => {

			//Damos puntos si el producto puede ser devuelto
			let normalized_can_be_refunded =  offer.can_be_refunded ? 1 : 0;

			//Damos la totalidad de los puntos si es nuevo
			//la mitad de los puntos si es 'renew'
			//0 puntos si es usado

			let normalized_status = 0;
			normalized_status = (offer.status == 'renew') ? 0.5: normalized_status;
			normalized_status = (offer.status == 'new') ? 1: normalized_status;
			
			//Damos puntos si el producto tiene garantía
			let normalized_guarantee = offer.guarantee ? 1 : 0;
			
			//Calcula los puntos para cada factor 
			//multiplicando la variable normalizada por el peso correspondiente

			offer.score = {

				total_price: offer.normalized_total_price * (factorWeights.total_price || defaultWeights.total_price),

				delivery_date: offer.normalized_delivery_date * (factorWeights.delivery_date || defaultWeights.delivery_date),

				can_be_refunded: normalized_can_be_refunded * (factorWeights.can_be_refunded || defaultWeights.can_be_refunded),

				status: normalized_status *  (factorWeights.status || defaultWeights.status),

				guarantee: normalized_guarantee * (factorWeights.guarantee || defaultWeights.guarantee),

				seller_score: offer.normalized_seller_score * (factorWeights.seller_score || defaultWeights.seller_score),
			}
			
			//Calcula y asigna la totalidad de los puntos de la oferta
			offer.total_score = 
				offer.score.total_price +
				offer.score.delivery_date +
				offer.score.can_be_refunded +
				offer.score.status +
				offer.score.guarantee +
				offer.score.seller_score
		})	

		return offers;
	}


}

module.exports = service;
