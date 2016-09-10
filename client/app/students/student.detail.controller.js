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
        vm.studentId = $stateParams.studentId

        // methods
        vm.addAssignment = addAssignment;
        vm.addStudent = addStudent;
        vm.editGrade = editGrade;
        vm.removeAssignment = removeAssignment;
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

        function editGrade(assignment, grade){
            var i = 0;
            var newGrade = {  'studentId' : assignment.studentId, 
                                'projectId' : assignment.projectId,
                                'assignmentGrade' : vm.assignGrade};
          
          assignmentFactory.update(newGrade).then(
            function() {
              for(i=0; i < vm.student.assignments.length; i++)
              {
                if(vm.student.assignments[i].studentId == assignment.studentId && 
                    vm.student.assignments[i].projectId == assignment.projectId)
                {
                    vm.student.assignments[i].assignmentGrade = vm.assignGrade;
                };
              };   
              // vm.student.assignments.assigmentGrade.push(grade);
              toastr.success('Successfully changed grade', 'Saved');
            },
            function() {
                toastr.error('Error changing grade', 'Error');
            });
        }

        function removeAssignment(assignment) {
          var studentId = vm.student.studentId;
          var projectId = assignment.project.projectId;

          assignmentFactory.remove(studentId, projectId).then(
            function(){
                var index = vm.student.assignments.indexOf(assignment);
                vm.student.assignments.splice(index, 1);
                toastr.success('Successfully deleted assignment', 'Saved');
            },
            function(){
                toastr.error('Error deleting assignment', 'Error');
            });
        }

        function addStudent(student) {
          studentFactory.add(student).then(
            function(){
                toastr.success('Successfully added student', 'Saved');
            },
            function(){
                toastr.error('Error adding student', 'Error');
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
                        console.log(vm.student);
                    },

                    function(error) {
                        toastr.error('Error getting student detail', 'Error');
                });
            };
        }
    }
})();