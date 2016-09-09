(function() {
    'use strict';

    angular
        .module('myApp')
        .factory('projectFactory', projectFactory);

    projectFactory.$inject = ['$http', '$q', 'apiUrl'];

    /* @ngInject */
    function projectFactory($http, $q, apiUrl) {
        var service = {
            getAll: getAll,
            getById: getById,
            add : add,
            update : update,
            remove : remove
        };
        return service;

        ////////////////

        function add(project) {
          var defer = $q.defer();

          $http.post(apiUrl + '/projects', project)
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

          $http.get(apiUrl + '/projects')
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

          $http.get(apiUrl + '/projects/' + id)
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

        function update(project) {
          var defer = $q.defer();

          $http.put(apiUrl + '/projects/' + project.projectId, project)
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

        function remove(project) {
          var defer = $q.defer();

          $http.delete(apiUrl + '/projects/' + project.projectId)
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