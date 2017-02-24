var mongoose=require('mongoose');
var Schema=mongoose.Schema;
//schema
var OperatorSchema= new Schema({
	name:String,
	website:String,
	contact_no:String,
	address: String,
	rating:String
});

module.exports=mongoose.model('Operator',OperatorSchema);