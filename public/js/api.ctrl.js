apiApp.controller('apiCtrl', ($scope, $http, dataFactory) => {

		$scope.data = '';
		$scope.cards = null;

		dataFactory.apiData().then((res) => {
			$scope.cards = res.data.data;
			console.log(res.data);
		}, (err) => {
			console.log(err); 
		});

		// dataFactory.facebook();
		console.log($scope.cards)

});