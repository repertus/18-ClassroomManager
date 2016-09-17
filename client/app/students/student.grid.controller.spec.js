describe('StudentGridController', function() {

    var studentController;


    beforeEach(function() {
        bard.appModule('myApp');
        bard.inject('$controller', '$q', '$rootScope', '$httpBackend', 'studentFactory', '$ngBootbox', 'toastr');
    });

    bard.verifyNoOutstandingHttpRequests();

    describe('When the server is down', function() {
        beforeEach(function() {
            sinon.stub(studentFactory, 'getAll').returns($q.reject('Error getting student list'));
            sinon.stub(studentFactory, 'remove').returns($q.reject('Error deleting student'));

            studentController = $controller('StudentGridController', {
                studentFactory: studentFactory
            });

            $rootScope.$apply();
        });

        it('should be instantiated', function() {
            expect(studentController).toBeDefined();
        });

        it('should show error when trying to get students', function() {
            expect(studentController.students).toBeUndefined();
        });
    });

    describe('When the server is up', function() {
        beforeEach(function() {
            sinon.stub(studentFactory, 'getAll').returns($q.when([{}, {}, {}]));
            sinon.stub(studentFactory, 'remove').returns($q.when({}));

            studentController = $controller('StudentGridController', {
                studentFactory: studentFactory
            });

            $rootScope.$apply();
        });

        it('should have 3 students', function() {
            expect(studentController.students.length).toEqual(3);
        });

        describe('after deleting a student and user confirms deletion', function() {
        	beforeEach(function() {
				sinon.stub($ngBootbox, 'confirm').returns($q.when());
        	});

            it('should have 2 students in the array', function() {
                studentController.removeStudent({});

                $rootScope.$apply();

                expect(studentController.students.length).toEqual(2);
            });
        });

        describe('after deleting a student and user cancels deletion', function() {
        	beforeEach(function() {
				sinon.stub($ngBootbox, 'confirm').returns($q.reject());
        	});

            it('should still have 3 students in the array', function() {
                studentController.removeStudent({});

                $rootScope.$apply();

                expect(studentController.students.length).toEqual(3);
            });
        });
    });
})