angular.module('apiApp').controller('apiCtrl', ($scope,$rootScope, $http, dataFactory, Activities, $location, $window) => {

    $scope.data = '';
    $scope.cards = null;
    $scope.activities = new Activities();
    $scope.logger = function(ind){
    	$rootScope.showable = $scope.activities.items[ind];
    		console.log($rootScope.showable);
    		$window.localStorage.setItem('Selected',JSON.stringify($rootScope.showable));
    	       $window.location.href = '/page3';
    }
    console.log($scope.cards);

});