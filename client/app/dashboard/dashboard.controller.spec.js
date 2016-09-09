describe('DashboardController', function(){

	var dashController;


	beforeEach(function() {
		bard.appModule('myApp');
		bard.inject('$controller', '$q', '$rootScope', 'dashboardFactory');
	});

	beforeEach(function(){
		sinon.stub(dashboardFactory, 'getDash').returns($q.when([{},{},{}]));

		dashController = $controller('DashboardController');

		$rootScope.$apply();
	});

	bard.verifyNoOutstandingHttpRequests();

	describe('controller', function(){
		
		it('should be created succesfully', function(){
			expect(dashController).toBeDefined();
		});
	
		describe('after getDash is called', function(){
			it('should have 3 summary counts in the array', function(){
				expect(dashController.data.length).toEqual(3);
			});
		});
	});
})