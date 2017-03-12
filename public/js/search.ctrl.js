(function() {
    angular.module('apiApp').
    controller('searchCtrl', function($scope, $routeParams, $http) {
        console.log($routeParams.place);
        $http.get(' http://ec2-34-207-122-89.compute-1.amazonaws.com:6556/?string=' + $routeParams.place)
        	.then(function success(response) {
        		console.log(response);
        }, function error(err){
        	console.log(err);
        });
    });
})();