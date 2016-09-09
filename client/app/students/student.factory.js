(function() {
    'use strict';

    angular
        .module('myApp')
        .factory('studentFactory', studentFactory);

    studentFactory.$inject = ['$http', '$q', 'apiUrl'];

    /* @ngInject */
    function studentFactory($http, $q, apiUrl) {
        var service = {
            getAll: getAll,
            getById: getById,
            add : add,
            update : update,
            remove : remove
        };
        return service;

        ////////////////

        function add(student) {
          var defer = $q.defer();

          $http.post(apiUrl + '/students', student)
            .then(
              function(response) {
                defer.resolve(response.data);
              },
              function(error) {
                defer.reject(error);
              }
            );

          return defer.promise;
        }

        function getAll() {
          var defer = $q.defer();

          $http.get(apiUrl + '/students')
            .then(
              function(response) {
                defer.resolve(response.data);
              },
              function(error) {
                defer.reject(error);
              }
            );

          return defer.promise;
        }

        function getById(id) {
          var defer = $q.defer();

          $http.get(apiUrl + '/students/' + id)
            .then(
              function(response) {
                defer.resolve(response.data);
              },
              function(error) {
                defer.reject(error);
              }
            );

          return defer.promise;
        }

        function update(student) {
          var defer = $q.defer();

          $http.put(apiUrl + '/students/' + student.studentId, student)
            .then(
              function() {
                defer.resolve();
              },
              function(error) {
                defer.reject(error);
              }
            );

          return defer.promise;
        }

        function remove(student) {
          var defer = $q.defer();

          $http.delete(apiUrl + '/students/' + student.studentId)
            .then(
              function(response) {
                defer.resolve(response.data);
              },
              function(error) {
                defer.reject(error);
              }
            );

          return defer.promise;
        }
    }
})();