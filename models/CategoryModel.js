var mongoose = require('mongoose');
var Schema   = mongoose.Schema;

var CategorySchema = new Schema({
	'CategoryName' : String,
	 'return' : String
},
{timestamps:true},);

module.exports = mongoose.model('Category', CategorySchema);
