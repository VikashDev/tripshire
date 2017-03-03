(function() {
    angular.module('apiApp').factory('dataFactory', function($http) {

        let apiData = function() {
            console.log('In API');
            return $http.get('http://tripshire1.herokuapp.com/feeds');
        };

        // let facebook = () => {
        //     return $http.get('http://localhost:2000/auth/facebook').then((res) => {
        //         console.log(res);
        //     }, (err) => {
        //         console.log(err);
        //     })
        // };

        // let google = () => {
        //     return $http.get('http://localhost:2000/auth/google').then((res) => {
        //         console.log(res);
        //     }, (err) => {
        //         console.log(err);
        //     })
        // };
        return {
            apiData: apiData
        };

    });
})();