(function() {
    console.log('Entered in edit');
    angular.module('myApp').controller('editController', editController);
    editController.$inject = ['$scope', '$location', 'Service', '$routeParams'];

    function editController($scope, $location, Service, $routeParams) {
        console.log('More entered');
        var vm = this;
        vm.error = false;
        vm.activity = [];
        vm.categories = [];
        vm.errorMessage = [];
        vm.category = null;
        vm.activityid = $routeParams.id;
        console.log($routeParams);
        vm.addhighlights = addhighlights;
        vm.addoperator = addoperator;
        vm.addtags = addtags;
        vm.removeTag = removeTag;
        vm.removeHighlights = removeHighlights;
        vm.addattrs = addattrs;
        vm.editActivity = editActivity;
        vm.deleteActivity = deleteActivity;

        // $scope.error = false;
        // $scope.errorMessage = [];
        // $scope.category = null;
        // $scope.activityid = $routeParams.id;
        // console.log($routeParams)

        vm.activity = Service.getActivity(vm.activityid).then(function(response) {
            console.log('data for response', response.data.data);
            vm.processing = false;
            vm.activity = response.data.data;
        });


        // $scope.activity = Service.getActivity($scope.activityid).then(function(response) {
        //     console.log(response.data.data);
        //     $scope.processing = false;
        //     $scope.activity = response.data.data;
        // });

        vm.categories = Service.getCategories().then(function(response) {
            console.log('data for categories', response.data.data);
            vm.processing = false;
            vm.categories = response.data.data;
        });

        // $scope.categories = Service.getCategories().then(function(response) {
        //     console.log(response.data.data);
        //     $scope.processing = false;
        //     $scope.categories = response.data.data;
        // });
        function addhighlights(value) {

            vm.activity.highlights.push(value);
            vm.value = '';
        }

        function addoperator(value) {
            vm.activity.operator.push(value);
            vm.opvalue = {};
        }

        function addtags(tagvalue) {
            vm.activity.tags.push(tagvalue);
            vm.tagvalue = '';
        }

        function removeTag(value) {
            console.log(value);
            var index = vm.activity.tags.indexOf(value);
            vm.activity.tags.splice(index, 1);
        }

        function removeHighlights(value) {
            console.log(value);
            var index = $scope.activity.highlights.indexOf(value);
            vm.activity.highlights.splice(index, 1);
        }

        function addattrs(attrs) {
            vm.activity.attrs.push(attrs);
            vm.attrs = '';
        }

        function editActivity(data) {
            Service.putActivities(data, function(res) {
                console.log(res.status);
                if (res.status === 'false') {
                    console.log(res.status, 'false');
                    vm.errorMessage = res.error;
                } else {
                    console.log(res.status, 'true');
                    $location.path('/');
                }
            });
        }

        function deleteActivity() {
            Service.deleteActivity($scope.activityid, function(res) {
                if (res.status === 'false') {
                    vm.errorMessage = res.error;
                } else {
                    $location.path('/');
                }
            });
        }

    }

})();