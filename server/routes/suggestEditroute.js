var express = require('express'),
    router = express.Router(),
    Category = require('../models/category.js'),
    Attributes = require('../models/attributes.js'),
    Guidelines = require('../models/guidelines.js'),
    request = require('request'),
    passport = require('passport');
router.use('/somename', function(req, res, next) {
    console.log('in use');
    var category = req.query.category;
    Category.findOne({
            name: category
        }, function(err, result) {
            if (err) {
                return next(err);
            }
            res.json({
                'status': "false",
                'error': err
            });
            if (result === null) {
                res.json({
                    'status': 'No result',
                });
            } else {
                req.attributes = result.attributes;
                req.guidelines = result.guidelines;
                next();
            }

        }

    );
});
router.route('/somename')
    .get(function(req, res, next) {
        console.log('Enter Get');
        var a = [];
        var g = [];
        Attributes.findById(req.attributes).exec(function(err, attributes) {
            if (err) {
                return next(err);
            }
            res.json({
                'status': "false",
                'error': 'Sorry some error happened'
            });
            if (attributes === null) {
                res.json({
                    'status': 'Attributes are not present'
                });
            } else {
                a = attributes.attr.question;
            }


        }).then(function() {
            Guidelines.findById(req.guidelines).exec(function(err, guideLines) {
                if (err) {
                    return next(err);
                }
                res.json({
                    'status': "false",
                    'error': 'Sorry some error happened'
                });
                if (guideLines === null) {
                    res.json({
                        'status': 'Guidelines are not present'
                    });
                } else {
                    g = guideLines.guidelines.question;
                }

            }).then(function() {
                res.json({
                    'attributes': a,
                    'guidelines': g
                });
            });
        });

    })
    .put(function(req, res, next) {
        console.log(req.body.ans);
        var ans = req.body.ans;
        Attributes.findById(req.attributes).exec(function(err, attributes) {
            if (err) {
                throw err;
            } else {
                attributes.attr.ans.push(req.body.ans.attributes);
                attributes.save(function(err, savedResult) {
                    if (err) {
                        throw err;
                    } else {
                        console.log(savedResult);
                    }
                });
            }
        }).then(function() {
            Guidelines.findById(req.guidelines).exec(function(err, guideLines) {
                if (err) {
                    throw err;
                } else {
                    guideLines.guidelines.ans.push(req.body.ans.guidelines);
                    guideLines.save(function(err, savedResult) {
                        if (err) {
                            throw err;
                        } else {
                            console.log(savedResult);
                        }
                    });
                }
            });
        }).then(function() {
            res.json({
                status: 'Done'
            });
        });
    });
router.route('/wiki')
    .get(function(req, res, next) {
        var search = req.query.search;
        var wikiData = {
            title: undefined,
            url: 'https://en.wikipedia.org/wiki/',
            data: undefined
        };
        console.log(search);
        request("https://en.wikipedia.org/w/api.php?action=query&list=search&srsearch=" + search.replace(' ', '_') + "&format=json", function(error, response, obj) {
            if (error) {
                console.log(error);
                // next(error);
            }
            // res.json({
            //     'error': 'shit',
            //     'status': 'false'
            // });
            if (response === [] || obj === undefined) {
                // console.log('[]', response);
                // return callback(error, response, obj);
                res.json({
                    'error': error,
                    'response': response,
                    'data': obj
                });
            } else {
                obj = JSON.parse(obj);

                if (obj.query.search.length === 0) {
                    // console.log('len', response);
                    // return callback(error, response, null);
                    res.json({
                        'error': error,
                        'response': response,
                        'data': null
                    });

                } else {
                    // console.log(obj.query.search);
                    request('https://en.wikipedia.org/w/api.php?format=json&action=query&prop=extracts&exintro=&explaintext=&titles=' + obj.query.search[0].title, function(error, resp, object) {
                        // return callback(error, resp, object);
                        object = JSON.parse(object);

                        for (var id in object.query.pages) {
                            wikiData.title = object.query.pages[id].title;
                            wikiData.url += object.query.pages[id].title;
                            wikiData.data = object.query.pages[id].extract;
                        }
                        res.json({
                            'data': wikiData
                        });
                    });
                }
            }
        });
    });

router.route('/test')
    .get(function(req, res, next) {
        console.log('Hello passport');
        passport.authenticate('facebook', {scope: 'email'});

    });

router.route('/fb_callback')
    .get(function(req, res, next) {
        console.log('Hello passport');
        passport.authenticate('google', {
                failureRedirect: '/',
                successRedirect: '/'
            }),
            function(req, res) {
                console.log('Inside here');
            };

    });


module.exports = router;