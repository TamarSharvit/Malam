var mongoose = require('mongoose');
var Schema   = mongoose.Schema;

var OrdersSchema = new Schema({
	'OrderDate' : Date,
	'OrderSum' : Number,
	'Products' : Array,
	'UserId' : {
	 	type: Schema.Types.ObjectId,
	 	ref: 'User'
	}
},
{timestamps:true},);

module.exports = mongoose.model('Orders', OrdersSchema);
