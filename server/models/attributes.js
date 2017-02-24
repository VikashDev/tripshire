var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

var AttributeSchema = new Schema({
	attr: {
		question: { type: [String]},
		ans: { type: [String]}
	}
}, {timestamps: true});

module.exports=mongoose.model('Attributes',AttributeSchema);