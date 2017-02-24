var Activities=require('../models/activities');
var Category=require('../models/category');

module.exports=function (category,location,min,max,pages,callback){
  var skip;
  if(pages==null || pages==1){
    skip=0;
  }else{
    skip=(pages-1)*20;
  }
  if(category==null){
    var check;
    if(max==null && min == null){
      check={"address": {"$regex": location, "$options": "i" }}
    }else if(location==null){
      if(location==null){
        check={"duration":{$gt: min, $lt: max}}
      } else{
        check={"address": {"$regex": location, "$options": "i" },"duration":{$gt: min, $lt: max}}
      }
    }
    Activities.find(check).limit(20)
    .skip(skip).exec(function(err,search){
    var results=[]
    for(key in search){
      results.push({
      title: search[key].name,
      description: search[key].wiki.extract,
      href: '/activity/'+search[key].id,
      address: search[key].address,
      cover_image: search[key].image_url
      })
    }
    return callback(null,results);
})
}else{
  Category.findOne({name:category},function(err,cate){
    if(cate==null){
      return callback(err,[]);
    }
    if(err){
      return callback(err,[]);
    }
    var check;
    if(max==null && min == null){
      if(location==null){
        check={"category":cate._id}
      }else{
      check={"category":cate._id,"address": {"$regex": location, "$options": "i" }}
    }
  }else{
      if(location==null){
        check={"category":cate._id,"duration":{$gt: min, $lt: max}}
      }else{
        check={"category":cate._id,"address": {"$regex": location, "$options": "i" },"duration":{$gt: min, $lt: max}}
      }
    }
    console.log(check)
    Activities.find(check).limit(20)
    .skip(skip).exec(function(err,search){
      if(err){
          return callback(err,[]);
      }
      console.log(search)
      var results=[]
      for(key in search){
        results.push({
        title: search[key].name,
        description: search[key].discription,
        href:  '/activity/'+search[key]._id,
        cover_image: search[key].image_url,
        rating: 4 // out of 5
        })
      }
    return callback(null,results);
      })
  })
}
}
