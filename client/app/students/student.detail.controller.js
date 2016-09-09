(function() {
    'use strict';

    angular
        .module('myApp')
        .controller('StudentDetailController', StudentDetailController);

    StudentDetailController.$inject = ['studentFactory', 'projectFactory', 'assignmentFactory', '$stateParams', 'toastr'];

    /* @ngInject */
    function StudentDetailController(studentFactory, projectFactory, assignmentFactory, $stateParams, toastr) {
        var vm = this;
        vm.title = 'StudentDetailController';

        // properties


        // methods
        vm.addAssignment = addAssignment;
        vm.updateStudent = updateStudent;

        activate();

        ////////////////

        function addAssignment() {
          var assignment = {'studentId' : vm.student.studentId, 'projectId' : vm.newAssignment.projectId};
          
          assignmentFactory.add(assignment).then(
            function(newAssignment) {
              vm.student.assignments.push(newAssignment);
              toastr.success('Successfully added assignment', 'Saved');
            },
            function() {
                toastr.error('Error adding assignment', 'Error');
            });
        }

        function updateStudent(student) {  
          studentFactory.update(student).then(
            function(){
                toastr.success('Successfully updated student', 'Saved');
            },
            function(){
                toastr.error('Error updating student', 'Error');
            });
        }

        function activate() {
        	projectFactory.getAll().then(
                function (data) {
                    vm.projects = data;
                },

                function(error) {
                    toastr.error('Error getting detail', 'Error');
            });

            if ($stateParams.studentId != null){
                studentFactory.getById($stateParams.studentId).then(
                    function (data) {
                        vm.student = data;
                    },

                    function(error) {
                        toastr.error('Error getting student detail', 'Error');
                });
            };
        }
    }
})();