angular.module("myApp").factory("Service",["$q","$timeout","$http",function(t,e,i){function n(){return i.get("/v1/api/categories/all").success(function(t){return console.log("coming from servicejs",t.data),t.data})}function s(t,e,n,s){i.post("/v1/api/categories",{name:t,parent:n,discription:e}).success(function(t){s(t)})}function c(t,e){i.delete("/v1/api/activities/"+t).success(function(t){e(t)})}function o(t,e){i.post("/v1/api/activities/geo",t).success(function(t){e(t)})}function r(t,e,n){var s=new FormData;s.append("file",e),s.append("category",t),i.post("/v1/api/upload_csv",s,{transformRequest:angular.identity,headers:{"Content-Type":void 0}}).success(function(t,e){200===e&&n(t,e)})}function a(e,n){t.defer();i.put("/v1/api/activities",e).success(function(t){n(t)})}function u(t){return i.get("/v1/api/activities/filter/categories?key="+t).success(function(t){return console.log("coming from servicejs",t.data),t.data})}function f(t){return i.get("/v1/api/activities/"+t).success(function(t){return console.log("activity",t.data),t.data})}function p(){return!!m}function v(){return i.get("/v1/api/admin/status").success(function(t){m=!!t.status}).error(function(t){m=!1})}function g(e,n){var s=t.defer();return i.post("/v1/api/admin/login",{email:e,password:n}).success(function(t,e){200===e&&t.status?(m=!0,s.resolve()):(m=!1,s.reject())}).error(function(t){m=!1,s.reject()}),s.promise}function d(){var e=t.defer();return i.get("/v1/api/admin/logout").success(function(t){m=!1,e.resolve()}).error(function(t){m=!1,e.reject()}),e.promise}function l(e,n,s){var c=t.defer();return i.post("/v1/api/admin",{name:e,email:n,password:s}).success(function(t,e){200===e&&t.status?c.resolve():c.reject()}).error(function(t){c.reject()}),c.promise}var m=null;return{isLoggedIn:p,getUserStatus:v,login:g,logout:d,register:l,getCategories:n,getActivities:u,postCategory:s,postActivity:o,deleteActivity:c,csvUpload:r,getActivity:f,putActivities:a}}]);