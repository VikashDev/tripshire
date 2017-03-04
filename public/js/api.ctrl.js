angular.module('apiApp').controller('apiCtrl', ($scope, $http, dataFactory, Activities, $location) => {

    $scope.data = '';
    $scope.cards = null;
    $scope.activities = new Activities();

    console.log($scope.cards);

});