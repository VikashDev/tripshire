var express = require('express');
var router = express.Router();
var request = require('request');
var fs = require('fs');
var Category = require('../models/category');
var Activities = require('../models/activities');
var authController = require('../controllers/auth');
var adminController = require('../controllers/admincontroller');
var mongoose = require('mongoose');
var fs = require("fs");
var multer = require("multer");
var upload = multer({
    dest: "./uploads"
}).single('file');
var upload = multer({
    inMemory: true
}).single('file');
var Grid = require("gridfs-stream");
var csvtojson = require("csvtojson");
var gfs;
Grid.mongo = mongoose.mongo;
conn.once("open", function() {
    gfs = Grid(conn.db);
});

function coodinateFinder(address, callback) {
    var NodeGeocoder = require('node-geocoder');

    var options = {
        provider: 'google',

        // Optional depending on the providers
        httpAdapter: 'https', // Default
        apiKey: 'AIzaSyCccwP_z57arl1jMev-X67l9lipc3GQVVM', // for Mapquest, OpenCage, Google Premier
        formatter: null // 'gpx', 'string', ...
    };

    var geocoder = NodeGeocoder(options);
    geocoder.geocode({
        address: address,
        minConfidence: 0.5,
        limit: 5
    }, function(err, res) {
        callback(err, res);
    });
};
//admin router
router.route('/admin')
    .post(adminController.postAdmin)
    .get(authController.isAuthenticated, adminController.getAdmin);
router.route('/admin/login').post(adminController.login);
router.get('/admin/logout', function(req, res) {
    req.logout();
    res.status(200).json({
        status: 'Bye!'
    });
});
router.get('/admin/status', function(req, res) {
    console.log(!req.isAuthenticated());
    if (!req.isAuthenticated()) {

        return res.status(200).json({
            status: false
        });
    }
    res.status(200).json({
        status: true
    });
});


router.post('/upload_csv', upload, function(req, res) {
    console.log(req.file);
    Category.findOne({
        name: req.body.category
    }, function(err, cat) {
        if (err) {
            console.log(err);
            res.json({
                'status': "false",
                'error': err
            });
        }
        if (cat == null) {
            res.json({
                'status': "false",
                'error': "no categorywith given name found"
            });
        } else {


            var fileString = req.file.buffer.toString();
            // var content = fs.readFileSync('../', { encoding: 'binary' });
            // var parsed = Papa.parse(content,{header:true, skipEmptyLines:true});

            const csv = require('csvtojson')
            csv({
                    noheader: false
                })
                .fromString(fileString)
                .on('csv', (csvRow) => {
                    wikiData(csvRow[0], function(err, wikiresponse, obj) {
                        if (err) {
                            console.log(err);
                        }

                        wiki = [];

                        if (obj != null && obj != "") {
                            obj = JSON.parse(obj)
                            for (i in obj.query.pages) {
                                wiki.push({
                                    'title': obj.query.pages[i].title.split(' ').join('_'),
                                    'url': "https://en.wikipedia.org/wiki/" + obj.query.pages[i].title.split(' ').join('_'),
                                    'extract': obj.query.pages[i].extract
                                });
                            }
                        }
                        var category;
                        var attrs = []
                        if (csvRow[15] != null) {
                            keys = csvRow[15].split(',');
                            values = csvRow[16].split(',');
                            for (i = 0; i < keys.length; i++) {
                                attrs.push({
                                    'key': keys[i],
                                    'values': values[i]
                                });
                            }
                        }
                        var data = []
                        data.push({
                            'name': csvRow[0],
                            'discription': csvRow[1],
                            'category': cat._id,
                            'operator': {
                                'name': csvRow[2],
                                'website': csvRow[3],
                                'contact_no': csvRow[4],
                                'address': csvRow[5],
                                'rating': csvRow[6]
                            },

                            'highlights': csvRow[7].split(','),
                            'tags': csvRow[8].split(','),
                            'address': csvRow[9],
                            'geo': (csvRow[10] == "" ? [0, 0] : [parseFloat(csvRow[10].replace("'", "").split(',')[0]), parseFloat(csvRow[10].replace("'", "").split(',')[1])]),
                            'time': {
                                'open_time': csvRow[11],
                                'close_time': csvRow[12]
                            },
                            'duration': (csvRow[13] == null ? null : parseFloat(csvRow[13])),
                            'image_url': csvRow[14],
                            'attrs': attrs,
                            'wiki': wiki,
                            'rating': csvRow[17]
                        });
                        Activities.collection.insert(data, function(err, result) {
                            if (err) {
                                console.log(err);
                                res.json({
                                    'status': "false",
                                    'message': 'successfully added value'
                                })
                            } else {
                                console.log(data);
                            }
                        })
                    })
                })
                .on('done', () => {
                    console.log("done")
                })
            res.json({
                'status': 'success',
                'message': 'successfully added value'
            })
        }
    })
})


