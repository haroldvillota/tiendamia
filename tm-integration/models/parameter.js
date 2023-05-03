var mongoose = require('mongoose');

const schema = require('../schemas/parameter');

module.exports = mongoose.model('Parameter', schema);