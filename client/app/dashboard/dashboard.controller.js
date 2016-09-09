(function() {
    'use strict';

    angular
        .module('myApp')
        .controller('DashboardController', DashboardController);

    DashboardController.$inject = ['dashboardFactory', 'toastr'];

    /* @ngInject */
    function DashboardController(dashboardFactory, toastr) {
        var vm = this;
        vm.title = 'DashboardController';


        activate();

        ////////////////

        function activate() {
            // Initiates the dashboard data from the dB server
            dashboardFactory.getDash().then(
                function (data) {
                    vm.data = data;
                },
                function(error) {
                    toastr.error('Error getting dashboard summary', 'Error');
            });
        }
    }
})();