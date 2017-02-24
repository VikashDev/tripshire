var Admin = require('../models/admin');
var passport = require('passport');

// Create endpoint /api/admin for POST
exports.postAdmin = function(req, res) {
  var admin = new Admin({
    name: req.body.name,
    email: req.body.email,
    password: req.body.password
  });
  console.log(req.body.name);
  admin.save(function(err) {
    if (err){
      return res.json({'status':"false",'error':err});
    }
    console.log("no error");
    res.status(200).json({ status:'successfully added' });
  });
};

// Create endpoint /api/users for GET
exports.getAdmin = function(req, res) {
  Admin.find(function(err, docs) {
    if (err)
      res.send(err);

    res.json(docs);
  });
};

exports.login =  function(req, res, next) {
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
          'error':err
        });
      }
      res.status(200).json({
        status: 'Login successful!'
      });
    });
  })(req, res, next);
};