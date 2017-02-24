(function() {
    angular.module('myApp').controller('mainController', mainController);
    mainController.$inject = ['$scope', '$location', 'Service'];

    function mainController($scope, $location, Service) {
        console.log('entered main');
        var vm = this;
        vm.error = false;
        vm.processing = true;
        vm.errorMessage = [];
        vm.selected_category = undefined;
        vm.activities = [];
        vm.searchText = '';
        vm.new_activity = {
            highlights: [],
            tags: [],
            operator: [],
            attrs: [],
            geo: []
        };
        vm.categories = [];
        console.log('going good');
        vm.getActivities = getActivities;
        vm.editCategory = editCategory;
        vm.addhighlights = addhighlights;
        vm.addoperator = addoperator;
        vm.addtags = addtags;
        vm.addattrs = addattrs;
        vm.addActivity = addActivity;
        vm.addCategory = addCategory;
        vm.logout = logout;
        vm.uploadFile = uploadFile;

        console.log('going awedome');
        vm.categories = Service.getCategories().then(function(response) {
            console.log(response.data.data);
            vm.processing = false;
            vm.categories = response.data.data;
        });

        /*
    


        */
        function getActivities(category) {
            console.log(category);
            vm.processing = true;
            vm.activities = Service.getActivities(category).then(function(response) {
                console.log(response.data.data);
                vm.activities = response.data.data;
                vm.processing = false;
            });
        }

        function editCategory(id) {
            console.log(id);
        }

        function addhighlights(value) {
            if (value !== null && value !== '') {
                vm.new_activity.highlights.push(value);
                vm.value = '';
            }
        }

        function addoperator(value) {
            if (value !== null) {
                vm.new_activity.operator.push(value);
                vm.opvalue = {};
            }
        }

        function addtags(tagvalue) {
            if (tagvalue !== null && tagvalue !== '') {
                vm.new_activity.tags.push(tagvalue);
                vm.tagvalue = '';
            }
        }

        function addattrs(attrs) {
            vm.new_activity.attrs.push(attrs);
            vm.attrs = '';
        }

        function addActivity(data) {
            var latitute = document.getElementById('lat').value;
            var longitude = document.getElementById('long').value;
            if (latitute !== null && data.geo.length < 2 && latitute !== '' && longitude !== '' && longitude !== null) {
                data.geo.push(latitute);
                data.geo.push(longitude);
                data.address = document.getElementById('address').value;
                console.log(data.address);
            }
            Service.postActivity(data, function(res) {
                console.log(res);
                if (res.status == 'false') {
                    console.log('false');
                    vm.errorMessage = 'some problem with activity value inserted';
                    $location.path('/');
                } else {
                    $location.path('/');
                }
            });
        }

        function addCategory(data) {
            vm.error = false;
            console.log(data);
            Service.postCategory(data.name, data.discription, data.parent, function(result) {
                    if (result.status === 'false' || result.status === false) {
                        console.log(result.error);
                        vm.errorMessage = result.error;
                    } else {
                        console.log(result);
                        $location.path('/');
                        vm.new_category = {};
                    }

                })
                .catch(function() {
                    vm.error = true;
                    vm.errorMessage = 'Something went wrong!';
                    vm.registerForm = {};
                });
        }

        function logout() {
            console.log('logout');
            // call logout from service
            Service.logout()
                .then(function() {
                    $location.path('/login');
                });

        }

        function uploadFile() {
            var category = vm.category;
            var file = vm.myFile;

            Service.csvUpload(category, vm.myFile, function(res) {
                console.log(res.status, res['status']);
                if (res.status === 'false') {
                    vm.errorMessage = res.message;
                } else {
                    console.log(res);
                    $location.path('/');
                }
            });
            //  $scope.upload($scope.myFile,category);
        }
    }
})();