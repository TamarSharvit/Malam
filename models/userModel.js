var mongoose = require('mongoose');
var Schema   = mongoose.Schema;

var addresSchema=new Schema({
	'City':String,
	'Street':String,
	'BuildingNum':Number,
	'HouseNum':Number
});
var UserSchema = new Schema({
	'FirstName' : String,
	'LastName' : String,  
	'Email' :{type:String, unique:true},
	'Password' : String
},
{timestamps:true},
);
UserSchema.virtual('ordersUser',{
	ref:'Orders',
	localField:'_id',
	foreignField:'UserId'
});
UserSchema.set('toObject',{virtuals:true});
UserSchema.set('toJSON', {virtuals:true});

module.exports = mongoose.model('User', UserSchema);
