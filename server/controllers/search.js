var Activities=require('../models/activities');
module.exports=function (key,pages,location,min,max,callback){
  if(pages===null || pages===1){
    skip=0;
  }else{
    skip=(pages-1)*20;
  }
  if(key===null){
      callback(null,[]);
  }
  if(max===null && min === null){
    if(location===null){
      check={};
    }else{
    check={"address": {"$regex": location, "$options": "i" }};
    }
  }else{
     if(location===null){
       check={"duration":{$gt: min, $lt: max}};
    } else{
      check={"address": {"$regex": location, "$options": "i" },"duration":{$gt: min, $lt: max}};
    }
  }
  console.log(check);
  Activities.find({$and:[{$or:[{'name':{"$regex": key, "$options": "i" }},{'highlights':{"$regex": key, "$options": "i" }},{'tags':{"$regex": key, "$options": "i" }}]},check]}).limit(20)
    .skip(skip).exec(function(err,search){
      if(err){
          return callback(err,[]);
      }
    var results=[];
    for(key in search){
      results.push({
      title: search[key].name,
      description: search[key].wiki.extract,
      href: '/activity/'+search[key].id,
      address: search[key].address,
      cover_image: search[key].image_url
      });
    }
    return callback(null,results);
    });
}
