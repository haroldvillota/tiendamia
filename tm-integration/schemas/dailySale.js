var mongoose = require('mongoose');

const schema = new mongoose.Schema(
	{

		date: { type: Date },
		sku: { type: String },
		qty: { type: Number },
        
	},
	{ 
		strict: true,
		strictQuery: false,
		timestamps: true
	},



);

schema.index({ date:1, sku: 1 }, { unique: true, sparse: true });

module.exports = schema;