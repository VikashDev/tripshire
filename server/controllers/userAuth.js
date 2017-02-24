var passport = require('passport');
var GoogleStrategy = require('passport-google').Strategy;
var config = require('../../config/config_auth.js');
var User = require('../models/user.js');

passport.use(new localStrategy({

}, function(username, passward, callback) {
    User.findOne({
        email: username
    }, function(err, docs) {
        if (err) {
            callback(err);
        }
        if (!docs) {
            callback(null, false);
        }

        docs.verifyPassword(passward, function(err, isMatch) {
            if (err) {
                callback(err);
            } else {
                if (!isMatch) {
                    callback(null, false);
                } else {
                    callback(null, docs);
                }
            }
        });
    });
}));



passport.use(new GoogleStrategy({
    clientID: config.google.clientId,
    clientSecret: config.google.clientSecret,
    callbackURL: config.google.callBackURL,
    passReqToCallback: true
}, function(accessToken, refreshToken, profile, done) {
    console.log(accessToken, refreshToken, profile);
    process.nextTick(function() {

    });
}));

passport.use(new FacebookStrategy({
        clientID: config.facebook.clientID,
        clientSecret: config.facebook.clientSecret,
        callbackURL: config.facebook.callBackURL
    },
    function(accessToken, refreshToken, profile, done) {
        console.log(accessToken, refreshToken, profile);
        process.nextTick(function() {
            // return done(null, profile);
        });
    }
));



module.exports = startegy;