(function() {
    'use strict';

    angular
        .module('myApp')
        .controller('ProjectDetailController', ProjectDetailController);

    ProjectDetailController.$inject = ['projectFactory', 'studentFactory', 'assignmentFactory', '$stateParams'];

    /* @ngInject */
    function ProjectDetailController(projectFactory, studentFactory, assignmentFactory, $stateParams) {
        var vm = this;
        vm.title = 'ProjectDetailController';

        // properties


        // methods
        // vm.addAssignment = addAssignment;
        // vm.updateStudent = updateStudent;

        activate();

        ////////////////

        function activate() {
            studentFactory.getAll().then(
                function (data) {
                    vm.students = data;
                },

                function(error) {
                    toastr.error('Error getting student detail', 'Error');
            });

            if ($stateParams.projectId != null){
                projectFactory.getById($stateParams.projectId).then(
                    function (data) {
                        vm.project = data;
                    },

                    function(error) {
                        toastr.error('Error getting project detail', 'Error');
                });
            };
        }

        // function activate() {
        //     // Initiates the dashboard data from the dB server
        //     projectFactory.getById($stateParams.projectId).then(
        //         function (data) {
        //             vm.data = data;
        //         },

        //         function(error) {
        //             toastr.error('Error getting detail', 'Error');
        //     });
            
        //     studentFactory.getAll().then(
        //         function (data) {
        //             vm.students = data;
        //         },

        //         function(error) {
        //             toastr.error('Error getting student list', 'Error');
        //     });        
        // }
    }
})();