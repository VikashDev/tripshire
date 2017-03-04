(function() {
    angular.module('apiApp').factory('dataFactory', function($http) {
        var config = {
            headers: {
                'Access-Control-Allow-Origin': 'http://localhost:2000',
                'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
                'Access-Control-Allow-Headers': 'Content-Type, X-Requested-With',
            }
        };

        let apiData = function() {
            console.log('In API');
            return $http.get('/feeds');
        };

        let facebook = () => {
            return $http.get('/auth/facebook').then((res) => {
                console.log(res);
            }, (err) => {
                console.log(err);
            })
        };

        let google = () => {
            return $http.get('/auth/google', config).then((res) => {
                console.log(res);
            }, (err) => {
                console.log(err);
            })
        };
        return {
            apiData: apiData,
            facebook: facebook,
            google: google
        };

    });

    angular.module('apiApp').factory('Activities', function($http) {
        var Activities = function() {
            this.items = [];
            this.busy = false;
            this.after = null;
        };

        Activities.prototype.nextPage = function() {
            if (this.busy) return;
            this.busy = true;
            var url = "/feeds";
            if (this.after != null)
                url += "?" + this.after;
            console.log(url);
            $http.get(url).then(function(data) {
                var items = data.data.data;
                var index = data.data.index;
                var start_index = data.data.starting_index;
                if (index != -1) {
                    for (var i = 0; i < items.length; i++)
                        this.items.push(items[i]);
                    this.after = "index=" + index + "&starting_index=" + start_index;
                    this.busy = false;
                } else {
                    console.log("I am out of Data.       ##World of TKRD");
                }
            }.bind(this));
        };

        return Activities;
    });
})();