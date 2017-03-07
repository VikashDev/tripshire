(function() {
    window.fbAsyncInit = function() {
        FB.init({
            appId: '1444023985609454',
            xfbml: true,
            version: 'v2.8'
        });
        FB.AppEvents.logPageView();
    };
    (function(d, s, id) {
        var js, fjs = d.getElementsByTagName(s)[0];
        if (d.getElementById(id)) {
            return;
        }
        js = d.createElement(s);
        js.id = id;
        js.src = "//connect.facebook.net/en_US/sdk.js";
        fjs.parentNode.insertBefore(js, fjs);
    }(document, 'script', 'facebook-jssdk'));

    var apiKey = 'AIzaSyClSDUHidz0ynS-H18QC99LD0e1I-_wp8M';
    var discoveryDocs = ["https://people.googleapis.com/$discovery/rest?version=v1"];
    var clientId = '411161315752-uimgenl26ed6pt0q6u3qe3ctkge8kqdm.apps.googleusercontent.com';
    var scopes = 'profile';
    gapi.load('client:auth2', initClient);

    function initClient() {
    	console.log('Gapi init');
        gapi.client.init({
            apiKey: apiKey,
            discoveryDocs: discoveryDocs,
            clientId: clientId,
            scope: scopes
        }).then(function() {
            // Listen for sign-in state changes.
            console.log('Gapi init then');
            console.log(gapi.auth2.getAuthInstance().isSignedIn.get());
            // gapi.auth2.getAuthInstance().isSignedIn.listen(updateSigninStatus);
            // // Handle the initial sign-in state.
            // updateSigninStatus(gapi.auth2.getAuthInstance().isSignedIn.get());
            // authorizeButton.onclick = handleAuthClick;
            // signoutButton.onclick = handleSignoutClick;
        });
    }

    angular.module('apiApp', ['ngRoute', 'infinite-scroll']).config(routing);
    routing.$inject = ['$locationProvider', '$routeProvider'];
    angular.module('apiApp').run(running);
    running.$inject = ['$rootScope', '$location', '$window', '$http'];

    function routing($locationProvider, $routeProvider) {

        if (window.history && window.history.pushState) {
            $locationProvider.html5Mode({
                enabled: true,
                requireBase: false
            });
        }
    }

    function running($rootScope, $location, $window) {
        console.log('hey run');
        console.log($location.path());
        // $rootScope.$on('$routeChangeStart', routeChangeStart);

        // function routeChangeStart(event, next, current) {
        //     console.log('Event');
        //     $http.get('/user/status').then(function(data){
        //     	if(data === true) {
        //     		console.log('user authenticated');
        //     	}
        //     });

        // }
    }
})();