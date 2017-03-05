(function() {
    angular.module('apiApp', ['infinite-scroll', 'ngRoute']).config(routing);
    routing.$inject = ['$httpProvider', '$routeProvider'];
    console.log('Routes');
    function routing($httpProvider, $routeProvider) {
    	console.log('Routes');
    }
})();