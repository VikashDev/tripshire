(function() {

    angular.module('apiApp')
        .controller('apiCtrl', ($scope, $http, Activities, $location, $rootScope) => {

            $scope.data = '';
            $scope.cards = null;
            $scope.activities = new Activities();
            console.log($scope.cards);
            $scope.data = {
                name: undefined,
                email: undefined,
                provider: undefined,
                oauthId: undefined,
                accessToken: undefined
            };

            function updateSigninStatus(isSignedIn) {
                if (isSignedIn) {
                    authorizeButton.style.display = 'none';
                    signoutButton.style.display = 'block';
                    makeApiCall();
                } else {
                    authorizeButton.style.display = 'block';
                    signoutButton.style.display = 'none';
                }
            }

            function handleAuthClick(event) {
                gapi.auth2.getAuthInstance().signIn();
            }

            function handleSignoutClick(event) {
                gapi.auth2.getAuthInstance().signOut();
            }
            // Load the API and make an API call.  Display the results on the screen.
            function makeApiCall() {
                gapi.client.people.people.get({
                    resourceName: 'people/me'
                }).then(function(resp) {
                    var p = document.createElement('p');
                    var name = resp.result.names[0].givenName;
                    p.appendChild(document.createTextNode('Hello, ' + name + '!'));
                    document.getElementById('content').appendChild(p);
                });
            }
            $scope.facebookCall = function() {
                console.log('hello facebook');
                FB.login(function(response) {
                    if (response.authResponse) {
                        console.log('Welcome!  Fetching your information.... ');
                        FB.api('/me', {
                            locale: 'en_US',
                            fields: 'name, email'
                        }, function(response) {
                            console.log(response);
                            console.log('Good to see you, ' + response.name + '.');
                            var p = document.createElement('p');
                            var name = response.name;
                            p.appendChild(document.createTextNode('Hello, ' + name + '!'));
                            document.getElementById('content').appendChild(p);
                            $scope.data.oauthId = response.id;
                            $scope.data.email = response.email;
                            $scope.data.name = response.name;
                            $scope.data.provider = 'facebook';
                            $scope.data.accessToken = FB.getAuthResponse().accessToken;

                            FB.api('/' + response.id + '/picture', function(picResponse) {
                                if (picResponse && !picResponse.error) {
                                    console.log(picResponse);
                                }
                            });
                            console.log($scope.data);
                            $http.post('/user/save', $scope.data).then(function success(response) {
                                console.log(response);
                                $rootScope.user = response.user;

                            }, function error(err) {
                                console.log(err);
                            });
                        });


                    } else {
                        console.log('User cancelled login or did not fully authorize.');
                    }
                }, {
                    scope: 'email,public_profile'
                });
            };

            $scope.googleCall = function() {
                console.log(gapi.auth2.getAuthInstance().isSignedIn.get());
                var isSignedIn = gapi.auth2.getAuthInstance().isSignedIn.get();
                if (!isSignedIn) {
                    gapi.auth2.getAuthInstance().signIn().then(function() {
                        gapi.client.people.people.get({
                            resourceName: 'people/me'
                        }).then(function(resp) {
                            console.log(resp);
                            var p = document.createElement('p');
                            var name = resp.result.names[0].displayName;
                            $scope.data.name = resp.result.names[0].givenName;
                            $scope.data.email = resp.result.emailAddresses[0].value;
                            $scope.data.provider = 'Google';
                            $scope.data.oauthId = resp.result.metadata.sources[0].id;
                            $scope.data.accessToken = gapi.auth2.getAuthInstance().currentUser.get().getAuthResponse(true).accessToken;
                            p.appendChild(document.createTextNode('Hello, ' + name + '!'));
                            document.getElementById('content').appendChild(p);
                            console.log(gapi.auth2.getAuthInstance().currentUser.get().getAuthResponse(true).accessToken);
                            console.log($scope.data);
                            $http.post('/user/save', $scope.data).then(function success(response) {
                                console.log(response);
                                $rootScope.user = response.user;

                            }, function error(err) {
                                console.log(err);
                            });
                        });
                    });


                } else {
                    gapi.client.people.people.get({
                        resourceName: 'people/me'
                    }).then(function(resp) {
                        console.log(resp);
                        var p = document.createElement('p');
                        var name = resp.result.names[0].displayName;
                        $scope.data.name = resp.result.names[0].givenName;
                        $scope.data.email = resp.result.emailAddresses[0].value;
                        $scope.data.provider = 'Google';
                        $scope.data.oauthId = resp.result.metadata.sources[0].id;
                        $scope.data.accessToken = gapi.auth2.getAuthInstance().currentUser.get().getAuthResponse(true).accessToken;
                        p.appendChild(document.createTextNode('Hello, ' + name + '!'));
                        document.getElementById('content').appendChild(p);
                        console.log(gapi.auth2.getAuthInstance().currentUser.get().getAuthResponse(true).accessToken);
                        console.log($scope.data);
                        $http.post('/user/save', $scope.data).then(function success(response) {
                            console.log(response);
                            $rootScope.user = response.user;

                        }, function error(err) {
                            console.log(err);
                        });
                    });
                }
            };
        });

})();