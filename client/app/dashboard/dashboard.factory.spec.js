describe("Dashboard Http Specification", function(){


	beforeEach(function(){
		bard.appModule('myApp');
		bard.inject('dashboardFactory', 'apiUrl', '$httpBackend');
	});


	// GetAll test method
	describe('when getDash is called', function(){
		it('should return data summary on success', function(){
			
			var response = {
				data: [{}]
			};

			$httpBackend.whenGET(apiUrl + '/dashboard').respond(response);

			dashboardFactory.getDash().then(
				function(data){
					expect(data.length).toEqual(1);
				},
				function(error){
					expect(1).toEqual(2);
				}
			);
		});

				it('it should return error on http fail', function(){
			$httpBackend.whenGET(apiUrl + '/dashboard').respond(500);

			dashboardFactory.getDash().then(
				function(data){
					expect(1).toBe(2);
				},
				function(error){
					expect(error).toBeDefined();
				}
			);
		});
	});

});