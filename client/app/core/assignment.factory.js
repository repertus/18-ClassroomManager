(function() {
    'use strict';

    angular
        .module('myApp')
        .factory('assignmentFactory', assignmentFactory);

    assignmentFactory.$inject = ['$http', '$q', 'apiUrl'];

    /* @ngInject */
    function assignmentFactory($http, $q, apiUrl) {
        var service = {
            getAll: getAll,
            getById: getById,
            add : add,
            update : update,
            remove : remove
        };
        return service;

        ////////////////

        function add(assignment) {
          var defer = $q.defer();

          $http.post(apiUrl + '/assignments', assignment)
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

          $http.get(apiUrl + '/assignments')
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

          $http.get(apiUrl + '/assignments/' + id)
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

        function update(assignment) {
          var defer = $q.defer();

          $http.put(apiUrl + '/assignments/' + assignment.studentId + '/' + assignment.projectId, assignment)
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

        function remove(studentId, projectId) {
          var defer = $q.defer();

          $http.delete(apiUrl + '/assignments/' + studentId + '/' + projectId)
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