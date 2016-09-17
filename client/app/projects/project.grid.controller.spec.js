describe('ProjectGridController', function() {

    var projectController;


    beforeEach(function() {
        bard.appModule('myApp');
        bard.inject('$controller', '$q', '$rootScope', '$httpBackend', 'projectFactory', '$ngBootbox', 'toastr');
    });

    bard.verifyNoOutstandingHttpRequests();

    describe('When the server is down', function() {
        beforeEach(function() {
            sinon.stub(projectFactory, 'getAll').returns($q.reject('Error getting project list'));
            sinon.stub(projectFactory, 'remove').returns($q.reject('Error deleting project'));

            projectController = $controller('ProjectGridController', {
                projectFactory: projectFactory
            });

            $rootScope.$apply();
        });

        it('should be instantiated', function() {
            expect(projectController).toBeDefined();
        });

        it('should show error when trying to get projects', function() {
            expect(projectController.projects).toBeUndefined();
        });
    });

    describe('When the server is up', function() {
        beforeEach(function() {
            sinon.stub(projectFactory, 'getAll').returns($q.when([{}, {}, {}]));
            sinon.stub(projectFactory, 'remove').returns($q.when({}));

            projectController = $controller('ProjectGridController', {
                projectFactory: projectFactory
            });

            $rootScope.$apply();
        });

        it('should have 3 projects', function() {
            expect(projectController.projects.length).toEqual(3);
        });

        describe('after deleting a project and user confirms deletion', function() {
        	beforeEach(function() {
				sinon.stub($ngBootbox, 'confirm').returns($q.when());
        	});

            it('should have 2 projects in the array', function() {
                projectController.removeProject({});

                $rootScope.$apply();

                expect(projectController.projects.length).toEqual(2);
            });
        });

        describe('after deleting a project and user cancels deletion', function() {
        	beforeEach(function() {
				sinon.stub($ngBootbox, 'confirm').returns($q.reject());
        	});

            it('should still have 3 projects in the array', function() {
                projectController.removeProject({});

                $rootScope.$apply();

                expect(projectController.projects.length).toEqual(3);
            });
        });
    });
})
