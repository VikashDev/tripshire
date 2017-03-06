(function() {
    angular.module('page3', ['infinite-scroll', 'ngRoute']).config(routing);
    routing.$inject = ['$httpProvider', '$routeProvider'];
    console.log('Routes pg3');
    function routing($httpProvider, $routeProvider) {
    	 
    	console.log('routes pg3');
    }
})();