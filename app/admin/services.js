angular.module('myApp').factory('Service',
  ['$q', '$timeout', '$http',
  function ($q, $timeout, $http) {

    var user = null;

    return ({
      isLoggedIn: isLoggedIn,
      getUserStatus: getUserStatus,
      login: login,
      logout: logout,
      register: register,
      getCategories: getCategories,
      getActivities:getActivities,
      postCategory:postCategory,
      postActivity:postActivity,
      deleteActivity:deleteActivity,
      csvUpload:csvUpload,
      getActivity:getActivity,
      putActivities:putActivities
    });

  function getCategories() {
      return $http.get('/v1/api/categories/all')
      .success(function(response) {
        console.log("coming from servicejs", response.data);
        return response.data;
      });
  }
  function postCategory(name,discription,parent,callback){
      // create a new instance of deferred
      // send a post request to the server
      $http.post('/v1/api/categories',
        {name:name,parent: parent, discription: discription})
        // handle success
        .success(function (res) {
          console.log(res);
            callback(res)
  }).error(function(err) {
    console.log(err);
  });
};
function deleteActivity(id,callback){

    $http.delete('/v1/api/activities/'+id)
      .success(function (res) {
           callback(res);
         })
};
function postActivity(data,callback){
  $http.post('/v1/api/activities/geo',
  data)
    // handle success
    .success(function (res) {
      callback(res);
});
};
function csvUpload(category,file,callback){
    var fd = new FormData();
    fd.append('file', file);
    fd.append('category',category)
  $http.post('/v1/api/upload_csv', fd, {
             transformRequest: angular.identity,
             headers: {'Content-Type': undefined}
          })
  .success(function (data, status) {
    if(status === 200){
      callback(data,status)
    };
})
}
  function putCategory(name,discription,parent,callback){

      $http.put('/v1/api/categories',
        {name:name,parent: parent, discription: discription})
        // handle success
        .success(function (res) {
            callback(res)
        });
  }
  function putActivities(data,callback){
    var deferred = $q.defer();
    $http.put('/v1/api/activities',data)
    .success(function(res){
      callback(res)
    })

}
  function getActivities(category) {
      return $http.get('/v1/api/activities/filter/categories?key='+category)
      .success(function(response) {
        console.log("coming from servicejs", response.data);
        return response.data;
      })
  }
  function getActivity(id) {
      return $http.get('/v1/api/activities/'+id)
      .success(function(response) {
        console.log("activity", response.data);
        return response.data;
      })
  }
    function isLoggedIn() {
      if(user) {
        return true;
      } else {
        return false;
      }
    }

    function getUserStatus() {
      return $http.get('/v1/api/admin/status')
      // handle success
      .success(function (data) {
        if(data.status){
          user = true;
        } else {
          user = false;
        }
      })
      // handle error
      .error(function (data) {
        user = false;
      });
    }

    function login(email, password) {

      // create a new instance of deferred
      var deferred = $q.defer();

      // send a post request to the server
      $http.post('/v1/api/admin/login',
        {email: email, password: password})
        // handle success
        .success(function (data, status) {
          if(status === 200 && data.status){
            user = true;
            deferred.resolve();
          } else {
            user = false;
            deferred.reject();
          }
        })
        // handle error
        .error(function (data) {
          user = false;
          deferred.reject();
        });

      // return promise object
      return deferred.promise;

    }

    function logout() {

      // create a new instance of deferred
      var deferred = $q.defer();

      // send a get request to the server
      $http.get('/v1/api/admin/logout')
        // handle success
        .success(function (data) {
          user = false;
          deferred.resolve();
        })
        // handle error
        .error(function (data) {
          user = false;
          deferred.reject();
        });

      // return promise object
      return deferred.promise;

    }

    function register(name,email, password) {

      var deferred = $q.defer();
      $http.post('/v1/api/admin',
        {name:name,email: email, password: password})
        .success(function (data, status) {
          if(status === 200 && data.status){
            deferred.resolve('Done');
          } else {
            deferred.reject('Not Done');
          }
        })
        .error(function (data) {
          deferred.reject();
        });
      return deferred.promise;
    }
}]);
