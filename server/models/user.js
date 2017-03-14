var mongoose = require('mongoose');
var Activities = require('./activities');

var Schema = mongoose.Schema;
var bcrypt = require('bcrypt-nodejs');


var UserSchema = new Schema({

    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        lowercase: true,
        index: {
            unique: true
        }
    },
    password: {
        type: String,
        select: true
    },
    created_at: {
        type: Date,
        default: Date.now
    },
    isAdmin: {
        type: Boolean,
        default: false
    },
    provider: {
        type: String
    },
    oauthID: {
        type: String,
        index: {
            unique: true
        }
    },
    accessToken: {
        type: String,
        index: {
            unique: true
        }
    },
    social_Links: {
        type: [String]
    },
    profilePic: {
        type: String
    },
    coverPic: {
        type: [Buffer]
    },
    notifications: {
        type: [String]
    },
    followers: {
        type: [String]
    },
    following: {
        type: [String]
    },
    cards: {
        type: Array,
        ref: 'Activities'
    },
    dateOfBirth: {
        type: Date,
        require: true
    },
    location: {
        country: {
            type: String
        }
    },
    votes: {
        up: {
            type: Number,
            default: 0
        },
        down: {
            type: Number,
            default: 0
        }
    }


});


//password hashing
UserSchema.pre('save', function(next) {

    var user = this;

    if (!user.isModified('password')) return next();

    bcrypt.hash(user.password, null, null, function(err, hash) {

        if (err) return (err);

        user.password = hash;
        next();
    });
});


//method to compare password
UserSchema.methods.verifyPassword = function(password, cb) {
    bcrypt.compare(password, this.password, function(err, isMatch) {
        if (err) return cb(err);
        cb(null, isMatch);
    });
};




module.exports = mongoose.model('User', UserSchema);