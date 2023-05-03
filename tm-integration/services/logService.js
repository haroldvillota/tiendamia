

const service = {

	info: async function (error, req) {

		console.info([error, req.body]);
	  	
	},

	warn: async function (error, req) {

		console.warn([error, req.body]);
	  	
	},

	error: async function (error, req) {

		console.error([error, req.body]);

	},

	debug: async function (error, req) {

		console.debug([error, req.body]);
	  	
	},

}
 
module.exports = service;



