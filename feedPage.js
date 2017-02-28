 var express=require("express")
 var router=express.Router();
var mongoose=require('mongoose');
var schema=mongoose.Schema;
var Activity=mongoose.model('Activity',new schema({
	"name" : String,
	"discription" :String,
	"category" : schema.Types.ObjectId,
	"operator" : {
		"name" : String,
		"website" : String,
		"contact_no" : String,
		"address" : String,
		"rating" : String
	},
	"highlights" : [String],
	"tags" : [String],
	"address" : String,
	"geo" : [Number],
	"time" : {
		"open_time" : String,
		"close_time" : String
	},
	"duration" : Number,
	"image_url" : [String],
	"attrs" : [String],
	"wiki" : [String]
}));

var count=1381;
router.get('/',function(req,res){
var random=Math.floor(Math.random()*count);
console.log(random);
var query=Activity.find().skip(random).limit(20);
query.select('name discription highlights tags address wiki image_url');
query.exec(function (err, activities) {
  if (err) res.render(err);
  else res.send(JSON.stringify(activities)) ;
})
// console.log(mongoose)	

});

module.exports=router;