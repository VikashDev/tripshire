(function(){
	angular.module('tripshire').
		controller('homeController', homeController);
	homeController.$inject = ['$scope'];

	function homeController() {
		var vm = this;
		vm.test = 'Hello';
	}
})();