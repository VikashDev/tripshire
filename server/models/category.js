tree=require('mongoose-path-tree');
mongoose=require('mongoose');
var Schema=mongoose.Schema;
var attributes = require('./attributes.js');
var guidelines = require('./guidelines.js');
var CategorySchema = new Schema({
	name: {type:String,unique:true,required:true,dropDups: true},
	discription: String,
	image_url: String,
	attributes: {
		type: Schema.Types.ObjectId,
		ref: 'attributes',
		required: true
	},
	guidelines: {
		type: Schema.Types.ObjectId,
		ref: 'guidelines',
		required: true
	}
	
});
CategorySchema.plugin(tree,{
	onDelete :      'REPARENT' 
});
module.exports=mongoose.model('Category', CategorySchema);

