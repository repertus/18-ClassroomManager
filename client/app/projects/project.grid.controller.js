(function() {
    'use strict';

    angular
        .module('myApp')
        .controller('ProjectGridController', ProjectGridController);

    ProjectGridController.$inject = ['projectFactory', 'toastr'];

    /* @ngInject */
    function ProjectGridController(projectFactory, toastr) {
        var vm = this;
        vm.title = 'ProjectGridController';

        // methods
        vm.removeProject = removeProject;

        activate();

        ////////////////

        function removeProject(project) {
          if (confirm("Are you sure you want to remove this project?")) {
            projectFactory.remove(project).then(
              function() {
                var index = vm.projects.indexOf(project);
                vm.projects.splice(index, 1);
                toastr.success('Successfully deleted project', 'Deleted');
              },
              function(error) {
                toastr.error('Error deleting project', 'Error');
            });
          }
        }
        
        function activate() {
            projectFactory.getAll().then(
                function (data) {
                    vm.projects = data;
                },

                function(error) {
                    toastr.error('Error getting project list', 'Error');
            });
        }
    }
})();