var myApp = angular.module('myApp', ['ngRoute']);

myApp.config(function ($routeProvider) {
  $routeProvider
    // .when('/', {
    //   templateUrl: 'partials/home.html',
    //   constroller: 'mainController',
    //   access: {restricted: true}
    // })
    .when('/login', {
      templateUrl: 'partials/login.html',
      controller: 'loginController',
      controllerAs: 'login',
      access: {restricted: false}
    })
    .when('/logout', {
      controller: 'logoutController',
      templateUrl: 'partials/logout.html'
    })
    .when('/register', {
      templateUrl: 'partials/register.html',
      controller: 'registerController',
      controllerAs: 'register',
      access: {restricted: false}
    })
    .when('/', {
      templateUrl: 'partials/home.html',
      controller: 'mainController',
      controllerAs: 'main',
      access: {restricted: true}
    })
    .when('/categories/add', {
      templateUrl: 'partials/addcategory.html',
      controller: 'mainController',
      controllerAs: 'main',
      access: {restricted: true}
    })
    .when('/activities/add', {
      templateUrl: 'partials/addactivity.html',
      controller: 'mainController',
      controllerAs: 'main',
      access: {restricted: true}
    })
    .when('/categories/edit', {
      templateUrl: 'partials/editcategory.html',
      controller: 'editController',
      controllerAs: 'edit',
      access: {restricted: true}
    })
    .when('/activities/:id', {
      templateUrl: 'partials/editactivity.html',
      controller: 'editController',
      controllerAs: 'edit',
      access: {restricted: true}
    })
    .when('/csv', {
      templateUrl: 'partials/csvupload.html',
      controller: 'mainController',
      controllerAs: 'main',
      access: {restricted: true}
    })
    .otherwise({
      redirectTo: '/'
    });
});
myApp.directive('fileModel', ['$parse', function ($parse) {
           return {
              restrict: 'A',
              link: function(scope, element, attrs) {
                 var model = $parse(attrs.fileModel);
                 var modelSetter = model.assign;

                 element.bind('change', function(){
                    scope.$apply(function(){
                       modelSetter(scope, element[0].files[0]);
                    });
                 });
              }
           };
        }]);
myApp.run(function ($rootScope, $location, $route, Service) {
  $rootScope.$on('$routeChangeStart',
    function (event, next, current) {
      Service.getUserStatus()
      .then(function(){
        if (next.access.restricted && !Service.isLoggedIn()){
          $location.path('/login');
          $route.reload();
        }
      });
  });
  console.log('running');
});
