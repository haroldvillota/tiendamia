var mongoose = require('mongoose');

const schema = require('../schemas/dailySale');

module.exports = mongoose.model('DailySale', schema);