//api main page
router.get('/', function(req, res) {

    res.json({
        message: 'hello welcome to tripshire api have a look on /api/activities and /api/categories<br />/api/categories(CRUD) avaliable <br /> /api/activities-show all activities <br />/api/activities/{category name} - for category<br /> /api/activities/location?lat=x&long=y - for location based search<br /> /api/activities/search?key={search word} <br/>/api/activities/{any other argument}'
    });
});
//**'/categories'**//
Activities.createMapping(function(err, mapping) {
    if (err) {
        console.log("error while elasticsearch mapping");
        console.log(err);
    }
    console.log("mapping successful");
    console.log(mapping);
    // body...
});
router.get('/categories/all', function(req, res) {
    Category.find({}, function(err, categories) {
        if (err) {
            return res.send({
                'status': "false",
                'error': err
            });
        }
        return res.json({
            'status': "success",
            "data": categories
        });
    });
});
CategoriesRoute = router.route('/categories');
CategoriesRoute.post(upload, function(req, res) {
    var data;
    console.log(req.body);
    var parent_node = (req.body.parent != null ? req.body.parent : "categories");
    // if (req.body.parent!=null){
    console.log(parent_node);
    Category.findOne({
        name: parent_node
    }, function(err, parent) {
        if (err) {
            return res.json({
                'status': "false",
                'error': err
            });
        }

        if (parent == null) {
            return res.json({
                'status': "false",
                'error': "no such parent category present"
            });
        } else {
            data = {
                name: req.body.name,
                discription: req.body.discription,
                parent: parent._id,
                attributes: '58a57e5673eff4443b6ad08c',
                guidelines: '58a5812f5e1988484749fc4c'
            };
            if (req.file != undefined) {
                var writestream = gfs.createWriteStream({
                    filename: req.file.originalname
                });
                fs.createReadStream("./uploads/" + req.file.filename)
                    .on("end", function() {
                        fs.unlink("./uploads/" + req.file.filename, function(err) {
                            if (err) {
                                console.log(err);
                            }
                            console.log('done');
                        });
                    })
                    .on("err", function() {
                        res.send("Error uploading image")
                    })
                    .pipe(writestream);
                data['image_url'] = '/' + req.file.originalname;
            };
            console.log(data);
            var new_category = new Category(data).save(function(err, result) {
                if (err) {
                    res.json({
                        'status': "false",
                        'error': err
                    });
                } else {
                    console.log(result);
                    return res.json({
                        'status': "success",
                        'data': result
                    });
                }
            });
        };
    });
});
CategoriesRoute.get(function(req, res) {
    key = req.query.key;
    if (key == null) {
        key = "categories";
    }

    Category.findOne({
        name: key
    }, function(err, categories) {
        if (err) {
            console.log(err);
            return req.json({
                'status': "success",
                'data': err
            });
        }
        if (categories == null) {
            res.json({
                'status': "false",
                'error': 'no category with key found'
            });
        }
        var childTree = categories.getChildrenTree(function(err, childTree) {
            if (err) {
                res.json({
                    'status': "false",
                    'error': err
                });
            };
            return res.json({
                'status': "success",
                'data': categories,
                'children': childTree
            });
        });
    });
});

