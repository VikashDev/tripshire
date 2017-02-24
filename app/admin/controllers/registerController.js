(function() {
    angular.module('myApp').controller('registerController', registerController);
    registerController.$inject = ['$scope', '$location', 'Service'];

    function registerController($scope, $location, Service) {

    	var vm = this;
    	vm.registerForm = {
    		name: undefined,
    		email: undefined,
    		password: undefined
    	};

        vm.registerUser = registerUser;

        function registerUser() {

            // initial values
            vm.error = false;
            vm.disabled = true;

            // call register from service
            Service.register(vm.registerForm.name, vm.registerForm.email, vm.registerForm.password)
                // handle success
                .then(function() {
                    $location.path('/login');
                    vm.disabled = false;
                    vm.registerForm = {};
                })
                // handle error
                .catch(function() {
                    vm.error = true;
                    vm.errorMessage = 'Something went wrong!';
                    vm.disabled = false;
                    vm.registerForm = {};
                });

        }

    }

})();