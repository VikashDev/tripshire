var express = require("express")
var router = express.Router();
var mongoose = require('mongoose');
var schema = mongoose.Schema;
var Activity = mongoose.model('feeds', new schema({
    "name": String,
    "discription": String,
    "category": schema.Types.ObjectId,
    "operator": {
        "name": String,
        "website": String,
        "contact_no": String,
        "address": String,
        "rating": String
    },
    "highlights": [String],
    "tags": [String],
    "address": String,
    "geo": [Number],
    "time": {
        "open_time": String,
        "close_time": String
    },
    "duration": Number,
    "image_url": [String],
    "attrs": [String],
    "wiki": [{
        'title': String,
        'url': String,
        'extract': String
    }]
}));

var count = 98;
router.get('/', function(req, res) {
    var random;
    var index = req.query.index;
    var starting_index = req.query.starting_index;
    if (index == null) {
        random = Math.floor(Math.random() * count);
        starting_index = random;
    } else {
        random = parseInt(index) + 10;
        var diff = random - parseInt(starting_index);
        if (diff >= -10 && diff <= 0) {
            res.send(JSON.stringify({
                index: -1
            }));
            return;
        }
        console.log(random);
    }
    random = random % 98;
    var query = Activity.find().skip(random).limit(10);
    query.select('name discription highlights tags address wiki image_url');
    query.exec(function(err, activities) {
        if (err) res.render(err);
        else res.send(JSON.stringify({
            data: activities,
            index: random,
            starting_index: starting_index
        }));
    })
});

module.exports = router; 