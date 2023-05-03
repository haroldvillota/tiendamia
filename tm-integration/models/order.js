var mongoose = require('mongoose');

const schema = require('../schemas/order');

module.exports = mongoose.model('Order', schema);