(function() {
    angular.module('apiApp').controller('singleCtrl', function($scope, Activities, $window) {
        console.log('Enter user');
        $scope.test = 'Hi test';
        $scope.data = '';
        $scope.cards = null;
        $scope.activities = new Activities();
        $scope.logger = function(ind) {
            var showable = $scope.activities.items[ind];
            console.log(showable);
            $window.localStorage.setItem('Selected', JSON.stringify(showable));
            $window.location.href = '/#!/page3';
        };

        console.log($scope.activities);
        $scope.SelectedPlace = JSON.parse($window.localStorage.getItem('Selected'));
        $scope.datax = JSON.stringify($scope.SelectedPlace);
        console.log($scope.cards);
    });
})();