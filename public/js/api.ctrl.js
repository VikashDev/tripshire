(function() {
    angular.module('apiApp')
        .controller('apiCtrl', function($scope, $http, Activities, $window, $rootScope) {
            var display = document.getElementById('display'); 
            $scope.cards = null;
            $scope.activities = new Activities();
            $scope.data = {
                name: undefined,
                email: undefined,
                provider: undefined,
                oauthId: undefined,
                accessToken: undefined
            };
            $scope.signup = {
                email: undefined,
                name: undefined,
                password: undefined,
            };
            $scope.signIn = {
                email: undefined,
                password: undefined
            };

            function handleAuthClick(event) {
                gapi.auth2.getAuthInstance().signIn();
            }

            function handleSignoutClick(event) {
                gapi.auth2.getAuthInstance().signOut();
            }

            $scope.signupCall = function() {
                // console.log($scope.signup);
                $http.post('/v1/api/user', $scope.signup).then(function success(response) {
                    console.log(response);
                    if (response.data.success === true && response.status === 200) {
                        $window.localStorage.setItem('user', response.data.user._id);
                        $('#signup-modal').modal('hide');
                        $rootScope.allow = false;
                    } else {
                        display.style.textAlign = 'center';
                        display.innerHTML = 'Not able to Signup';
                        $scope.signup.email = undefined;
                        $scope.signup.name = undefined;
                        $scope.signup.password = undefined;
                    }
                    $window.localStorage.setItem('visible', response.data.success);

                }, function error(err) {
                    console.log(err);
                });
            };

            $scope.signInCall = function() {
                // console.log($scope.signIn);
                $http.post('/v1/api/user/login', $scope.signIn).then(function success(response) {
                    if (response.status === 401 || response.statusText === 'Unauthorized') {
                        console.log('Enter');
                        display.style.textAlign = 'center';
                        display.innerHTML = 'Not able to SignIn';
                        $scope.signIn.email = undefined;
                        $scope.signIn.password = undefined;
                    } else {
                        $window.localStorage.setItem('user', response.data.user._id);
                        $('#login-modal').modal('hide');
                        $rootScope.allow = false;
                    }
                    $window.localStorage.setItem('visible', response.data.success);
                }, function error(err) {
                    console.log(err);
                });
            };


            $scope.facebookCall = function() {
                console.log('hello facebook');
                FB.login(function(response) {
                    FB.getLoginStatus(function(resp) {
                        // console.log(resp);
                    });
                    // console.log(response);
                    if (response.authResponse && response.status !== 'connected') {
                        console.log('Welcome!  Fetching your information.... ');
                        FB.api('/me', {
                            access_token: response.authResponse.accessToken,
                            locale: 'en_US',
                            fields: 'name, email, picture'
                        }, function(response) {
                            console.log(response);
                            $scope.data.oauthId = response.id;
                            $scope.data.email = response.email;
                            $scope.data.name = response.name;
                            $scope.data.provider = 'facebook';
                            $scope.data.accessToken = FB.getAuthResponse().accessToken;
                            console.log($scope.data);
                            $http.post('/user/save', $scope.data).then(function success(response) {
                                // console.log(response);
                                if (response.data.success === true) {
                                    $window.localStorage.setItem('user', response.data.user._id);
                                    $('#signup-modal').modal('hide');
                                    $rootScope.allow = false;
                                } else {
                                    display.style.textAlign = 'center';
                                    display.innerHTML = 'Not able to Login';
                                }
                                $window.localStorage.setItem('visible', response.data.success);
                            }, function error(err) {
                                console.log(err);
                            });
                        });
                    } else {
                        if (response.authResponse && response.status === 'connected') {
                            console.log('Welcome!  Fetching your information.... ');
                            FB.api('/me', {
                                access_token: response.authResponse.accessToken,
                                locale: 'en_US',
                                fields: 'name, email, picture'
                            }, function(response) {
                                console.log(response);
                                $scope.data.oauthId = response.id;
                                $scope.data.email = response.email;
                                $scope.data.name = response.name;
                                $scope.data.provider = 'facebook';
                                $scope.data.accessToken = FB.getAuthResponse().accessToken;
                                console.log($scope.data);
                                $http.post('/user/save', $scope.data).then(function success(response) {
                                    if (response.data.success === true) {
                                        $window.localStorage.setItem('user', response.data.user._id);
                                        $('#signup-modal').modal('hide');
                                        $rootScope.allow = false;
                                    } else {
                                        display.style.textAlign = 'center';
                                        display.innerHTML = 'Not able to Login';
                                    }
                                    $window.localStorage.setItem('visible', response.data.success);
                                }, function error(err) {
                                    console.log(err);
                                });
                            });
                        } else {
                            console.log('User cancelled login or did not fully authorize.');
                        }
                    }
                }, {
                    scope: 'email,public_profile'
                });
            };
            $scope.googleCall = function() {
                var isSignedIn = gapi.auth2.getAuthInstance().isSignedIn.get();
                if (!isSignedIn) {
                    gapi.auth2.getAuthInstance().signIn().then(function() {
                        gapi.client.people.people.get({
                            resourceName: 'people/me'
                        }).then(function(resp) {
                            // console.log(resp);
                            $scope.data.name = resp.result.names[0].givenName;
                            $scope.data.email = resp.result.emailAddresses[0].value;
                            $scope.data.provider = 'Google';
                            $scope.data.oauthId = resp.result.metadata.sources[0].id;
                            $scope.data.accessToken = gapi.auth2.getAuthInstance().currentUser.get().getAuthResponse().access_token;
                            // console.log(gapi.auth2.getAuthInstance().currentUser.get().getAuthResponse().access_token);
                            // console.log($scope.data);
                            $http.post('/user/save', $scope.data).then(function success(response) {
                                if (response.data.success === true) {
                                    // console.log('Inside');
                                    $window.localStorage.setItem('user', response.data.user._id);
                                    $('#signup-modal').modal('hide');
                                    $rootScope.allow = false;
                                } else {
                                    display.style.textAlign = 'center';
                                    display.innerHTML = 'Not able to Login';
                                }
                                $window.localStorage.setItem('visible', response.data.success);
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
                        $scope.data.name = resp.result.names[0].givenName;
                        $scope.data.email = resp.result.emailAddresses[0].value;
                        $scope.data.provider = 'Google';
                        $scope.data.oauthId = resp.result.metadata.sources[0].id;
                        $scope.data.accessToken = gapi.auth2.getAuthInstance().currentUser.get().getAuthResponse().access_token;
                        // console.log(gapi.auth2.getAuthInstance().currentUser.get().getAuthResponse().access_token);
                        // console.log($scope.data);
                        $http.post('/user/save', $scope.data).then(function success(response) {
                            console.log(response.data.user);
                            if (response.data.success === true) {
                                $window.localStorage.setItem('user', response.data.user._id);
                                $('#signup-modal').modal('hide');
                                $rootScope.allow = false;
                            } else {
                                display.style.textAlign = 'center';
                                display.innerHTML = 'Not able to Login';
                            }
                            $window.localStorage.setItem('visible', response.data.success);
                        }, function error(err) {
                            console.log(err);
                        });
                        console.log($window.localStorage.getItem('user'));
                    });
                }
            };
            $scope.setStorage = function(index) {
                var showable = $scope.activities.items[index];
                $window.localStorage.setItem('Selected', JSON.stringify(showable));
            };
        });
    angular.module('apiApp').filter('ordinal', function() {
        return function(text) {
            var newText;
            if (isNaN(text)) {
                if (text === null || text === undefined) {
                    newText = 'No description available';
                } else {
                    newText = text.split('.')[0] + '. ' + text.split('.')[1] + '. ';
                }
                return newText;
            }
        };
    });
})();