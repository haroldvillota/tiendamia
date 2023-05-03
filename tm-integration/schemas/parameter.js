var mongoose = require('mongoose');

const schema = new mongoose.Schema(
	{

		key: { type: String, required: true },
		value: { type: mongoose.Mixed, required: true }
		
	},

);


module.exports = schema;