var Admin = require('../models/admin');
var User = require('../models/user');
var passport = require('passport');

// Create endpoint /api/admin for POST
exports.postAdmin = function(req, res) {
    var user = new User({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
        provider: 'Local'
    });
    console.log(req.body.name);
    user.save(function(err, result) {
        if (err) {
            return res.json({
                'status': "false",
                'error': err
            });
        } else {
            console.log("no error");
            req.logIn(result, function(err) {
                if (err) {
                    console.log(err);
                    return res.status(500).json({
                        'error': err,
                        success: false
                    });
                }
            });
            res.status(200).json({
                status: 'successfully added',
                success: true,
                user: req.user
            });
        }
    });
};

// Create endpoint /api/users for GET
exports.getAdmin = function(req, res) {
    User.find(function(err, docs) {
        if (err)
            res.send(err);

        res.json(docs);
    });
};

exports.login = function(req, res, next) {
    passport.authenticate('local', function(err, user, info) {
        if (err) {
            return next(err);
        }
        console.log(user);
        if (!user) {
            return res.status(401).json({
                err: info
            });
        }
        req.logIn(user, function(err) {
            if (err) {
                console.log(err);
                return res.status(500).json({
                    'error': err,
                    success: false
                });
            }
            res.status(200).json({
                status: 'Login successful!',
                success: true,
                user: req.user
            });
        });
    })(req, res, next);
};