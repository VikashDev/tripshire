(function() {
    angular.module('myApp').controller('loginController', loginController);

    loginController.$inject = ['$scope', '$location', 'Service'];

    function loginController($scope, $location, Service) {
        var vm = this;
        vm.loginForm = {
            email: undefined,
            password: undefined
        };

        vm.loginUser = loginUser;

        function loginUser() {
            // initial values
            vm.error = false;
            vm.disabled = true;

            // call login from service
            Service.login(vm.loginForm.email, vm.loginForm.password)
                // handle success
                .then(function() {
                    $location.path('/');
                    vm.disabled = false;
                    vm.loginForm = {};
                })
                // handle error
                .catch(function() {
                    vm.error = true;
                    vm.errorMessage = 'Invalid email and/or password';
                    vm.disabled = false;
                    vm.loginForm = {};
                });

        }

    }


})();