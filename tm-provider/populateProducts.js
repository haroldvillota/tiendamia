//Construye un archivo con 100 productos y hasta 10 ofertas diferentes para cada uno

const path = require('path');
const fs = require('fs');

const API_URL = 'https://dummyjson.com/';

const targetFile = path.join('.', `database/offers.json`);
const maxOffersForProduct = 10;
const statusOptions = ['new','used','renew'];
const shippingPriceOptions = [ 0, 5, 7.5, 10 ]; //Opciones de precio de envío
const maxReviewsQuantity = 1000;

//Construir sellers
let  sellers = [];
const now = new Date();

fetch(API_URL+'users?limit=100')
	.then(res => res.json())
	.then(data =>{
		
		for(let user of data.users){

			let randomQualification = Math.ceil(Math.random() * 5);
			let randomReviewsQuantity = Math.round(Math.random() * maxReviewsQuantity);
			
			if(randomReviewsQuantity == 0){
				randomQualification = 0;
			}

			sellers.push({
				name: `${user.firstName} ${user.lastName}`,
				qualification: randomQualification,
				reviews_quantity: randomReviewsQuantity
			})

		}
	    
	    return sellers

	})
	.then(sellers => {

		fetch(API_URL+'products?limit=100')
			.then(res => res.json())
			.then(data =>{

				let products = []
				
				for(let product of data.products){
					
					let offers = [];

					let offersCount = Math.ceil(Math.random() * maxOffersForProduct);

					let selectedSellers = [];

					for (var i = 0; i < offersCount; i++) {

						let randomSeller = sellers[Math.floor(Math.random() * sellers.length)];

						while(selectedSellers.includes(randomSeller.name)){
							randomSeller = sellers[Math.floor(Math.random() * sellers.length)];
						}

						selectedSellers.push(randomSeller.name);

						let randomStatus = statusOptions[Math.floor(Math.random() * statusOptions.length)];
						let randomShippingPrice = shippingPriceOptions[Math.floor(Math.random() * shippingPriceOptions.length)];
						
						//Variamos el precio hasta un 50% de la cantidad original
						let randomPriceVariation = 1 + (Math.random() / 50);
						let price = Number.parseFloat((product.price * randomPriceVariation).toFixed(2));

						//Variamos el stock desde 0 hasta el doble de la cantidad original
						let randomStockVariation = Math.random() * 2;

						//agregarmos un 25% de posibilidades de tener stock en 0
						let stock = Math.random() < 0.25 ? 0: Math.floor(product.stock * randomStockVariation)

						let randomCanBeRefunded = Math.random()>0.5 ? true : false;
						let randomGuarantee = Math.random()>0.5 ? true : false;

						//calcular una fecha de entrega aleatoria posterior a la actual
						//agrego a la fecha actual entre 1 y 15 días

						let randomDays = Math.ceil(Math.random() * 15);
						let randomDeliveryDate = new Date();
						randomDeliveryDate.setDate( now.getDate() + randomDays );
						randomDeliveryDate = randomDeliveryDate.toISOString().split('T')[0];
						
				  		offers.push({
						  	id: i,
							price: price,
							stock: stock,
							shipping_price: randomShippingPrice,
							delivery_date: randomDeliveryDate,
							can_be_refunded: randomCanBeRefunded,
							status: randomStatus,
							guarantee: randomGuarantee,
							seller: randomSeller,
				  		})
					}

					products.push({
						sku : `PR${product.id}`,
						offers
					})
					
				}
			    
			    return products;
			    
			})
			.then(products => {

				fs.writeFile(targetFile, JSON.stringify(products, null, 3), function (err) {
			      if (err) throw err;
			      console.log('File was created successfully.');
			    });

			})

	})
