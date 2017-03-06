angular.module('page3').controller('page3Ctrl', ($scope,$rootScope, $http, dataFactory, Activities, $location, $window) => {

    $scope.data = '';
    $scope.cards = null;
    $scope.activities = new Activities();
    console.log($scope.activities);
    $scope.SelectedPlace = JSON.parse($window.localStorage.getItem('Selected'));
    $scope.datax = JSON.stringify( $scope.SelectedPlace);
    console.log($scope.cards);

});