CategoriesRoute.put(authController.isAuthenticated, function(req, res) {
    console.log(req.body.name, req.body.parent, req.body.newname);
    new_name = (req.body.newname == null ? req.body.name : req.body.newname);
    console.log(new_name);
    if (req.body.name == null) {
        return res.json({
            'status': "false",
            'error': " Cannot set property 'name' of null"
        })
    };
    // if (req.body.parent!=null){
    Category.findOne({
        name: req.body.parent
    }, function(err, parent) {
        Category.findOne({
            name: req.body.name
        }, function(err, data) {
            if (err) {
                return res.json({
                    'status': "false",
                    'error': err
                });
            };
            data.name = new_name;
            data.parent = parent;
            data.save(function(err) {
                if (err) {
                    return res.json(res.json({
                        'status': "false",
                        'error': err
                    }));
                }
                return res.json({
                    'status': "success",
                    'data': data
                });
            });
        });
    });
});

CategoriesRoute.delete(authController.isAuthenticated, function(req, res) {
    id = req.body.id;
    if (id == null) {
        return res.json({
            'status': "false",
            'error': 'please send arg id'
        });
    }
    Category.findOne({
        _id: id
    }, function(err, doc) {
        doc.remove(function(err) {
            if (err) {
                return res.json({
                    'status': "false",
                    'error': err
                });
            }
            return res.json({
                'status': "success"
            });
        })
    })
});
//** '/activities' **//
ActivitiesRoute = router.route('/activities');
ActivitiesRoute.get(function(req, res) {

    Activities.find({}, function(err, docs) {
        if (err) {
            return req.json({
                'status': "false",
                'error': err
            });
        }
        return res.json({
            'status': "success",
            'data': docs
        });
    });
});
router.route('/activities/:id').get(function(req, res) {
    id = req.params.id;
    Activities.findOne({
        _id: id
    }, function(err, result) {
        if (err) {
            return res.json({
                'status': "false",
                'error': result
            });
        }
        return res.json({
            'status': "success",
            'data': result
        });
    });
});
router.route('/activities/filter/:filter').get(function(req, res) {
    filter = req.params.filter;
    switch (filter) {
        case "duration":
            min = req.query.min;
            max = req.query.max;
            if (min == null || max == null) {
                return res.json({
                    'status': "false",
                    'error': "please provide min and max"
                });
            };
            Activities.find({}).where('duration').gt(min).lt(max).exec(function(err, docs) {
                if (err) {
                    return res.json({
                        'status': "false",
                        'error': err
                    });
                }
                return res.json({
                    'status': "success",
                    'data': docs
                });
            });
            break;
        case "search":
            if (req.query.key == null) {
                return res.json({
                    'status': "false",
                    'error': 'please pass key attrs'
                });
            }
            Activities.search({
                query_string: {
                    query: req.query.key
                }
            }, {
                hydrate: true
            }, function(err, result) {
                if (err) {
                    return res.json({
                        'status': "false",
                        'error': err
                    });
                }
                return res.json({
                    'status': "success",
                    'data': result
                });
            });
            break
        case "categories":

            Category.findOne({
                name: req.query['key']
            }, function(err, doc) {
                if (err) {
                    return res.json({
                        'status': "false",
                        'error': err
                    });
                }
                if (doc == null) {
                    return res.json({
                        'status': "false",
                        'error': "no such category found"
                    });
                }
                Activities.find({
                    category: doc._id
                }).populate('Category').exec(function(err, result) {
                    if (err) {
                        return res.json({
                            "data": "no data found"
                        });
                    }
                    return res.json({
                        'status': "success",
                        "data": result
                    });
                });
            });

            break;

            address = req.query['address']
            if (address == null) {
                return res.json({
                    'status': "false",
                    'error': "please provide argument address and distance"
                });
            }
            coodinateFinder(address, function(err, result) {

                if (err) {
                    return res.json({
                        'status': "false",
                        'error': err
                    });
                }
                if (result.length == 0) {
                    return res.json({
                        'status': "false",
                        'error': "no nearby activities found"
                    });
                }

                lat = result[0]['latitude']
                longi = result[0]['longitude']
                max_distance = req.query['distance']
                Activities.find({
                    'geo': {
                        $near: [lat, longi],
                        $maxDistance: (parseFloat(max_distance) / 111.12)
                    }
                }, function(err, docs) {
                    if (err) {
                        res.json({
                            'status': "false",
                            'error': err
                        });
                    }
                    return res.json({
                        'status': "success",
                        'data': docs
                    });
                });


            });
            break;
        default:
            value = req.query['value'];

            Activities.find({
                'attrs.key': filter,
                'attrs.val': value
            }, function(err, docs) {
                if (err) {
                    return res.json({
                        'status': "false",
                        'error': err
                    });
                }
                return res.json({
                    'status': "success",
                    'data': docs
                });
            });
            break;
    }
});

