var Activities=require('../models/activities');
var ObjectId = require('mongoose').Types.ObjectId;
module.exports=function (id,callback){
  Activities.findOne({"_id":id}).exec(function(err,search){
    if(err){
        console.log(err);
        return callback(err,null);
    }else{
      if(search!=null){
    Activities.find({'geo':{$near:search.geo,$maxDistance:(parseFloat(10)/111.12)}},function(error,docs){
    if(error){
      console.log(err);
      return callback(err,null);
    }else{
      var results={
          title: search.name,
          recommended_for_hrs: search.duration,
          cost_per_person: "",
          opening_hrs: {
            start: search.time.open_time,
            end: search.time.close_time
          },
          cover_image: search.image_url,
          location: search.address,
          tags: search.tags,
          description:(search.wiki[0]!=undefined?search.wiki[0].extract:"")
        }
        var related_items=[];
        for (i in docs){
          related_items.push({
            title: docs[i].name,
            url: '/activity/'+docs[i]._id,
            image: docs[i].image_url,
            description: (docs[i].wiki[0]!=undefined?docs[i].wiki[0].extract:"")
          })
        }
        console.log(results,related_items)
      return callback(null,results,related_items);
      }
    })
    }
  }
  })
}
