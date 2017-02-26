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
        Admin.findOne({
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
    callbackURL: '/google_callback',
    passReqToCallback: true
}, function(request, accessToken, refreshToken, profile, callback) {
    // console.log(accessToken, refreshToken, profile);
    process.nextTick(function() {
        // return done(null, profile);

        console.log(profile);
        // return done(null, profile);


        User.findOne({
                email: profile.id
            },
            function(err, docs) {
                if (err) {
                    return callback(err);
                }

                if (!docs) {
                    // return callback(null, false);
                    user = new User({
                        // name: profile.displayName,
                        // email: profile._json.email,
                        // provider: 'Google',
                        // oauthID: profile.id


                    });
                    user.save(function(err, result) {
                        if (err) {
                            return callback(err);
                        } else {
                            console.log(result);
                        }
                    });
                } else {
                    return callback(null, docs);
                }


            });

    });
}));

passport.use(new FacebookStrategy({
        clientID: '1444023985609454',
        clientSecret: '269912475fd3d1a7c1c541c976530421',
        callbackURL: '/suggest/fb_callback',
        passReqToCallback: true,
        profileFields: ['id', 'emails', 'name', 'displayName']
    },
    function(request, accessToken, refreshToken, profile, callback) {
        // console.log(accessToken, refreshToken, profile);
        process.nextTick(function() {
            // console.log(profile);
            // return done(null, profile);

            User.findOne({
                    email: profile.id
                },
                function(err, docs) {
                    if (err) {
                        return callback(err);
                    }

                    if (!docs) {
                        // return callback(null, false);
                        user = new User({
                            name: profile.displayName,
                            email: profile._json.email,
                            provider: 'Facebook',
                            oauthID: profile.id

                        });
                        user.save(function(err, result) {
                            if (err) {
                                return callback(err);
                            } else {
                                console.log(result);
                            }
                        });
                    } else {
                        return callback(null, docs);
                    }


                });

        });
    }
));

passport.serializeUser(function(user, done) {
    console.log('Serialize', user);
    done(null, user.id);
});
// used to deserialize the user
passport.deserializeUser(function(id, done) {
    console.log('deserialize', id);
    Admin.findOne({
        email: id
    }, function(err, user) {
        done(err, user);
    });
});

exports.isAuthenticated = passport.authenticate('local');