function wikiData(name, callback) {
    request("https://en.wikipedia.org/w/api.php?action=query&list=search&srsearch=" + name.replace(' ', '_') + "&format=json", function(error, response, obj) {
        if (response == [] || obj == undefined) {
            return callback(error, response, obj);
        } else {
            obj = JSON.parse(obj);
            if (obj.query.search.length == 0) {
                return callback(error, response, null);
            } else {
                request('https://en.wikipedia.org/w/api.php?format=json&action=query&prop=extracts&exintro=&explaintext=&titles=' + obj.query.search[0].title, function(error, resp, object) {
                    return callback(error, resp, object);
                });
            }
        }
    });
};
ActivitiesRoute.post(upload, function(req, res) {
    if (req.body.category == null) {
        return res.json({
            'status': "false",
            'error': 'category is requested field'
        });
    }
    Category.findOne({
        name: req.body.category
    }, function(err, cat) {
        if (err) {
            res.json({
                'status': "false",
                'error': "category with provided name not found"
            });
        }
        coodinateFinder(req.body.address, function(err, response) {
            if (err) {
                res.json({
                    'status': "false",
                    'error': err
                });
            }
            if (response.length == 0) {

                res.json({
                    'status': "false",
                    'error': "no such location found"
                });
            } else {
                wikiData(req.body.name, function(err, wikiresponse, obj) {
                    if (err) {
                        return res.json({
                            'status': "false",
                            'error': err
                        });
                    }
                    obj = JSON.parse(obj);
                    wiki = [];
                    if (obj != null) {
                        for (i in obj.query.pages) {
                            wiki.push({
                                'title': obj.query.pages[i].title.split(' ').join('_'),
                                'url': "https://en.wikipedia.org/wiki/" + obj.query.pages[i].title.split(' ').join('_'),
                                'extract': obj.query.pages[i].extract
                            });
                        }
                    }
                    data = {
                        name: req.body.name,
                        category: cat,
                        tags: req.body.tags,
                        duration: parseFloat(req.body.duration),
                        highlights: req.body.highlights,
                        geo: [response[0]['latitude'], response[0]['longitude']],
                        attrs: req.body.attrs,
                        address: req.body.address,
                        operator: req.body.operator,
                        wiki: wiki
                    }
                    if (req.file != undefined) {
                        var writestream = gfs.createWriteStream({
                            filename: req.file.originalname
                        });
                        fs.createReadStream("./uploads/" + req.file.filename)
                            .on("end", function() {
                                fs.unlink("./uploads/" + req.file.filename, function(err) {
                                    if (err) {
                                        console.log(err);
                                    }
                                    console.log('done');
                                });
                            })
                            .on("err", function() {
                                res.send("Error uploading image")
                            })
                            .pipe(writestream);
                        data['image_url'] = '/' + req.file.originalname;
                    };
                    var activities = new Activities(data).save(function(err, savedObject) {
                        if (err) {
                            return res.json({
                                'status': "false",
                                'error': err
                            });
                        }
                        return res.json({
                            data: savedObject
                        });
                    });
                });
            }
        });
    });

});
router.post('/activities/geo', function(req, res) {
    console.log(req.body.category, req.body.address);
    if (req.body.category == null) {
        return res.json({
            'status': "false",
            'error': 'category is requested field'
        });
    };
    Category.findOne({
        name: req.body.category
    }, function(err, cat) {
        if (err) {
            res.json({
                'status': "false",
                'error': "category with provided name not found"
            });
        } else {
            wikiData(req.body.name, function(err, wikiresponse, obj) {
                if (err) {
                    return res.json({
                        'status': "false",
                        'error': err
                    });
                }
                obj = JSON.parse(obj);
                wiki = [];
                if (obj != null) {
                    for (i in obj.query.pages) {
                        wiki.push({
                            'title': obj.query.pages[i].title.split(' ').join('_'),
                            'url': "https://en.wikipedia.org/wiki/" + obj.query.pages[i].title.split(' ').join('_'),
                            'extract': obj.query.pages[i].extract
                        });
                    }
                }
                data = {
                    name: req.body.name,
                    category: cat,
                    tags: req.body.tags,
                    highlights: req.body.highlights,
                    duration: parseFloat(req.body.duration),
                    geo: req.body.geo,
                    attrs: req.body.attrs,
                    address: req.body.address,
                    operator: req.body.operator,
                    wiki: wiki
                }
                if (req.file != undefined) {
                    var writestream = gfs.createWriteStream({
                        filename: req.file.originalname
                    });
                    fs.createReadStream("./uploads/" + req.file.filename)
                        .on("end", function() {
                            fs.unlink("./uploads/" + req.file.filename, function(err) {
                                if (err) {
                                    console.log(err);
                                }
                                console.log('done');
                            });
                        })
                        .on("err", function() {
                            res.send("Error uploading image")
                        })
                        .pipe(writestream);
                    data['image_url'] = '/' + req.file.originalname;
                };
                var activities = new Activities(data).save(function(err, savedObject) {
                    if (err) {
                        return res.json({
                            'status': "false",
                            'error': err
                        });
                    }
                    return res.json({
                        'status': "success",
                        data: savedObject
                    });
                });
            });
        }
    });
});
ActivitiesRoute.put(function(req, res) {
    console.log(typeof(req.body._id));
    if (req.body.category != null) {
        Category.findOne({
            _id: req.body.category
        }, function(err, category) {
            console.log(err, category)
            if (err) {
                res.json({
                    'status': "false",
                    'error': err
                });
            }
            Activities.findOne({
                _id: req.body._id
            }, function(err, doc) {
                if (err) {
                    res.json({
                        'status': "false",
                        'error': err
                    });
                };
                console.log(err, doc)
                doc.name = req.body.name
                doc.discription = req.body.discription
                doc.category = category
                doc.tags = req.body.tags
                doc.highlights = req.body.highlights
                doc.geo = req.body.geo
                doc.attrs = req.body.attrs
                doc.address = req.body.address
                doc.wiki = req.body.wiki
                doc.rating = req.body.rating
                doc.operator = req.body.operator
                doc.time = req.body.time
                doc.duration = req.body.duration
                doc.image_url = req.body.image_url


                doc.save(function(err, savedObject) {
                    console.log(err, savedObject)
                    if (err) {
                        return res.json({
                            'status': 'false',
                            'error': err
                        });
                    }
                    return res.json({
                        'status': "true",
                        data: savedObject
                    });
                })

            });
        });
    }
});
router.delete('/activities/:id', function(req, res) {
    id = req.params.id;
    console.log(id)
    Activities.findOne({
        _id: id
    }, function(err, doc) {
        if (err) {
            res.json({
                'status': 'false',
                'error': err
            });
        }
        if (doc == null) {

            res.json({
                'status': 'false',
                'error': 'no such activity found'
            });

        } else {
            doc.remove(function(err) {
                if (err) {
                    res.json({
                        'status': 'false',
                        'error': err
                    });
                }
                doc.on('es-removed', function(err, res) {
                    if (err) {
                        res.json({
                            'status': 'false',
                            'error': err
                        });
                    } else {
                        res.json({
                            'status': 'success',
                            'message': 'successfully deleted'
                        });
                    }
                });
            });
        }
    });
});


//return router
module.exports = router;