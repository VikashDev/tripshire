var passport = require('passport');
var localStrategy = require('passport-local').Strategy;
var GoogleStrategy = require('passport-google-oauth2').Strategy;
var FacebookStrategy = require('passport-facebook').Strategy;
var Admin = require('../models/admin');
var User = require('../models/user');
var config = require('../../config/config_auth.js');
var mongoose = require('mongoose');
passport.use(new localStrategy({
        usernameField: 'email',
        session: true

    },
    function(username, password, callback) {
        User.findOne({
                email: username
            },
            function(err, docs) {
                if (err) {
                    return callback(err);
                }

                if (!docs) {
                    return callback(null, false);
                }

                // Make sure the password is correct
                docs.verifyPassword(password, function(err, isMatch) {
                    if (err) {
                        return callback(err);
                    }

                    // Password did not match
                    if (!isMatch) {
                        return callback(null, false);
                    }

                    // Success
                    return callback(null, docs);
                });
            });
    }
));

passport.use(new GoogleStrategy({
    clientID: config.google.clientId,
    clientSecret: config.google.clientSecret,
    callbackURL: config.google.callBackURL,
    passReqToCallback: true
}, function(accessToken, refreshToken, profile, done) {
    console.log(accessToken, refreshToken, profile);
    process.nextTick(function() {
        return done(null, profile);
    });
}));

passport.use(new FacebookStrategy({
        clientID: 'c222791594791421',
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

passport.serializeUser(function(user, done) {
    console.log(user.email);
    done(null, user.email);
});
// used to deserialize the user
passport.deserializeUser(function(id, done) {
    Admin.findOne({
        email: id
    }, function(err, user) {
        done(err, user);
    });
});

exports.isAuthenticated = passport.authenticate('local');