(function() {
    'use strict';

    angular
        .module('myApp')
        .factory('dashboardFactory', dashboardFactory);

    dashboardFactory.$inject = ['$http', '$q', 'apiUrl'];

    /* @ngInject */
    function dashboardFactory($http, $q, apiUrl) {
        var service = {
            getDash: getDash
        };
        return service;

        ////////////////

        function getDash() {
        	var defer = $q.defer();
            $http.get(apiUrl + '/dashboard').then(
            	function(response) {
                   if (typeof response.data === 'object') {
                       defer.resolve(response.data);
                   } else {
                       defer.reject(response.data);
                   }
               },
               function(error) {
                    defer.reject(error);
               }
           );

           return defer.promise;
        }
    }
})();