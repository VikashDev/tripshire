//dependencies
var express=require('express');
    path=require('path');
    favicon = require('serve-favicon');
    logger = require('morgan');
    cookieParser = require('cookie-parser');
    bodyParser=require('body-parser');
    mongoose=require('mongoose');
    multer=require('multer');
    passport = require('passport');
    cors = require('cors');
    morgan = require('morgan');
    domain=require('domain').create();
    routes = require('./server/routes');
    config = require('./config');
    compression = require('compression');
    suggest = require('./server/routes/suggestEditroute.js');
var crypto = require('crypto');

var generate_key = function() {
    var sha = crypto.createHash('sha256');
    sha.update(Math.random().toString());
    return sha.digest('hex');
};
//variable
// mongodb://james:james@ds139278.mlab.com:39278/tripshire
var mlab_url="mongodb://tripshire:tripshire@ds157248.mlab.com:57248/tripshire";
    port= process.env.PORT || 2000;
var app=express();

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

app.set('views', __dirname + '/views');
app.set('view engine', 'jade');
app.set('view options', {
  layout: false
});

app.use(express.static(path.join(__dirname, '/app')));
app.locals.config = config;
app.use(require('express-session')({
    secret: "tripshiresecretkey",
    resave: false,
    saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());
//mongodb setup
domain.on('error', function(er) {
    console.log('mongoose DB down');
});

domain.run(function() {
  mongoose.connect(mlab_url)
  .then(() =>  console.log('mlab connection succesful'));
  mongoose.Promise = global.Promise;
});
// Handler in case Mongo  goes down
app.use(function(req, res, next) {
  // We lost connection!
  if (1 !== mongoose.connection.readyState) {

    // Reconnect if we can
    mongoose.connect(mlab_url)
      .then(() =>  console.log('mlab connection succesful'))
      .catch((err) => console.error(err));
    res.status(503);
    throw new Error('Mongo not available');
  }
  next();

});


// app.use('/app', compression());
app.use('/',compression());
app.use('/node_modules',compression());
// app.use('/app', compression());



//**routing**//
app.use(morgan("dev"));
app.use('/',express.static(__dirname+'/public'));
app.use('/node_modules',express.static(__dirname+'/node_modules'));
app.use('/uploads', express.static(__dirname + '/uploads'));
app.use('/app', express.static(__dirname + '/app/admin/dist'));

// app.use('/', suggest);
app.get('/admin',function(req,res){
  app.use('/admin',compression());
    res.sendFile(path.join(__dirname, '/app/admin', 'index.html'));
});

app.get('/feedsPage', function(req, res){
  res.sendFile(path.join(__dirname, '/views', 'homepage_sample.html'));
}); 

routes.init(app);
app.use('/v1/api',require('./server/routes/api.js'));
app.use('/suggest', require('./server/routes/suggestEditroute.js'));
var feedPageApi=require("./feedPage.js");
app.use('/feeds',feedPageApi);

app.listen(port,function(){
    console.log("tripshire running on port", port);
});
