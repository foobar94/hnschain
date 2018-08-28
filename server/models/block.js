var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var blockSchema = new Schema({
	hash: String,
	height: {type: Number, unique: true},
	numTransactions: Number,
	time: Number,
	bits: Number,
	previous: String,
	merkleRoot: String
});

module.exports = blockSchema;