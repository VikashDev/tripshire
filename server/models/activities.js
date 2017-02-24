// var mongoose=require('mongoose');
var category=require('./category');
var operator=require('./operator');
var mongoosastic=require('mongoosastic');
var mongoose=require('mongoose');
var URL = require('url-parse');
var elasticsearch=require('elasticsearch');
var Schema=mongoose.Schema;

var ActivitiesSchema=new Schema({
	name: {
		type:String,
		index:true,
		required:true,
		trim:true,
		es_boost: 2.0,
		validate: [stringNotNull,"name of activity can't be null"],
		es_indexed: true
	},
	discription: {type:String, es_indexed: true},
	category: {
		type: Schema.Types.ObjectId,
		ref: 'category',
		required:true,
		es_indexed:false
		},
	operator:[{
		name:String,
		website:String,
		contact_no:String,
		address: String,
		rating:Number
	}],
	rating:String,
	highlights: {
		type:[String],
		index:true,
		es_indexed: true,
		trim:true
		},
	tags: {
		type:[String],
		index:true,
		es_indexed: true,
		es_boost: 2.0,
		trim:true
		},
	address:[{type:String,
		index:true,
		es_indexed:true
	}],
	geo:{
		type:[Number],
		index: '2d'
	},
	time:[{
		open_time:String,
		close_time:String
	}],
	duration:Number,
	image_url:{
		type:String,
		es_indexed:false
	},
	wiki:[
	{
		title:{
			type:String,
		},
		url:{
			type:String,
		},
		extract:{
			type:String,
		}
	}
	],
	attrs:[{
		key:{
			type:String,
			index:true,
			es_indexed: true
		},
		val:{
			type:String,
			index:true,
			es_indexed: true
		}
	}]
},{timestamps: true});
var esClient = new elasticsearch.Client({host: 'https://paas:3a5333802a394aee79a1f7af19252200@dori-us-east-1.searchly.com'});
// var esClient = new elasticsearch.Client({host: 'http://localhost:9200/'});

ActivitiesSchema.plugin(mongoosastic,{
	esClient: esClient
});

function stringNotNull(obj){
	return obj.length;
}
//return schema
module.exports=mongoose.model('Activities',ActivitiesSchema);
