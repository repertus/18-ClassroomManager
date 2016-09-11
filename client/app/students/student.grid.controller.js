(function() {
    'use strict';

    angular
        .module('myApp')
        .controller('StudentGridController', StudentGridController);

    StudentGridController.$inject = ['studentFactory', 'toastr', '$ngBootbox'];

    /* @ngInject */
    function StudentGridController(studentFactory, toastr, $ngBootbox) {
        var vm = this;
        vm.title = 'StudentGridController';

        // methods
        vm.removeStudent = removeStudent;

        activate();

        ////////////////
        
        function removeStudent(student) {
            $ngBootbox.confirm('Are you sure you want to remove this Student?')
                .then(function() {
                    studentFactory.remove(student).then(
                        function() {
                            var index = vm.students.indexOf(student);
                            vm.students.splice(index, 1);
                            toastr.success('Successfully deleted student', 'Deleted');
                          },
                          function(error) {
                            toastr.error('Error deleting student', 'Error');
                        });
                    console.log('Confirmed!');
                }, function() {
                    console.log('Confirm dismissed!');
                });
        }
        
        function activate() {
            studentFactory.getAll().then(
                function (data) {
                    vm.students = data;
                },

                function(error) {
                    toastr.error('Error getting student list', 'Error');
            });
        }
    }
})();