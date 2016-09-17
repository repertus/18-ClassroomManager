describe("student Http Specification", function(){


	beforeEach(function(){
		bard.appModule('myApp');
		bard.inject('studentFactory', 'apiUrl', '$httpBackend');
	});

	//Add method test
	describe('when add is called', function(){
		it('should add data on success', function(){
			
			var response = {
				data: [{}]
			};
			var student = {};

			$httpBackend.whenPOST(apiUrl + '/students', student).respond(response);

			studentFactory.add(student).then(
				function(data){
					expect(data.length).toEqual(1);
				},
				function(error){
					expect(1).toEqual(2);
				}
			);
		});

		it('it should return error on http fail', function(){
			
			var student = {};

			$httpBackend.whenPOST(apiUrl + '/students', student).respond(500);

			studentFactory.add(student).then(
				function(data){
					expect(1).toBe(2);
				},
				function(error){
					expect(error).toBeDefined();
				}
			);
		});
	});

	// GetAll test method
	describe('when getAll is called', function(){
		it('should return data summary on success', function(){
			
			var response = {
				data: [{}]
			};

			$httpBackend.whenGET(apiUrl + '/students').respond(response);

			studentFactory.getAll().then(
				function(data){
					expect(data.length).toEqual(1);
				},
				function(error){
					expect(1).toEqual(2);
				}
			);
		});

				it('it should return error on http fail', function(){
			$httpBackend.whenGET(apiUrl + '/students').respond(500);

			studentFactory.getAll().then(
				function(data){
					expect(1).toBe(2);
				},
				function(error){
					expect(error).toBeDefined();
				}
			);
		});
	});

	//Get by ID test method
	describe('when getById is called', function(){
		it('should return Id on success', function(){
			
			var response = {
				data: [{}]
			};
			var id = {};

			$httpBackend.whenGET(apiUrl + '/students/' + id).respond(response);

			studentFactory.getById(id).then(
				function(data){
					expect(data.length).toEqual(1);
				},
				function(error){
					expect(1).toEqual(2);
				}
			);
		});

		it('it should return error on http fail', function(){
			
			var id = {};

			$httpBackend.whenGET(apiUrl + '/students/' + id).respond(500);

			studentFactory.getById(id).then(
				function(data){
					expect(1).toBe(2);
				},
				function(error){
					expect(error).toBeDefined();
				}
			);
		});
	});

	//Put method test
	describe('when edit is called', function(){
		it('should edit data on success', function(){
			
			var response = {
				data: [{}]
			};

			var student = {'studentId': 1};

			$httpBackend.whenPUT(apiUrl + '/todos/' + student.studentId, student).respond(response);

			studentFactory.update(student).then(
				function(data){
					expect(data.length).toEqual(1);
				},
				function(error){
					expect(1).toEqual(2);
				}
			);
		});

		it('it should return error on http fail', function(){
			
			var student = {'studentId': 1};

			$httpBackend.whenPUT(apiUrl + '/todos/' + student.studentId, student).respond(500);

			studentFactory.update(student).then(
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