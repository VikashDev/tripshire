/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.l = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };

/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};

/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};

/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 2);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports) {

module.exports = "//dependencies\nvar express=require('express');\n    path=require('path');\n    favicon = require('serve-favicon');\n    logger = require('morgan');\n    cookieParser = require('cookie-parser');\n    bodyParser=require('body-parser');\n    mongoose=require('mongoose');\n    multer=require('multer');\n    passport = require('passport');\n    cors = require('cors');\n    morgan = require('morgan');\n    domain=require('domain').create();\n    routes = require('./server/routes');\n    config = require('./config');\nvar crypto = require('crypto');\n\nvar generate_key = function() {\n    var sha = crypto.createHash('sha256');\n    sha.update(Math.random().toString());\n    return sha.digest('hex');\n};\n//variable\n// mongodb://james:james@ds139278.mlab.com:39278/tripshire\nvar mlab_url=\"mongodb://tripshire:tripshire@ds157248.mlab.com:57248/tripshire\";\n    port= process.env.PORT || 2000;\nvar app=express();\n\napp.use(bodyParser.urlencoded({extended: true}));\napp.use(bodyParser.json());\n\napp.set('views', __dirname + '/views');\napp.set('view engine', 'jade');\napp.set('view options', {\n  layout: false\n});\n\napp.use(express.static(path.join(__dirname, '/app')));\napp.locals.config = config;\napp.use(require('express-session')({\n    secret: \"tripshiresecretkey\",\n    resave: false,\n    saveUninitialized: false\n}));\napp.use(passport.initialize());\napp.use(passport.session());\n//mongodb setup\ndomain.on('error', function(er) {\n    console.log('mongoose DB down');\n});\n\ndomain.run(function() {\n  mongoose.connect(mlab_url)\n  .then(() =>  console.log('mlab connection succesful'));\n  mongoose.Promise = global.Promise;\n});\n// Handler in case Mongo  goes down\napp.use(function(req, res, next) {\n  // We lost connection!\n  if (1 !== mongoose.connection.readyState) {\n\n    // Reconnect if we can\n    mongoose.connect(mlab_url)\n      .then(() =>  console.log('mlab connection succesful'))\n      .catch((err) => console.error(err));\n    res.status(503);\n    throw new Error('Mongo not available');\n  }\n  next();\n\n});\n\n\n//**routing**//\napp.use(morgan(\"dev\"));\napp.use('/',express.static(__dirname+'/public'));\napp.use('/node_modules',express.static(__dirname+'/node_modules'));\napp.use('/uploads', express.static(__dirname + '/uploads'));\n\napp.get('/admin',function(req,res){\n    res.sendFile(path.join(__dirname, '/app/admin', 'index.html'));\n});\nroutes.init(app);\napp.use('/v1/api',require('./server/routes/api.js'));\n\n\napp.listen(port,function(){\n    console.log(\"tripshire running on port\", port);\n});\n"

/***/ }),
/* 1 */
/***/ (function(module, exports) {

/*
	MIT License http://www.opensource.org/licenses/mit-license.php
	Author Tobias Koppers @sokra
*/
module.exports = function(src) {
	if (typeof execScript !== "undefined")
		execScript(src);
	else
		eval.call(null, src);
}


/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(1)(__webpack_require__(0))

/***/ })
/******/ ]);