var mongoose = require('mongoose');
var Schema   = mongoose.Schema;

var ProductSchema = new Schema({
	'ProductName' : String,
	'ProductPrice' : Number,
	'CategoryId' : {
	 	type: Schema.Types.ObjectId,
	 	ref: 'Category'
	},
	'ProductImage' : String,
	'Description' : String
},
{timestamps:true},);

module.exports = mongoose.model('Product', ProductSchema);
