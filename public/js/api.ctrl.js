apiApp.controller('apiCtrl', ($scope, $http, dataFactory, Activities) => {

    $scope.data = '';
    $scope.cards = null;
    // $scope.googleUser = googleUser;
    // 	console.log('Hello');
    // });

    $scope.activities = new Activities();
    // dataFactory.apiData().then((res) => {
    // 	console.log(res);
    //     $scope.busy = false;
    //     $scope.after = null;
    //     $scope.cards = res.data.data;
    //     console.log(res.data);
    //     $scope.loadMore = function() {
    //         var last = $scope.cards[$scope.cards.length - 1];
    //         for (var i = 1; i <= 8; i++) {
    //             $scope.cards.push(last + i);
    //         }
    //     };
    // }, (err) => {
    //     console.log(err);
    // });



    console.log($scope.cards);

});