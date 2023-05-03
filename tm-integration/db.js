
var mongoose = require('mongoose');

async function main(callback) {

	let URI;

	if(process.env.MONGO_DISABLED && process.env.MONGO_DISABLED==='true'){
		throw new Error('Database is disabled')
	}

	if(process.env.MONGO_URI){
		URI = process.env.MONGO_URI; // Declare MONGO_URI in your .env file	
	}else{

		const host = process.env.MONGO_HOST
		const port = process.env.MONGO_PORT
		const user = process.env.MONGO_USER
		const pass = process.env.MONGO_PASSWORD
		const database = process.env.MONGO_DATABASE
		const auth_source = process.env.MONGO_AUTH_SOURCE ? `?authSource=${process.env.MONGO_AUTH_SOURCE}` : ''
		const auth = user ? `${user}:${pass}@` : ''

		if(port){
			URI = `mongodb://${auth}${host}:${port}/${database}${auth_source}?retryWrites=true&w=majority`	
		}else{
			URI = `mongodb+srv://${auth}${host}/${database}${auth_source}?retryWrites=true&w=majority`	
		}
        
	}
		
    
    try {
        
        const options = {
		  autoIndex: true, // Don't build indexes
		  maxPoolSize: process.env.MONGO_MAXPOOLSIZE | 2, // Maintain up to 10 socket connections
		  serverSelectionTimeoutMS: 5000, // Keep trying to send operations for 5 seconds
		  socketTimeoutMS: 45000, // Close sockets after 45 seconds of inactivity
		  family: 4 // Use IPv4, skip trying IPv6
		};

        const connection = await mongoose.connect(URI, options);

        // Make the appropriate DB calls
        await callback(connection);

    } catch (e) {
        // Catch any errors
        console.error(e);
        throw new Error('Unable to Connect to Database')
    }
}

module.exports = main;