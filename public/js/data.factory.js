(function() {
    angular.module('apiApp').factory('dataFactory', function($http) {

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
            return $http.get('/auth/google').then((res) => {
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
                console.log(data);
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

    angular.module('apiApp')
        .service('googleService', ['$http', '$rootScope', '$q', function($http, $rootScope, $q) {
            var clientId = '411161315752-uimgenl26ed6pt0q6u3qe3ctkge8kqdm.apps.googleusercontent.com',
                apiKey = 'AIzaSyClSDUHidz0ynS-H18QC99LD0e1I-_wp8M',
                scopes = 'profile',
                domain = '{OPTIONAL DOMAIN}',
                deferred = $q.defer();

            this.login = function() {
                gapi.auth.authorize({
                    client_id: clientId,
                    scope: scopes,
                    immediate: false,
                    hd: domain
                }, this.handleAuthResult);

                return deferred.promise;
            }

            this.handleClientLoad = function() {
                gapi.client.setApiKey(apiKey);
                gapi.auth.init(function() {});
                window.setTimeout(checkAuth, 1);
            };

            this.checkAuth = function() {
                gapi.auth.authorize({
                    client_id: clientId,
                    scope: scopes,
                    immediate: true,
                    hd: domain
                }, this.handleAuthResult);
            };

            this.handleAuthResult = function(authResult) {
                if (authResult && !authResult.error) {
                    var data = {};
                    gapi.client.load('oauth2', 'v2', function() {
                        var request = gapi.client.oauth2.userinfo.get();
                        request.execute(function(resp) {
                            data.email = resp.email;
                        });
                    });
                    deferred.resolve(data);
                } else {
                    deferred.reject('error');
                }
            };

            this.handleAuthClick = function(event) {
                gapi.auth.authorize({
                    client_id: clientId,
                    scope: scopes,
                    immediate: false,
                    hd: domain
                }, this.handleAuthResult);
                return false;
            };

        }]);
})();