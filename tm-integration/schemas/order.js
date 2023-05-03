var mongoose = require('mongoose');

const schema = new mongoose.Schema(
	{

		sku: { type: String, required: true },
		qty: { type: Number, required: true },
        offer_id: { type: String, required: true },
        price: { type: Number, required: true },
        shipping_price: { type: Number, required: true },
        delivery_date: { type: Date, required: true },
        can_be_refunded: { type: Boolean, required: true },
        status: { type: String, required: true },
        guarantee: { type: Boolean, required: true },
        seller: { type: String, required: true },
        customer: { type: String, required: true },
		
	},
    { 
        strict: true,
        strictQuery: false,
        timestamps: true
    },

);


module.exports = schema;