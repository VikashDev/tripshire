(function() {
    angular.module('apiApp').controller('profileCtrl', function($scope, $http, $window, $routeParams) {
        console.log('Profile Controller');
        var id = $window.localStorage.user;
        $scope.user = undefined;
        $http.get('/user/getById/'+id).then(function success(response){
        	console.log(response);
        	$scope.user = response.data.user;
        	$scope.followers = $scope.user.followers.length;
        	$scope.following = $scope.user.following.length;
        }, function error(err){
        	console.log(err);
        });
    });
})();