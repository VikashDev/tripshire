(function() {
    angular.module('myApp').controller('logoutController', logoutController);
    logoutController.$inject = ['$scope', '$location', 'Service'];

    function logoutController($scope, $location, Service) {
        console.log('logout');
        // call logout from service
        Service.logout()
            .then(function() {
                $location.path('/login');
            });

    }
})();