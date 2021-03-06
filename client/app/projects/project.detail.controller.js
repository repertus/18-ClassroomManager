(function() {
    'use strict';

    angular
        .module('myApp')
        .controller('ProjectDetailController', ProjectDetailController);

    ProjectDetailController.$inject = ['projectFactory', 'studentFactory', 'assignmentFactory', '$stateParams', '$state','toastr'];

    /* @ngInject */
    function ProjectDetailController(projectFactory, studentFactory, assignmentFactory, $stateParams, $state, toastr) {
        var vm = this;
        vm.title = 'ProjectDetailController';

        // properties
        vm.projectId = $stateParams.projectId;

        // methods
        vm.addAssignment = addAssignment;
        vm.addProject = addProject;
        vm.editGrade = editGrade;
        vm.removeAssignment = removeAssignment;
        vm.updateProject = updateProject;
        

        activate();

        ////////////////

        function addAssignment() {
          var assignment = {'projectId' : vm.project.projectId, 'studentId' : vm.newAssignment.studentId};
          
          assignmentFactory.add(assignment).then(
            function(newAssignment) {
              vm.project.assignments.push(newAssignment);
              toastr.success('Successfully added assignment to student', 'Saved');
            },
            function() {
                toastr.error('Error adding assignment to student', 'Error');
            });
        }

        function editGrade(assignment, grade){
            var i = 0;
            var newGrade = {  'studentId' : assignment.studentId, 
                                'projectId' : assignment.projectId,
                                'assignmentGrade' : vm.assignGrade};
          
          assignmentFactory.update(newGrade).then(
            function() {
              for(i=0; i < vm.project.assignments.length; i++)
              {
                if(vm.project.assignments[i].studentId == assignment.studentId && 
                    vm.project.assignments[i].projectId == assignment.projectId)
                {
                    vm.project.assignments[i].assignmentGrade = vm.assignGrade;
                };
              };   
              toastr.success('Successfully changed grade', 'Saved');
            },
            function() {
                toastr.error('Error changing grade', 'Error');
            });
        }

        function removeAssignment(assignment) {
          var projectId = vm.project.projectId;
          var studentId = assignment.student.studentId;

          assignmentFactory.remove(studentId, projectId).then(
            function(){
                var index = vm.project.assignments.indexOf(assignment);
                vm.project.assignments.splice(index, 1);
                toastr.success('Successfully deleted assigned student', 'Saved');
            },
            function(){
                toastr.error('Error deleting assigned student', 'Error');
            });
        }

        function addProject(project) {
          projectFactory.add(project).then(
            function(){
                toastr.success('Successfully added project', 'Saved');
                $state.go('projects.grid');
            },
            function(){
                toastr.error('Error adding project', 'Error');
            });
        }

        function updateProject(project) {  
          projectFactory.update(project).then(
            function(){
                toastr.success('Successfully updated project', 'Saved');
                $state.go('projects.grid');
            },
            function(){
                toastr.error('Error updating project', 'Error');
            });
        }

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
    }
})();