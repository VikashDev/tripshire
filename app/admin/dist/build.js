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
/******/ 	return __webpack_require__(__webpack_require__.s = 7);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
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
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(0)(__webpack_require__(4))

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(0)(__webpack_require__(5))

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(0)(__webpack_require__(6))

/***/ }),
/* 4 */
/***/ (function(module, exports) {

module.exports = "angular.module('myApp').controller('loginController',\n  ['$scope', '$location', 'Service',\n  function ($scope, $location, Service) {\n\n    $scope.login = function () {\n      // initial values\n      $scope.error = false;\n      $scope.disabled = true;\n\n      // call login from service\n      Service.login($scope.loginForm.email, $scope.loginForm.password)\n        // handle success\n        .then(function () {\n          $location.path('/');\n          $scope.disabled = false;\n          $scope.loginForm = {};\n        })\n        // handle error\n        .catch(function () {\n          $scope.error = true;\n          $scope.errorMessage = \"Invalid email and/or password\";\n          $scope.disabled = false;\n          $scope.loginForm = {};\n        });\n\n    };\n\n}]);\nangular.module('myApp').controller('logoutController',\n  ['$scope', '$location', 'Service',\n  function ($scope, $location, Service) {\n\n    console.log('logout')\n    // call logout from service\n    Service.logout()\n      .then(function () {\n        $location.path('/login');\n      });\n\n}]);\nangular.module('myApp').controller('editController',\n  ['$scope', '$location', 'Service','$routeParams',\n  function ($scope, $location, Service,$routeParams) {\n    $scope.error=false;\n    $scope.errorMessage=[];\n    $scope.category=null;\n    $scope.activityid=$routeParams.id;\n    console.log($routeParams)\n\n    $scope.activity=Service.getActivity($scope.activityid).then(function(response){\n      console.log(response.data.data);\n      $scope.processing=false;\n      $scope.activity=response.data.data;\n    })\n    $scope.categories=Service.getCategories().then(function(response){\n      console.log(response.data.data);\n      $scope.processing=false;\n      $scope.categories=response.data.data;\n    })\n    $scope.addhighlights=function(value){\n\n      $scope.activity.highlights.push(value)\n      $scope.value=\"\"\n    }\n    $scope.addoperator=function(value){\n      $scope.activity.operator.push(value)\n      $scope.opvalue={}\n    }\n    $scope.addtags=function(tagvalue){\n      $scope.activity.tags.push(tagvalue)\n      $scope.tagvalue=\"\"\n    }\n    $scope.removeTag=function(value){\n      console.log(value);\n      var index=$scope.activity.tags.indexOf(value);\n      $scope.activity.tags.splice(index, 1);\n    }\n    $scope.removeHighlights=function(value){\n      console.log(value);\n      var index=$scope.activity.highlights.indexOf(value);\n      $scope.activity.highlights.splice(index, 1);\n    }\n    $scope.addattrs=function(attrs){\n      $scope.activity.attrs.push(attrs)\n      $scope.attrs=\"\"\n    }\n    $scope.editActivity=function(data){\n      Service.putActivities(data,function(res){\n        console.log(res.status)\n        if(res.status==\"false\"){\n          console.log(res.status,\"false\")\n          $scope.errorMessage=res.error;\n        }else{\n                    console.log(res.status,\"true\")\n            $location.path('/')\n        }\n      });\n    }\n    $scope.deleteActivity=function(){\n      Service.deleteActivity($scope.activityid,function(res){\n        if(res.status=\"false\"){\n          $scope.errorMessage=res.error;\n        }else{\n            $location.path('/')\n        }\n      });\n    }\n\n}]);\nangular.module('myApp').controller('mainController',\n  ['$scope', '$location', 'Service',\n  function ($scope, $location, Service) {\n\n      $scope.error=false;\n      $scope.processing=true;\n      $scope.errorMessage=[];\n      $scope.selected_category=null;\n      $scope.activities=[];\n      $scope.new_activity={};\n      $scope.new_activity.highlights=[];\n      $scope.new_activity.tags=[];\n      $scope.new_activity.operator=[];\n      $scope.new_activity.attrs=[];\n      $scope.new_activity.geo=[];\n      $scope.selected_category=null;\n      $scope.categories=Service.getCategories().then(function(response){\n        console.log(response.data.data);\n        $scope.processing=false;\n        $scope.categories=response.data.data;\n      })\n      $scope.getActivities=function(category){\n        console.log(category)\n        $scope.processing=true;\n        $scope.activities=Service.getActivities(category).then(function(response){\n          console.log(response.data.data);\n          $scope.activities=response.data.data;\n          $scope.processing=false;\n        })\n      }\n      $scope.editCategory=function(id){\n        console.log(id);\n      }\n      $scope.addhighlights=function(value){\n        if(value!=null && value!=\"\"){\n          $scope.new_activity.highlights.push(value)\n          $scope.value=\"\"\n        }\n      }\n      $scope.addoperator=function(value){\n        if(value!=null){\n          $scope.new_activity.operator.push(value)\n          $scope.opvalue={}\n        }\n      }\n\n      $scope.addtags=function(tagvalue){\n        if(tagvalue!=null && tagvalue!=\"\"){\n          $scope.new_activity.tags.push(tagvalue)\n          $scope.tagvalue=\"\"\n        }\n      }\n      $scope.addattrs=function(attrs){\n        $scope.new_activity.attrs.push(attrs)\n        $scope.attrs=\"\"\n      }\n      $scope.addActivity=function(data){\n        var latitute=document.getElementById('lat').value;\n        var longitude=document.getElementById('long').value;\n        if(latitute!=null && data.geo.length<2 && latitute!=\"\" && longitude!=\"\" &&longitude!=null){\n          data.geo.push(latitute);\n          data.geo.push(longitude);\n          data.address=document.getElementById('address').value\n          console.log(data.address)\n        }\n        Service.postActivity(data,function(res){\n          console.log(res);\n          if(res.status==\"false\"){\n            console.log(\"false\")\n            $scope.errorMessage=\"some problem with activity value inserted\";\n            $location.path('/')\n          }else{\n            $location.path('/')\n          }\n        })\n      }\n      $scope.addCategory=function(data){\n        $scope.error = false;\n        console.log(data);\n        Service.postCategory(data.name,data.discription, data.parent,function (result) {\n          if(result.status==\"false\" || result.status==false){\n            console.log(result.error);\n            $scope.errorMessage=result.error\n          }else\n            {\n              console.log(result)\n              $location.path('/');\n              $scope.new_category = {};\n            }\n\n        })\n        .catch(function () {\n          $scope.error = true;\n          $scope.errorMessage = \"Something went wrong!\";\n          $scope.registerForm = {};\n        });\n      };\n      $scope.logout = function () {\n        console.log('logout')\n        // call logout from service\n        Service.logout()\n          .then(function () {\n            $location.path('/login');\n          });\n\n      };\n      $scope.uploadFile = function(){\n              var category= $scope.category;\n               var file = $scope.myFile;\n\n               Service.csvUpload(category,$scope.myFile,function(res){\n                 console.log(res.status,res['status'])\n                 if(res['status']=='false'){\n                    $scope.errorMessage=res['message']\n                 }else{\n                   console.log(res)\n                   $location.path('/')\n               }\n               })\n              //  $scope.upload($scope.myFile,category);\n            };\n}]);\n\nangular.module('myApp').controller('registerController',\n  ['$scope', '$location', 'Service',\n  function ($scope, $location, Service) {\n\n    $scope.register = function () {\n\n      // initial values\n      $scope.error = false;\n      $scope.disabled = true;\n\n      // call register from service\n      Service.register($scope.registerForm.name,$scope.registerForm.email, $scope.registerForm.password)\n        // handle success\n        .then(function () {\n          $location.path('/login');\n          $scope.disabled = false;\n          $scope.registerForm = {};\n        })\n        // handle error\n        .catch(function () {\n          $scope.error = true;\n          $scope.errorMessage = \"Something went wrong!\";\n          $scope.disabled = false;\n          $scope.registerForm = {};\n        });\n\n    };\n\n}]);\n"

/***/ }),
/* 5 */
/***/ (function(module, exports) {

module.exports = "var myApp = angular.module('myApp', ['ngRoute']);\n\nmyApp.config(function ($routeProvider) {\n  $routeProvider\n    // .when('/', {\n    //   templateUrl: 'partials/home.html',\n    //   constroller: 'mainController',\n    //   access: {restricted: true}\n    // })\n    .when('/login', {\n      templateUrl: 'partials/login.html',\n      controller: 'loginController',\n      access: {restricted: false}\n    })\n    .when('/logout', {\n      controller: 'logoutController',\n      templateUrl: 'partials/logout.html'\n    })\n    .when('/register', {\n      templateUrl: 'partials/register.html',\n      controller: 'registerController',\n      access: {restricted: false}\n    })\n    .when('/', {\n      templateUrl: 'partials/home.html',\n      controller: 'mainController',\n      access: {restricted: true}\n    })\n    .when('/categories/add', {\n      templateUrl: 'partials/addcategory.html',\n      controller: 'mainController',\n      access: {restricted: true}\n    })\n    .when('/activities/add', {\n      templateUrl: 'partials/addactivity.html',\n      controller: 'mainController',\n      access: {restricted: true}\n    })\n    .when('/categories/edit', {\n      templateUrl: 'partials/editcategory.html',\n      controller: 'editController',\n      access: {restricted: true}\n    })\n    .when('/activities/:id', {\n      templateUrl: 'partials/editactivity.html',\n      controller: 'editController',\n      access: {restricted: true}\n    })\n    .when('/csv', {\n      templateUrl: 'partials/csvupload.html',\n      controller: 'mainController',\n      access: {restricted: true}\n    })\n    .otherwise({\n      redirectTo: '/'\n    });\n});\nmyApp.directive('fileModel', ['$parse', function ($parse) {\n           return {\n              restrict: 'A',\n              link: function(scope, element, attrs) {\n                 var model = $parse(attrs.fileModel);\n                 var modelSetter = model.assign;\n\n                 element.bind('change', function(){\n                    scope.$apply(function(){\n                       modelSetter(scope, element[0].files[0]);\n                    });\n                 });\n              }\n           };\n        }]);\nmyApp.run(function ($rootScope, $location, $route, Service) {\n  $rootScope.$on('$routeChangeStart',\n    function (event, next, current) {\n      Service.getUserStatus()\n      .then(function(){\n        if (next.access.restricted && !Service.isLoggedIn()){\n          $location.path('/login');\n          $route.reload();\n        }\n      });\n  });\n});\n"

/***/ }),
/* 6 */
/***/ (function(module, exports) {

module.exports = "angular.module('myApp').factory('Service',\n  ['$q', '$timeout', '$http',\n  function ($q, $timeout, $http) {\n\n    var user = null;\n\n    return ({\n      isLoggedIn: isLoggedIn,\n      getUserStatus: getUserStatus,\n      login: login,\n      logout: logout,\n      register: register,\n      getCategories: getCategories,\n      getActivities:getActivities,\n      postCategory:postCategory,\n      postActivity:postActivity,\n      deleteActivity:deleteActivity,\n      csvUpload:csvUpload,\n      getActivity:getActivity,\n      putActivities:putActivities\n    });\n    function getCategories() {\n      return $http.get('/v1/api/categories/all')\n      .success(function(response) {\n        console.log(\"coming from servicejs\", response.data);\n        return response.data;\n      })\n  }\n  function postCategory(name,discription,parent,callback){\n      // create a new instance of deferred\n      // send a post request to the server\n      $http.post('/v1/api/categories',\n        {name:name,parent: parent, discription: discription})\n        // handle success\n        .success(function (res) {\n            callback(res)\n  });\n};\nfunction deleteActivity(id,callback){\n\n    $http.delete('/v1/api/activities/'+id)\n      .success(function (res) {\n           callback(res);\n         })\n};\nfunction postActivity(data,callback){\n  $http.post('/v1/api/activities/geo',\n  data)\n    // handle success\n    .success(function (res) {\n      callback(res);\n});\n};\nfunction csvUpload(category,file,callback){\n    var fd = new FormData();\n    fd.append('file', file);\n    fd.append('category',category)\n  $http.post('/v1/api/upload_csv', fd, {\n             transformRequest: angular.identity,\n             headers: {'Content-Type': undefined}\n          })\n  .success(function (data, status) {\n    if(status === 200){\n      callback(data,status)\n    };\n})\n}\n  function putCategory(name,discription,parent,callback){\n\n      $http.put('/v1/api/categories',\n        {name:name,parent: parent, discription: discription})\n        // handle success\n        .success(function (res) {\n            callback(res)\n        });\n  }\n  function putActivities(data,callback){\n    var deferred = $q.defer();\n    $http.put('/v1/api/activities',data)\n    .success(function(res){\n      callback(res)\n    })\n\n}\n  function getActivities(category) {\n      return $http.get('/v1/api/activities/filter/categories?key='+category)\n      .success(function(response) {\n        console.log(\"coming from servicejs\", response.data);\n        return response.data;\n      })\n  }\n  function getActivity(id) {\n      return $http.get('/v1/api/activities/'+id)\n      .success(function(response) {\n        console.log(\"activity\", response.data);\n        return response.data;\n      })\n  }\n    function isLoggedIn() {\n      if(user) {\n        return true;\n      } else {\n        return false;\n      }\n    }\n\n    function getUserStatus() {\n      return $http.get('/v1/api/admin/status')\n      // handle success\n      .success(function (data) {\n        if(data.status){\n          user = true;\n        } else {\n          user = false;\n        }\n      })\n      // handle error\n      .error(function (data) {\n        user = false;\n      });\n    }\n\n    function login(email, password) {\n\n      // create a new instance of deferred\n      var deferred = $q.defer();\n\n      // send a post request to the server\n      $http.post('/v1/api/admin/login',\n        {email: email, password: password})\n        // handle success\n        .success(function (data, status) {\n          if(status === 200 && data.status){\n            user = true;\n            deferred.resolve();\n          } else {\n            user = false;\n            deferred.reject();\n          }\n        })\n        // handle error\n        .error(function (data) {\n          user = false;\n          deferred.reject();\n        });\n\n      // return promise object\n      return deferred.promise;\n\n    }\n\n    function logout() {\n\n      // create a new instance of deferred\n      var deferred = $q.defer();\n\n      // send a get request to the server\n      $http.get('/v1/api/admin/logout')\n        // handle success\n        .success(function (data) {\n          user = false;\n          deferred.resolve();\n        })\n        // handle error\n        .error(function (data) {\n          user = false;\n          deferred.reject();\n        });\n\n      // return promise object\n      return deferred.promise;\n\n    }\n\n    function register(name,email, password) {\n\n      var deferred = $q.defer();\n\n      $http.post('/v1/api/admin',\n        {name:name,email: email, password: password})\n        .success(function (data, status) {\n          if(status === 200 && data.status){\n            deferred.resolve();\n          } else {\n            deferred.reject();\n          }\n        })\n        .error(function (data) {\n          deferred.reject();\n        });\n      return deferred.promise;\n    }\n}]);\n"

/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(2);
__webpack_require__(3);
module.exports = __webpack_require__(1);


/***/ })
/******/ ]);