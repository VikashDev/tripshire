mongoose=require('mongoose');
var Schema=mongoose.Schema;
var Item = new Schema(
  { img: 
      { data: Buffer, contentType: String }
  }
);
module.exports = mongoose.model('Images',Item);