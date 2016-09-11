(function() {
    'use strict';

    angular
        .module('myApp', ['ui.router', 'toastr', 'ngBootbox'])
        .value('apiUrl', 'http://localhost:64162/api')
        .config(function($urlRouterProvider, $stateProvider) {
        	
        	$urlRouterProvider.otherwise('/dashboard');

        	$stateProvider
        		.state('dashboard', {
        			url: '/dashboard',
        			templateUrl: '/app/dashboard/dashboard.html',
        			controller: "DashboardController as dashboard"
        		})
        		
        		//////////////////////////////////////////////
				//     Students pages                       // 
        		//////////////////////////////////////////////
        		.state('students', {
        			url: '/students',
        			abstract: true,
        			template: '<div ui-view></div>'
        		})
            		.state('students.grid', {
            			url: '/grid',
            			templateUrl: 'app/students/students-grid.html',
                        controller: "StudentGridController as studentGrid"
            		})
            		.state('students.detail', {
            			url: '/detail?studentId',
            			templateUrl: 'app/students/students-detail.html',
                        controller: "StudentDetailController as studentDetail"
            		})

        		//////////////////////////////////////////////
				//     Projects pages                       // 
        		//////////////////////////////////////////////
        		.state('projects', {
        			url: '/projects',
        			abstract: true,
        			template: '<div ui-view></div>'
        		})
            		.state('projects.grid', {
            			url: '/grid',
            			templateUrl: 'app/projects/projects-grid.html',
                        controller: "ProjectGridController as projectGrid"
            		})
            		.state('projects.detail', {
            			url: '/detail?projectId',
            			templateUrl: 'app/projects/projects-detail.html',
                        controller: "ProjectDetailController as projectDetail"
            		})

        });
})();