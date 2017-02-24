var mongoose = require('mongoose');

var Schema = mongoose.Schema;
var bcrypt = require('bcrypt-nodejs');


var AdminSchema = new Schema({

	name: 				{ type: String, required:true },
	email: 				{ type: String, required:true, lowercase: true , index : { unique: true } },
	password : 			{ type: String, required:true , select:true },
	created_at: 		{ type: Date, default:Date.now }

});


//password hashing
AdminSchema.pre('save', function(next){

	var user = this;

	if(!user.isModified('password')) return next();

	bcrypt.hash(user.password, null, null, function(err, hash){

		if(err) return(err);

		user.password = hash;
		next();
	});
});


//method to compare password
AdminSchema.methods.verifyPassword = function(password, cb) {
  bcrypt.compare(password, this.password, function(err, isMatch) {
    if (err) return cb(err);
    cb(null, isMatch);
  });
};




module.exports = mongoose.model('Admin', AdminSchema);