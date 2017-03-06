(function() {
    angular.module('apiApp', ['infinite-scroll', 'ngRoute']).config(routing);
    routing.$inject = ['$httpProvider', '$routeProvider'];
    console.log('Routes');
    function routing($httpProvider, $routeProvider) {
    	$routeProvider
    	.when("/page3", {
       	 templateUrl : "/views/view.html"
   		 })
    	console.log('Routes imp');
    }
})();