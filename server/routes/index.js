var mongoose = require('mongoose');
var fs = require("fs");
var multer = require("multer");
var upload = multer({
    dest: "./uploads"
}).single('file');
var Grid = require("gridfs-stream");
var config = require("../../config");
var passport = require('passport');
var filter = require("../controllers/filter");
var search = require("../controllers/search");
var activity_detail = require("../controllers/getActivityDetail")
conn = mongoose.connection
var gfs;
Grid.mongo = mongoose.mongo;
conn.once("open", function() {
    gfs = Grid(conn.db);
});

exports.init = function(app) {
    app.get('/', function(req, res, next) {

        res.render('homepage', {
            homepage_sections: config.homepage_sections
        });

    });

    app.get('/newPage', function(req, res, next) {
        res.render('homepage_sample', {
            homepage_sections: config.homepage_sections
        });
    });
    app.get('/activity/:activity_slug', function(req, res, next) {
        activity_detail(req.params.activity_slug, function(err, results, related_items) {
            res.render('single_article', {
                activity: results,
                related_items: related_items
            });
        });
    });
    app.get('/search', function(req, res, next) {

        var passed_locations = (req.query.locations || '').split('-'); // locations string array

        var passed_category = req.query.category; // /results?category=Scuba%20Diving

        var activity_duration = {
            min: req.query.activity_duration_min, // minimum activity duration
            max: req.query.activity_duration_max // maximum activity duration
        };
        var value = search(req.query.key, req.query.page, req.query.locations, req.query.activity_duration_min, req.query.activity_duration_max, function(err, result) {
            if (err) {
                console.log(err);
            }
            res.render('results_page', {
                result_count: result.length,
                results: result
            });
        });
    });
    app.get('/results', function(req, res, next) {

        var passed_locations = (req.query.locations || '').split('-'); // locations string array

        var passed_category = req.query.category; // /results?category=Scuba%20Diving

        var activity_duration = {
            min: req.query.activity_duration_min, // minimum activity duration
            max: req.query.activity_duration_max // maximum activity duration
        };
        var value = filter(passed_category, req.query.locations, req.query.activity_duration_min, req.query.activity_duration_max, req.query.page, function(err, result) {
            if (err) {
                console.log(err);
            }
            res.render('results_page', {
                result_count: result.length,
                results: result
            });
        });
    });
    app.post("/image", upload, function(req, res, next) {
        //create a gridfs-stream into which we pipe multer's temporary file saved in uploads. After which we delete multer's temp file.
        var writestream = gfs.createWriteStream({
            filename: req.file.originalname
        });
        //
        // //pipe multer's temp file /uploads/filename into the stream we created above. On end deletes the temporary file.
        fs.createReadStream("./uploads/" + req.file.filename)
            .on("end", function() {
                fs.unlink("./uploads/" + req.file.filename, function(err) {
                    res.send("success");
                });
            })
            .on("err", function() {
                res.send("Error uploading image");
            })
            .pipe(writestream);
    });
    // sends the image we saved by filename.
    app.get("image/:filename", function(req, res) {
        var readstream = gfs.createReadStream({
            filename: req.params.filename
        });
        readstream.on("error", function(err) {
            res.send("No image found with that title");
        });
        readstream.pipe(res);
    });

    //delete the image
    app.get("image/delete/:filename", function(req, res) {
        gfs.exist({
            filename: req.params.filename
        }, function(err, found) {
            if (err) return res.send("Error occured");
            if (found) {
                gfs.remove({
                    filename: req.params.filename
                }, function(err) {
                    if (err) return res.send("Error occured");
                    res.send("Image deleted!");
                });
            } else {
                res.send("No image found with that title");
            }
        });
    });
};